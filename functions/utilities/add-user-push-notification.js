const GetRefs = require('./get-refs');

module.exports = context => async (userId, pushNotification) => {
  const pushNotificationsRef = GetRefs(context).userPushNotifications(userId);

  return pushNotificationsRef.push(pushNotification);
};
