export default function extractUserEmail(user) {
  const isSearch = user && !!user._highlightResult;
  let email = '';

  if (isSearch) {
    email = user._highlightResult.email.value;
  } else if (user) {
    if (user.email) {
      email = user.email;
    } else if (user.providerData) {
      const providerWithEmail = user.providerData.find(({ email }) => !!email);

      if (providerWithEmail && providerWithEmail.email) {
        email = providerWithEmail.email;
      }
    }
  }

  return email;
}
