const admin = require('../utilities/test-admin');
const environment = require('../environments/environment.test');
const context = { admin, environment };
const addUserNotification = require('../utilities/add-user-notification')(context);

const removeUserNotifications = require('../utilities/remove-user-notifications')(context);
const getPushNotifications = require('../utilities/get-push-notifications')(context);
const removeUserPushNotifications = require('../utilities/remove-user-push-notifications')(context);
const flatten = require('../utilities/flatten');
const uuidv4 = require('uuid/v4');

// Add a bunch of user notifications
// Run the func on that user id
// Test that the push notifications queue has the correct notification
// Clean up user notifications and the push notifications.

const Func = require('./process-notifications-on-publish');

describe('ProcessNotificationsOnPublish', () => {
  const uid1 = uuidv4();
  const uid2 = uuidv4();
  const type = 'test';
  const createNotification = i => ({
    created: i,
    type,
    detail: { text: i, origin: i },
  });
  const notification1 = createNotification(1);
  const notification2 = createNotification(2);

  let func;
  let pushNotifications;

  beforeAll(async () => {
    func = Func(context);

    await addUserNotification(uid1, notification1);
    await addUserNotification(uid1, notification2);
    await addUserNotification(uid2, notification1);
    await addUserNotification(uid2, notification2);
    await func();

    pushNotifications = await getPushNotifications();
  });

  afterAll(async () => {
    await removeUserNotifications(uid1);
    await removeUserNotifications(uid2);
    await removeUserPushNotifications(uid1);
    await removeUserPushNotifications(uid2);
  });

  it('should create one push notification for each user', () => {
    expect(Object.keys(pushNotifications[uid1]).length).toEqual(1);
    expect(Object.keys(pushNotifications[uid2]).length).toEqual(1);
  });
});
