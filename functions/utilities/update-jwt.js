module.exports = ({ admin }) => async (uid, updates) => {
  return admin.auth().updateUser(uid, updates);
};
