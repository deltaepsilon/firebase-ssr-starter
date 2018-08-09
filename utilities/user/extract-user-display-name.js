import extractUserEmail from './extract-user-email';

export default function extractUserDisplayName(user) {
  let displayName = extractUserEmail(user);

  if (user) {
    if (user.displayName) {
      displayName = user.displayName;
    } else if (user.providerData) {
      const providerWithDisplayName = user.providerData.find(({ displayName }) => !!displayName);

      if (providerWithDisplayName && providerWithDisplayName.displayName) {
        displayName = providerWithDisplayName.displayName;
      }
    }
  }

  return displayName;
}
