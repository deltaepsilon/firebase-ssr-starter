import md5 from 'md5';

export default function extractUserPhotoUrl(user) {
  let photoUrl = 'https://www.gravatar.com/avatar/';

  if (user) {
    const providerWithEmail = user.providerData && user.providerData.find(({ email }) => !!email);
    const providerWithPhotoURL =
      user.providerData && user.providerData.find(({ photoUrl }) => !!photoUrl);

    const email = providerWithEmail ? providerWithEmail.email : user.email;

    if (providerWithPhotoURL || email) {
      photoUrl = providerWithPhotoURL
        ? providerWithPhotoURL.photoUrl
        : `https://www.gravatar.com/avatar/${md5(email)}`;
    }
  }

  return photoUrl;
}
