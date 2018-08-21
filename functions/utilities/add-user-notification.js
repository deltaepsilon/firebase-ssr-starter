const GetRefs = require('./get-refs');

module.exports = context => async (userId, notification) => {
  const notificationsRef = GetRefs(context).notifications(userId);

  return notificationsRef.push(notification);
};
