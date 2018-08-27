const admin = require('../utilities/test-admin');
const environment = require('../environments/environment.test');
const context = { admin, environment };
const addUserNotification = require('../utilities/add-user-notification')(context);

const removeUserNotifications = require('../utilities/remove-user-notifications')(context);
const getUserPushNotifications = require('../utilities/get-user-push-notifications')(context);
const removeUserPushNotifications = require('../utilities/remove-user-push-notifications')(context);
const flatten = require('../utilities/flatten');
const uuidv4 = require('uuid/v4');

// Add a bunch of user notifications
// Run the func on that user id
// Test that the push notifications queue has the correct notification
// Clean up user notifications and the push notifications.

const Func = require('./process-user-notifications-on-publish');

describe('ProcessUserNotificationsOnPublish', () => {
  const uid = uuidv4();
  const type = 'test';
  const createNotification = i => ({
    created: i,
    type,
    detail: { text: i, origin: i },
  });
  const notification1 = createNotification(1);
  const notification2 = createNotification(2);
  const notification3 = createNotification(3);
  const notification4 = createNotification(4);
  const message = {
    json: { uid },
  };

  let func;
  let resultPushNotifications;
  let firstResult;

  beforeAll(async () => {
    func = Func(context);

    await addUserNotification(uid, notification1);
    await addUserNotification(uid, notification2);
    await addUserNotification(uid, notification3);
    await addUserNotification(uid, notification4);
    await func(message);

    const pushNotifications = await getUserPushNotifications(uid);

    resultPushNotifications = flatten(pushNotifications);
    firstResult = resultPushNotifications[0];
  });

  afterAll(async () => {
    await removeUserNotifications(uid);
    await removeUserPushNotifications(uid);
  });

  it('should create one push notification', () => {
    expect(resultPushNotifications.length).toEqual(1);
  });

  it('should create a push notification based on the last message', () => {
    expect(firstResult.detail.text).toEqual(`New message: ${notification4.detail.text}`);
  });
  
  it('should create match the right shape', () => {
    expect(firstResult.type).toEqual(type);
    expect(firstResult.detail.title).toEqual(`4 unread messages`);
    expect(firstResult.detail.text).toEqual(`New message: ${notification4.detail.text}`);
    expect(firstResult.detail.url).toEqual(`${notification4.detail.origin}/app/messages`);
  });
});
