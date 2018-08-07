const algolia = require('../utilities/algolia-utilities');

module.exports = ({ environment }) => {
  const { usersIndex, saveObject, deleteObject } = algolia({ environment });
  const saveUser = saveObject(usersIndex);
  const deleteUser = deleteObject(usersIndex);

  return async (change, { params: { uid } }) => {
    const user = change.after.data();
    const objectID = uid;

    if (!user) {
      await deleteUser(objectID);
    } else {
      let record = {
        objectID,
        email: user.email,
        creationTime: user.creationTime,
        lastSignInTime: user.lastSignInTime,
        uid,
      };

      if (user.providerData.length) {
        const firstProvider = user.providerData[0];

        record = { firstProvider, ...record };
      }

      await saveUser(record);
    }

    return true;
  };
};
