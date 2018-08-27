const GetRefs = require('./get-refs');

module.exports = context => async userId => {
  const userPushNotificationsRef = GetRefs(context).userPushNotifications(userId);

  const snapshot = await userPushNotificationsRef.once('value');

  return snapshot.val();
};
