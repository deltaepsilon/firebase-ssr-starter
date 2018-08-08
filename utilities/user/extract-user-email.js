import md5 from 'md5';

export default function extractUserEmail(user) {
  let email = '';

  if (user) {
    const providerWithEmail = user.providerData && user.providerData.find(({ email }) => !!email);

    if (providerWithEmail || user.email) {
      email = providerWithEmail ? providerWithEmail.email : user.email;
    }
  }

  return email;
}
