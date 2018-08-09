/* globals firebase */
import isBrowser from '../is-browser';
import setSettings from '../../database/settings/set-settings';

export function getToken({ environment, uid }) {
  const set = setSettings(environment, uid);

  return async (cb) => {
    const messaging = firebase.messaging();

    let messagingToken;
    try {
      await messaging.requestPermission();

      messagingToken = await messaging.getToken();
    } catch (e) {
      alert(
        'Unblock notifications to enable. See https://support.google.com/chrome/answer/3220216?co=GENIE.Platform%3DDesktop&hl=en'
      );
    }

    await set({ messagingToken });

    return cb(messagingToken);
  };
}

export default isBrowser(getToken);
