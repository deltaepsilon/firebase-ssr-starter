const getCustomClaimsByEmail = require('../utilities/get-custom-claims-by-email');
const setCustomClaims = require('../utilities/set-custom-claims');

module.exports = ({ admin, environment }) => user => {
  const db = admin.firestore();
  const usersCollection = db.collection(environment.schema.users);
  const customClaimsRef = admin.database().ref(environment.schema.customClaims);
  const auth = admin.auth();

  return Promise.resolve()
    .then(getCustomClaimsByEmail(customClaimsRef, user.email))
    .then(setCustomClaims(auth, user.uid))
    .then(claims => {
      const update = mapUserUpdate(claims, user);
      return usersCollection.doc(user.uid).set(update, { merge: true });
    });
};

function mapUserUpdate(claims, user) {
  return {
    claims,
    email: user.email,
    emailVerified: user.emailVerified,
    lastSignInTime: user.metadata.lastSignInTime,
    creationTime: user.metadata.creationTime,
    providerData: user.providerData,
  };
}
