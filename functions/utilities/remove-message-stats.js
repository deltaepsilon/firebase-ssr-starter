const GetRefs = require('./get-refs');

module.exports = context => async uid => {
  const getRefs = GetRefs(context);
  const docRef = getRefs.messageStats(uid);

  return docRef.delete();
};
