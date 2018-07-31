/* gobals firebase */
import { Observable } from 'rxjs';

export default function SubscribePresense({ environment, currentUser }) {
  return Observable.create(observer => {
    const db = firebase.database();
    const connectedRef = db.ref('.info/connected');
    const ref = environment.schema.presense(db, currentUser.uid);
    const connectionsRef = ref.child('connections');
    const lastOnlineRef = ref.child('lastOnline');
    const emailRef = ref.child('email');

    const handler = connectedRef.on('value', function(snap) {
      const connected = snap.val();

      observer.next(connected);

      if (connected) {
        const connectionRef = connectionsRef.push();

        connectionRef.onDisconnect().remove();
        connectionRef.set(true);
        emailRef.set(currentUser.providerData[0].email);

        lastOnlineRef.onDisconnect().set(firebase.database.ServerValue.TIMESTAMP);
      }
    });

    return function() {
      connectedRef.off('value', handler);
    };
  });
}
