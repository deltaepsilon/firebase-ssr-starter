/* gobals firebase */
import { Observable } from 'rxjs';
import flatten from '../../utilities/flatten';

export default function SubscribeNotifications({ environment, currentUser }) {
  return Observable.create(observer => {
    const db = firebase.database();
    const notificationsRef = environment.schema.notifications(db, currentUser.uid);

    const handler = notificationsRef.on('value', function(snap) {
      const notifications = flatten(snap.val());

      observer.next(notifications);
    });

    return function() {
      notificationsRef.off('value', handler);
    };
  });
}
