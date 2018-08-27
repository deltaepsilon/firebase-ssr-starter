const GetRefs = require('./get-refs');
module.exports = context => async uid => {
  const userRef = GetRefs(context).user(uid);
  const doc = await userRef.get();

  return doc.data();
};
