export default {
    user: (db, uid) => {
      return db
        .collection('user')
        .doc(uid);
    },
    settings: (db, uid) => {
      return db
        .collection('user-owned')
        .collection('settings')
        .doc(uid);
    },
    presense: (db, uid) => {
      return db
        .ref('presence')
        .child(uid);
    },
  }