const GetRefs = require('./get-refs');

module.exports = context => async (messageId, message, options = {}) => {
  const getRefs = GetRefs(context);
  const docRef = getRefs.messageLogs(messageId);
  
  const doc = await docRef.get();

  return doc.data();
};
