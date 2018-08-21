const SetUser = require('../utilities/set-user');
const UpdateJwt = require('../utilities/update-jwt');

module.exports = context => {
  const setUser = SetUser(context);
  const updateJwt = UpdateJwt(context);

  const { admin } = context;
  const deleteValue = admin.firestore.FieldValue.delete();

  return async (change, { params: { uid } }) => {
    const settings = change.after.data();

    const userUpdate = {
      uid,
      displayName: (settings && settings.displayName) || deleteValue,
      photoURL: (settings && settings.photoURL) || deleteValue,
      photoURLPath: (settings && settings.photoURLPath) || deleteValue,
      updated: new Date().toString(),
    };

    const jwtUpdate = {
      displayName: (settings && settings.displayName) || undefined,
      photoURL: (settings && settings.photoURL) || undefined,
    };

    await updateJwt(uid, jwtUpdate);

    return setUser(userUpdate, { merge: true });
  };
};
