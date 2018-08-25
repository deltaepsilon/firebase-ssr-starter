const GetRefs = require('./get-refs');

module.exports = context => async userId => {
  const notificationsRef = GetRefs(context).notifications(userId);

  return notificationsRef.remove();
};
