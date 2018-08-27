const GetRefs = require('./get-refs');

module.exports = context => async uid => {
  const getRefs = GetRefs(context);
  const docRef = getRefs.userMessageStats(uid);

  const doc = await docRef.get();

  return doc.data();
};
