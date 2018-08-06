/* globals firebase */
import { Observable } from 'rxjs';
import isBrowser from '../utilities/is-browser';

export default (environment, schemaName, queryOptions) =>
  isBrowser(
    Observable.create(async observer => {
      const db = firebase.firestore();
      const getCollection = withCollection({ db, environment, schemaName });
      const loadCollection = withObserver(observer);

      getLoader(getCollection, loadCollection, queryOptions)();

      function getLoader(getCollection, loadCollection, queryOptions) {
        return async () => {
          const collection = getCollection(queryOptions);

          const snapshot = await loadCollection(collection);

          if (snapshot.length < queryOptions.limit) {
            observer.complete();
          } else {
            const cursor = getCursor(snapshot);
            const nextQueryOptions = { ...queryOptions, cursor };
            console.log('nextQueryOptions', nextQueryOptions);
            
            observer.next({
              next: getLoader(getCollection, loadCollection, nextQueryOptions),
            });
          }
        };
      }
    })
  );

function withCollection({ db, environment, schemaName }) {
  return ({ orderBy = [], limit = 50, cursor }) => {
    let collection = environment.schema[schemaName](db);

    orderBy.forEach(({ name, sort = 'desc' }) => (collection = collection.orderBy(name, sort)));

    collection = collection.limit(limit);

    if (cursor) {
      collection = collection.startAt(cursor);
    }

    return collection;
  };
}

function withObserver(observer) {
  return async collection => {
    const snapshot = await collection.get();

    snapshot.forEach(doc => observer.next({ __id: doc.id, ...doc.data() }));

    return snapshot;
  };
}

function getCursor(snapshot) {
  return snapshot.docs[snapshot.docs.length - 1];
}
