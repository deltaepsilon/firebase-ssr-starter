/* globals firebase */
import { Observable } from 'rxjs';
import isBrowser from '../utilities/is-browser';
import setId from '../utilities/set-id';

export default (environment, schemaName, ...schemaArgs) =>
  isBrowser(
    Observable.create(observer => {
      const db = firebase.firestore();
      const doc = environment.schema[schemaName].apply(null, [db, ...schemaArgs]);

      return doc.onSnapshot(
        doc => {
          if (doc.exists) {
            observer.next(setId(doc.id, doc.data()));
          } else {
            observer.next({});
            console.info('doc missing', schemaName, schemaArgs, doc && doc.ref && doc.ref.path);
          }
        },
        error => {
          console.info('error', schemaName);
          console.error(error);
        }
      );
    })
  );
