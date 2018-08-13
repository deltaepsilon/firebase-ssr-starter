/* globals firebase */
import { Observable } from 'rxjs';
import isBrowser from '../utilities/is-browser';
import { process } from 'ipaddr.js';

export default (environment, schemaName, args = [], queryOptions) =>
  isBrowser(
    Observable.create(async observer => {
      const db = firebase.firestore();
      const getCollection = withCollection({ args, db, environment, schemaName });
      const loadCollection = withObserver(observer);

      let lastRecordUnsubscribe;

      if (queryOptions.listenForNew) {
        lastRecordUnsubscribe = loadNewRecordListener({
          args,
          db,
          environment,
          observer,
          queryOptions,
          schemaName,
        });
      }

      getLoader(getCollection, loadCollection, queryOptions)();

      function getLoader(getCollection, loadCollection, queryOptions) {
        return async () => {
          const collection = getCollection(queryOptions);

          const snapshot = await loadCollection(collection);

          if (snapshot.docs.length < queryOptions.limit) {
            observer.next({ finished: true });

            !queryOptions.listenForNew && observer.complete();
          } else {
            const cursor = getCursor(snapshot);
            const nextQueryOptions = { ...queryOptions, cursor };

            observer.next({
              next: getLoader(getCollection, loadCollection, nextQueryOptions),
            });
          }
        };
      }

      return () => {
        console.log('unsubscribed', schemaName);

        if (typeof lastRecordUnsubscribe == 'function') {
          lastRecordUnsubscribe();
        }
      };
    })
  );

function withCollection({ args, db, environment, schemaName }) {
  return queryOptions => {
    const { cursor, limit } = queryOptions;

    let collection = getOrderedCollection({ args, db, environment, schemaName, queryOptions });

    collection = collection.limit(limit || 50);

    if (cursor) {
      collection = collection.startAfter(cursor);
    }

    return collection;
  };
}

function withObserver(observer) {
  return async collection => {
    const snapshot = await collection.get();
    const docProcessor = processDoc(observer);

    snapshot.forEach(docProcessor);

    return snapshot;
  };
}

function loadNewRecordListener({ args, db, environment, observer, queryOptions, schemaName }) {
  let lastRecordCollection = getLastRecordCollection({
    args,
    db,
    environment,
    queryOptions,
    schemaName,
  });

  const docProcessor = processDoc(observer, true);
  let isFirstResult = true;

  return lastRecordCollection.onSnapshot(({ docs }) => {
    if (isFirstResult) {
      isFirstResult = false;
    } else {
      docProcessor(docs.shift());
    }
  });
}

function getLastRecordCollection({ args, db, environment, queryOptions, schemaName }) {
  let collection = getOrderedCollection({ args, db, environment, schemaName, queryOptions });

  collection.limit(1);

  return collection;
}

function getOrderedCollection({ args, db, environment, schemaName, queryOptions }) {
  let collection = getCollection({ args, db, environment, schemaName });

  return withOrderBy({ collection, orderBy: queryOptions.orderBy });
}

function getCollection({ args, db, environment, schemaName }) {
  return environment.schema[schemaName].apply(this, [db, ...args]);
}

function withOrderBy({ collection, orderBy = [] }) {
  orderBy.forEach(({ name, sort = 'desc' }) => (collection = collection.orderBy(name, sort)));

  return collection;
}

function processDoc(observer, isNewRecord) {
  return doc => observer.next({ __id: doc.id, __isNewRecord: isNewRecord, ...doc.data() });
}

function getCursor(snapshot) {
  return snapshot.docs[snapshot.docs.length - 1];
}
