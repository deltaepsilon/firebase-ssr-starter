import extractUserEmail from './extract-user-email';

export default function extractUserDisplayName(user) {
  let displayName = extractUserEmail(user);

  if (user) {
    const providerWithDisplayName =
      user.providerData && user.providerData.find(({ displayName }) => !!displayName);

    if (providerWithDisplayName || user.displayName) {
      displayName = providerWithDisplayName
        ? providerWithDisplayName.displayName
        : user.displayName;
    }
  }

  return displayName;
}
