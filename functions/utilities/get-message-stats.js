const GetRefs = require('./get-refs');

module.exports = context => async uid => {
  const getRefs = GetRefs(context);
  const docRef = getRefs.messageStats(uid);

  const doc = await docRef.get();

  return doc.data();
};
