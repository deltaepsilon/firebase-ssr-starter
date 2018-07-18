module.exports = function getCustomClaimsByEmail(ref, email) {
  return () =>
    Promise.resolve()
      .then(() => ref.once('value'))
      .then(snap => {
        const claimsMap = snap.val();
        let claims;

        for (let key in claimsMap) {
          const userClaims = claimsMap[key];

          if (userClaims.email == email) {
            claims = userClaims.claims;
            break;
          }
        }

        return claims;
      });
};
