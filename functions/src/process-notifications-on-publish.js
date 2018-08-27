/**
 * Trigger pub/sub
 * gcloud pubsub topics publish process-notifications --message '{}'
 */
const GetNotifications = require('../utilities/get-notifications');
const ProcessUserNotifications = require('../utilities/process-user-notifications');

module.exports = context => async () => {
  const getNotifications = GetNotifications(context);
  const processUserNotifications = ProcessUserNotifications(context);

  const notifications = await getNotifications();

  return Promise.all(
    Object.keys(notifications || {}).map(async uid => processUserNotifications(uid))
  );
};
