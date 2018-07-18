const BAD_KEYS_REGEXP = /[\.|\/|$|#|\[|\]]/g;

module.exports = ({ admin, environment }) => email => {
  const emailSlug = email.replace(BAD_KEYS_REGEXP, '|');

  return admin
    .database()
    .ref(environment.schema.customClaims)
    .child(emailSlug)
    .remove();
};
