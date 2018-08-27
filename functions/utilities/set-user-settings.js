const GetRefs = require('./get-refs');

module.exports = context => async (uid, settings, options = {}) => {
  const getRefs = GetRefs(context);
  const docRef = getRefs.userSettings(uid);

  return docRef.set(settings, options);
};
