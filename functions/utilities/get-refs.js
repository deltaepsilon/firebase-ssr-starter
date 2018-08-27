module.exports = ({ admin, environment }) => {
  function users() {
    return admin.firestore().collection(environment.schema.users);
  }

  function user(uid) {
    return users().doc(uid);
  }

  function messageLogs() {
    const pathParts = environment.schema.messageLogs.split('/');

    return admin
      .firestore()
      .collection(pathParts[0])
      .doc(pathParts[1])
      .collection(pathParts[2]);
  }

  function messageLog(messageId) {
    return messageLogs().doc(messageId);
  }

  function messageStats() {
    const pathParts = environment.schema.messageStats.split('/');

    return admin
      .firestore()
      .collection(pathParts[0])
      .doc(pathParts[1])
      .collection(pathParts[2]);
  }

  function userMessageStats(uid) {
    return messageStats().doc(uid);
  }

  function notifications() {
    return admin.database().ref(environment.schema.notifications);
  }

  function userNotifications(uid) {
    return notifications().child(uid);
  }

  function pushNotifications() {
    return admin.database().ref(environment.schema.pushNotifications);
  }

  function userPushNotifications(uid) {
    return pushNotifications().child(uid);
  }

  function settings() {
    const pathParts = environment.schema.settings.split('/');

    return admin
      .firestore()
      .collection(pathParts[0])
      .doc(pathParts[1])
      .collection(pathParts[2]);
  }

  function userSettings(uid) {
    return settings().doc(uid);
  }

  return {
    users,
    user,
    messageLogs,
    messageLog,
    messageStats,
    userMessageStats,
    notifications,
    userNotifications,
    pushNotifications,
    userPushNotifications,
    settings,
    userSettings,
  };
};
