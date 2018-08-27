/**
 * Trigger pub/sub
 * gcloud pubsub topics publish process-user-notifications --message '{"uid": "123456"}'
 */
const ProcessUserNotifications = require('../utilities/process-user-notifications');

module.exports = context => async message => {
  const processUserNotifications = ProcessUserNotifications(context);
  const uid = message.json.uid;

  await processUserNotifications(uid);
};
