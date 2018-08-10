const SetUser = require('../utilities/set-user');
const UpdateJwt = require('../utilities/update-jwt');

module.exports = context => {
  const setUser = SetUser(context);
  const updateJwt = UpdateJwt(context);

  const { admin, environment } = context;
  const deleteValue = admin.firestore.FieldValue.delete();

  return async (change, { params: { uid } }) => {
    const settings = change.after.data();

    const userUpdate = {
      uid,
      displayName: (settings && settings.displayName) || deleteValue,
      photoUrl: (settings && settings.photoUrl) || deleteValue,
      photoUrlPath: (settings && settings.photoUrlPath) || deleteValue,
      updated: new Date().toString(),
    };

    const jwtUpdate = {
      displayName: (settings && settings.displayName) || undefined,
      photoUrl: (settings && settings.photoUrl) || undefined,
    };

    await updateJwt(uid, jwtUpdate);

    return setUser(userUpdate, { merge: true });
  };
};
