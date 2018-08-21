module.exports = ({ admin, environment }) => ({
  users: uid => {
    return admin
      .firestore()
      .collection(environment.schema.users)
      .doc(uid);
  },
  messageLogs: messageId => {
    const pathParts = environment.schema.messageLogs.split('/');

    return admin
      .firestore()
      .collection(pathParts[0])
      .doc(pathParts[1])
      .collection(pathParts[2])
      .doc(messageId);
  },
  messageStats: uid => {
    const pathParts = environment.schema.messageStats.split('/');

    return admin
      .firestore()
      .collection(pathParts[0])
      .doc(pathParts[1])
      .collection(pathParts[2])
      .doc(uid);
  },
  notifications: uid => {
    return admin
      .database()
      .ref(environment.schema.notifications)
      .child(uid);
  },
});
