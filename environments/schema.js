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
  presence: (db, uid) => {
    return db.ref('presence').child(uid);
  },
  userUploads: (storage, uid, hash) => {
    return storage
      .ref('user-uploads')
      .child(uid)
      .child(hash);
  },
};
