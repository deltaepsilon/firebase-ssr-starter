import md5 from 'md5';

export default function extractUserEmail(user) {
  let email = '';

  if (user) {
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
