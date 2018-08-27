const GetRefs = require('./get-refs');

module.exports = context => async uid => {
  const getRefs = GetRefs(context);
  const docRef = getRefs.userMessageStats(uid);

  return docRef.delete();
};
