const GetRefs = require('./get-refs');

module.exports = context => async messageId => {
  const getRefs = GetRefs(context);
  const docRef = getRefs.messageLogs(messageId);

  return docRef.delete();
};
