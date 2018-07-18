const BAD_KEYS_REGEXP = /[\.|\/|$|#|\[|\]]/g;

module.exports = ({ admin, environment }) => ({ email, claims }) => {
  const emailSlug = email.replace(BAD_KEYS_REGEXP, '|');

  return admin
    .database()
    .ref(environment.schema.customClaims)
    .child(emailSlug)
    .set({ email, claims });
};
