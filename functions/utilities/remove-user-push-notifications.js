const GetRefs = require('./get-refs');

module.exports = context => async uid => {
  const userPushNotificationsRef = GetRefs(context).userPushNotifications(uid);

  return userPushNotificationsRef.remove();
};
