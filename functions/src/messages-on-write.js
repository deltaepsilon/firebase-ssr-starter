const SetMessageLog = require('../utilities/set-message-log');
const RemoveMessageLog = require('../utilities/remove-message-log');
const UpdateMessageStats = require('../utilities/update-message-stats');

module.exports = context => {
  const setMessageLog = SetMessageLog(context);
  const removeMessageLog = RemoveMessageLog(context);
  const updateMessageStats = UpdateMessageStats(context);

  return async (change, { params: { uid, messageId } }) => {
    const message = change.after.data();

    if (!message) {
      await removeMessageLog(messageId);
    } else {
      await setMessageLog(messageId, message, { merge: true });
    }

    return updateMessageStats(uid, message);
  };
};
