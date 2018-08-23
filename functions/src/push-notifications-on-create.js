const GetSettings = require('../utilities/get-settings');
const SendFCMMessage = require('../utilities/send-fcm-message');

module.exports = context => async (snap, { params: { uid, pushNotificationId } }) => {
  const getSettings = GetSettings(context);
  const sendFCMMessage = SendFCMMessage(context);

  const pushNotification = snap.val();
  const settings = await getSettings(uid);

  if (settings && settings.messagingToken) {
    const payload = {
      token: settings.messagingToken,
      data: { type: pushNotification.type, ...pushNotification.detail },
    };
    await sendFCMMessage(payload);
    console.log('sent', payload);
  } else {
    console.log('not sent', uid, pushNotification);
  }

  await snap.ref.remove();
};
