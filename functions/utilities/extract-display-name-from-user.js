const extractEmailFromUser = require('./extract-email-from-user');

module.exports = function extractDisplayNameFromUser(user) {
  const email = extractEmailFromUser(user);
  const provider = user.providerData.find(({ displayName }) => displayName);

  return user.displayName || (provider && provider.displayName) || email;
};
