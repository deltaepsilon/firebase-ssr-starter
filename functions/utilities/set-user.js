const BAD_KEYS_REGEXP = /[\.|\/|$|#|\[|\]]/g;

module.exports = ({ admin, environment }) => (user, options = {}) => {
  return admin
    .firestore()
    .collection(environment.schema.users)
    .doc(user.uid)
    .set(user, options);
};
