/* globals firebase */
import { Observable } from 'rxjs';
import isBrowser from '../../utilities/is-browser';

export default isBrowser(function SubscribeSettings({ environment, uid, setter }) {
  return Observable.create(observer => {
    const db = firebase.firestore();
    const doc = environment.schema.settings(db, uid);

    return doc.onSnapshot(doc => observer.next(doc.data()));
  });
});
