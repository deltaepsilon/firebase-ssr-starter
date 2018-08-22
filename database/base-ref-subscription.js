import { Observable } from 'rxjs';
import flatten from '../utilities/flatten';
import isBrowser from '../utilities/is-browser';

export default (environment, schemaName, args = []) =>
  isBrowser(
    Observable.create(observer => {
      const db = firebase.database();
      const ref = environment.schema[schemaName].apply(this, [db, ...args]);

      const handler = ref.on('value', function(snap) {
        const obj = flatten(snap.val());

        observer.next(obj);
      });

      return function() {
        ref.off('value', handler);
      };
    })
  );
