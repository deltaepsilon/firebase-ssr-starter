/* globals firebase */
import { Observable } from 'rxjs';

export default function SubscribePresence({ environment, currentUser }) {
  return Observable.create(observer => {
    const db = firebase.database();
    const connectedRef = db.ref('.info/connected');
    const ref = environment.schema.presence(db, currentUser.uid);
    const connectionsRef = ref.child('connections');
    const lastOnlineRef = ref.child('lastOnline');
    const emailRef = ref.child('email');
    let connectionRef;

    const handler = connectedRef.on('value', function(snap) {
      const connected = snap.val();

      if (connected) {
        connectionRef = connectionsRef.push();
        connectionRef.onDisconnect().remove();
        connectionRef.set(true);

        observer.next(connectionRef.key);

        emailRef.set(currentUser.providerData[0].email);

        lastOnlineRef.onDisconnect().set(firebase.database.ServerValue.TIMESTAMP);
      } else {
        observer.next(false);
      }
    });

    return function() {
      connectionRef && connectionRef.remove();
      connectedRef.off('value', handler);
    };
  });
}
