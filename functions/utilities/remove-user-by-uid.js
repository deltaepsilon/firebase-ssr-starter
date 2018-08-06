const BAD_KEYS_REGEXP = /[\.|\/|$|#|\[|\]]/g;

module.exports = ({ admin, environment }) => uid => {
  return admin
    .firestore()
    .collection(environment.schema.users)
    .child(uid)
    .delete();
};
