const GetRefs = require('./get-refs');

module.exports = context => async userId => {
  const pushNotificationsRef = GetRefs(context).pushNotifications(userId);

  const snapshot = await pushNotificationsRef.once('value');

  return snapshot.val();
};
