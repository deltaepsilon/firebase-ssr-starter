const md5 = require('md5');
const extractEmailFromUser = require('./extract-email-from-user');

module.exports = function extractPhotoUrlFromUser(user) {
  const email = extractEmailFromUser(user);
  const provider = user.providerData.find(({ photoURL }) => photoURL);

  return (
    user.photoURL ||
    (provider && provider.photoURL) ||
    `https://www.gravatar.com/avatar/${md5(email)}`
  );
};
