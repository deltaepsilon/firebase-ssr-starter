const GetRefs = require('./get-refs');

module.exports = context => async (userId, userNotification) => {
  const userNotificationsRef = GetRefs(context).userNotifications(userId);

  return userNotificationsRef.push(userNotification);
};
