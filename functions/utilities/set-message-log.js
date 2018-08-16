const GetRefs = require('./get-refs');

module.exports = context => async (messageId, message, options = {}) => {
  const getRefs = GetRefs(context);
  const docRef = getRefs.messageLogs(messageId);

  return docRef.set(message, options);
};
