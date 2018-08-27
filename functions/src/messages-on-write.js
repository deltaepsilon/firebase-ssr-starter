const SetMessageLog = require('../utilities/set-message-log');
const RemoveMessageLog = require('../utilities/remove-message-log');
const UpdateUserMessageStats = require('../utilities/update-user-message-stats');
const AddUserNotification = require('../utilities/add-user-notification');

module.exports = context => {
  const setMessageLog = SetMessageLog(context);
  const removeMessageLog = RemoveMessageLog(context);
  const updateUserMessageStats = UpdateUserMessageStats(context);
  const addUserNotification = AddUserNotification(context);
  const type = context.environment.notifications.MESSAGE;

  return async (change, { params: { uid, messageId } }) => {
    const message = change.after.data();

    if (!message) {
      await removeMessageLog(messageId);
    } else {
      await setMessageLog(messageId, message, { merge: true });
      uid != message.uid &&
        (await addUserNotification(uid, { type, created: Date.now(), detail: message }));
    }

    return updateUserMessageStats(uid, message);
  };
};
