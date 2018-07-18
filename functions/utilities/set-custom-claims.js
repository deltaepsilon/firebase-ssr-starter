module.exports = function setCustomClaims(auth, uid) {
  return claims => {
    let promise = Promise.resolve({});

    if (claims) {
      promise = auth.setCustomUserClaims(uid, claims).then(() => claims);
    }

    return promise;
  };
};
