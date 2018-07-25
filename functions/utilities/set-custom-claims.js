module.exports = async function setCustomClaims({ auth, uid, claims }) {
  claims && (await auth.setCustomUserClaims(uid, claims));

  return claims || {};
};
