const GetRefs = require('./get-refs');

module.exports = context => async userId => {
  const pushNotificationsRef = GetRefs(context).pushNotifications(userId);

  return pushNotificationsRef.remove();
};
