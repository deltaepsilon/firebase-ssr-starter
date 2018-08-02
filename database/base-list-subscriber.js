/* globals firebase */
import { Observable } from 'rxjs';
import isBrowser from '../utilities/is-browser';

export default (environment, schemaName, queryOptions) =>
  isBrowser(
    Observable.create(async observer => {
      const db = firebase.firestore();
      const getCollection = withCollection(environment, schemaName);
      const loadCollection = withObserver(observer);

      

      getLoader(getCollection, loadCollection)();

      function getLoader(getCollection, loadCollection) {
        return () => {
        const collection = getCollection(queryOptions)

        const snapshot = await loadCollection(collection)();

        const cursor = getCursor(snapshot);

        if (snapshot.length < queryOptions.limit) {

          observer.complete();
        } else {
          observer.next({next: getLoader(getCollection, loadCollection(getCollection))})
        }
      }
      }
    })
  );



function withCollection(environment, schemaName) {
  return ({ orderBy = [], limit = 50, cursor }) => {

    let collection = environment.schema[schemaName](db);
  
        orderBy.forEach(({ name, sort = 'desc' }) => (collection = collection.orderBy(name, sort)));
  
        collection = collection.limit(limit);
  }
}

function withObserver(observer) {
  return collection => () => {


    const snapshot = await collection.get();
  
    snapshot.forEach(doc => observer.next({ __id: doc.id, ...doc.data() }));
  
    return snapshot;
  }
}

function getCursor(snapshot) {
  return snapshot.docs[snapshot.docs.length -1];
}
