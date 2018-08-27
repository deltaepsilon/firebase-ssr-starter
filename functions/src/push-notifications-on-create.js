const GetRefs = require('../utilities/get-refs');
const GetUserSettings = require('../utilities/get-user-settings');
const SendFCMMessage = require('../utilities/send-fcm-message');

module.exports = context => async (snap, { params: { uid, pushNotificationId } }) => {
  const getUserSettings = GetUserSettings(context);
  const sendFCMMessage = SendFCMMessage(context);

  const pushNotification = snap.val();
  const settings = await getUserSettings(uid);
  const tokenKeysToDelete = [];
  let sendCount = 0;

  if (settings && typeof settings.messagingTokens == 'object') {
    await Promise.all(
      Object.keys(settings.messagingTokens).map(async key => {
        const token = settings.messagingTokens[key];
        const payload = {
          token,
          data: {
            type: pushNotification.type,
            created: new Date(pushNotification.created).toString(),
            ...pushNotification.detail,
          },
        };

        try {
          await sendFCMMessage(payload);

          sendCount++;
        } catch (e) {
          if (e.code == 'messaging/registration-token-not-registered') {
            tokenKeysToDelete.push(key);
          } else {
            console.info({ ...e });
            console.info('error payload', payload);
          }
        }
      })
    );

    tokenKeysToDelete.length && (await deleteMessagingTokens(context, { tokenKeysToDelete, uid }));
  }

  if (!sendCount) {
    console.info('message not sent', uid, settings, pushNotification);
  }

  await snap.ref.remove();
};

async function deleteMessagingTokens(context, { tokenKeysToDelete, uid }) {
  const db = context.admin.firestore();
  const getRefs = GetRefs(context);
  const settingsRef = getRefs.userSettings(uid);

  return db.runTransaction(async t => {
    const settingsDoc = await t.get(settingsRef);
    const settings = settingsDoc.data();
    const messagingTokens = settings.messagingTokens || {};

    tokenKeysToDelete.forEach(token => delete messagingTokens[token]);

    return t.set(settingsRef, { ...settings, messagingTokens });
  });
}
