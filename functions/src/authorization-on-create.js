const getCustomClaimsByEmail = require('../utilities/get-custom-claims-by-email');
const extractEmailFromUser = require('../utilities/extract-email-from-user');
const setCustomClaims = require('../utilities/set-custom-claims');
const omitEmptyValues = require('../utilities/omit-empty-values');

module.exports = ({ admin, environment }) => async user => {
  const db = admin.firestore();
  const usersCollection = db.collection(environment.schema.users);
  const customClaimsRef = admin.database().ref(environment.schema.customClaims);
  const auth = admin.auth();
  const email = extractEmailFromUser(user);

  const claims = (await getCustomClaimsByEmail(customClaimsRef, email)) || {};

  await setCustomClaims({ auth, uid: user.uid, claims });

  const update = mapUserUpdate(claims, user);

  return usersCollection.doc(user.uid).set(update, { merge: true });
};

function mapUserUpdate(claims, user) {
  const email = extractEmailFromUser(user);

  return omitEmptyValues({
    claims,
    email,
    emailVerified: user.emailVerified,
    lastSignInTime: user.metadata.lastSignInTime,
    creationTime: user.metadata.creationTime,
    providerData: user.providerData.map(removeFunctions),
  });
}

function removeFunctions(obj) {
  return JSON.parse(JSON.stringify(obj));
}
