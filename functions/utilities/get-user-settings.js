const GetRefs = require('./get-refs');

module.exports = context => async (uid) => {
  const getRefs = GetRefs(context);
  const doc = await getRefs.userSettings(uid).get();
  
  return doc.data();
};
