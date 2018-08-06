const BAD_KEYS_REGEXP = /[\.|\/|$|#|\[|\]]/g;

module.exports = ({ admin, environment }) => user => {
  return admin
    .firestore()
    .collection(environment.schema.users)
    .child(user.uid)
    .set(user);
};
