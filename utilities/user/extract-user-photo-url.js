import md5 from 'md5';

export default function extractUserPhotoUrl(user) {
  let photoURL = 'https://www.gravatar.com/avatar/';

  if (user) {
    const providerWithEmail = user.providerData && user.providerData.find(({ email }) => !!email);
    const providerWithPhotoURL =
      user.providerData && user.providerData.find(({ photoURL }) => !!photoURL);

    const email = providerWithEmail ? providerWithEmail.email : user.email;

    if (providerWithPhotoURL || email) {
      photoURL = providerWithPhotoURL
        ? providerWithPhotoURL.photoURL
        : `https://www.gravatar.com/avatar/${md5(email)}`;
    }
  }

  return photoURL;
}
