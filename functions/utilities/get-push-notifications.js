const GetRefs = require('./get-refs');

module.exports = context => async () => {
  const pushNotificationsRef = GetRefs(context).pushNotifications();

  const snapshot = await pushNotificationsRef.once('value');

  return snapshot.val();
};
