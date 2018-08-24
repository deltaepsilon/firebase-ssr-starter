/* globals firebase */
import isBrowser from '../is-browser';

export async function getMessagingToken() {
  const messaging = firebase.messaging();

  let messagingToken;
  try {
    await messaging.requestPermission();

    messagingToken = await messaging.getToken();
  } catch (e) {
    Alert(
      'Unblock notifications to enable.',
      'https://support.google.com/chrome/answer/3220216?co=GENIE.Platform%3DDesktop&hl=en'
    );
  }

  return messagingToken;
}

export default isBrowser(getMessagingToken);
