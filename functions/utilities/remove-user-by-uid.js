module.exports = ({ admin, environment }) => uid => {
  return admin
    .firestore()
    .collection(environment.schema.users)
    .doc(uid)
    .delete();
};
