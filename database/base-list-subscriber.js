/* globals firebase */
import { Observable } from 'rxjs';
import isBrowser from '../utilities/is-browser';

export default (environment, schemaName, { orderBy = [], limit = 50 }) =>
  isBrowser(
    Observable.create(async observer => {
      const db = firebase.firestore();

      let collection = environment.schema[schemaName](db);

      orderBy.forEach(({ name, sort = 'desc' }) => (collection = collection.orderBy(name, sort)));

      collection = collection.limit(limit);

      console.log('collection', collection);

      const snapshot = await collection.get();
      console.log('snapshot.docs', snapshot.docs);
      snapshot.forEach(doc => observer.next({ __id: doc.id, ...doc.data() }));
    })
  );
