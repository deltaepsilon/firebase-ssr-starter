import extractUserEmail from './extract-user-email';

export default function extractUserDisplayName(user) {
  const isSearch = user && !!user._highlightResult;
  let displayName = extractUserEmail(user);

  if (isSearch) {
    const providerWithDisplayName =
      user._highlightResult.providerData &&
      user._highlightResult.providerData.find(({ displayName }) => !!displayName);

    if (user._highlightResult.firstProvider && user._highlightResult.firstProvider.displayName) {
      displayName = user._highlightResult.firstProvider.displayName.value;
    } else if (providerWithDisplayName && providerWithDisplayName.displayName) {
      displayName = providerWithDisplayName.displayName;
    }
  } else if (user) {
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
