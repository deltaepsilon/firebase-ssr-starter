const GetRefs = require('./get-refs');

module.exports = context => async userId => {
  const notificationsRef = GetRefs(context).notifications();

  const snapshot = await notificationsRef.once('value');

  return snapshot.val();
};
