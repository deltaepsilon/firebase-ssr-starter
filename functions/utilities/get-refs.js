module.exports = ({ admin, environment }) => ({
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
});
