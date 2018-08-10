export default {
  user: (db, uid) => {
    return db.collection('users').doc(uid);
  },
  users: db => {
    return db.collection('users');
  },
  settings: (db, uid) => {
    return db
      .collection('permission-based')
      .doc('user-owned')
      .collection('settings')
      .doc(uid);
  },
  userMessages: (db, uid) => {
    return db
      .collection('permission-based')
      .doc('user-owned')
      .collection('messages')
      .doc(uid)
      .collection('messages');
  },
  presence: (db, uid) => {
    return db.ref('presence').child(uid);
  },
  userUploads: (storage, uid, hash) => {
    return storage
      .ref('user-uploads')
      .child(uid)
      .child(hash);
  },
  messageLogs: db => {
    return db
      .collection('admin')
      .doc('logs')
      .collection('messages');
  },
};
