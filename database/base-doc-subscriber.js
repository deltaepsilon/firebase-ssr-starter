/* globals firebase */
import { Observable } from 'rxjs';
import isBrowser from '../utilities/is-browser';

export default (environment, schemaName, ...schemaArgs) =>
  isBrowser(
    Observable.create(observer => {
      const db = firebase.firestore();
      const doc = environment.schema[schemaName].apply(null, [db, ...schemaArgs]);

      return doc.onSnapshot(doc => observer.next(doc.data()));
    })
  );
