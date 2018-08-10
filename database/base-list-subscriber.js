/* globals firebase */
import { Observable } from 'rxjs';
import isBrowser from '../utilities/is-browser';

export default (environment, schemaName, args = [], queryOptions) =>
  isBrowser(
    Observable.create(async observer => {
      const db = firebase.firestore();
      const getCollection = withCollection({ args, db, environment, schemaName });
      const loadCollection = withObserver(observer);

      getLoader(getCollection, loadCollection, queryOptions)();

      function getLoader(getCollection, loadCollection, queryOptions) {
        return async () => {
          const collection = getCollection(queryOptions);

          const snapshot = await loadCollection(collection);

          if (snapshot.docs.length < queryOptions.limit && !queryOptions.listenForNew) {
            observer.complete();
          } else {
            const cursor = getCursor(snapshot);
            const nextQueryOptions = { ...queryOptions, cursor };

            observer.next({
              next: getLoader(getCollection, loadCollection, nextQueryOptions),
            });
          }
        };
      }
    })
  );

function withCollection({ args, db, environment, schemaName }) {
  return ({ orderBy = [], limit = 50, cursor }) => {
    let collection = environment.schema[schemaName].apply(this, [db, ...args]);

    orderBy.forEach(({ name, sort = 'desc' }) => (collection = collection.orderBy(name, sort)));

    collection = collection.limit(limit);

    if (cursor) {
      collection = collection.startAfter(cursor);
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
