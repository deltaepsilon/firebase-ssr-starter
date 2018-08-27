const GetRefs = require('./get-refs');

module.exports = context => async (messageId, message, options = {}) => {
  const getRefs = GetRefs(context);
  const docRef = getRefs.messageLog(messageId);

  return docRef.set(message, options);
};
