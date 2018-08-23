jest.mock('../utilities/send-fcm-message');

const admin = require('../utilities/test-admin');
const environment = require('../environments/environment.test');
const context = { admin, environment };
const setSettings = require('../utilities/set-settings')(context);
const removeSettings = require('../utilities/remove-settings')(context);
const getRefs = require('../utilities/get-refs')(context);

const Func = require('./push-notifications-on-create');
const sendFCMMessage = require('../utilities/send-fcm-message')(context);

describe('PushNotificationsOnCreate', () => {
  const uid = '123456';
  const pushNotificationId = '987654';
  const messagingToken = 'fake messaging token';
  const pushNotificationsRef = getRefs.pushNotifications(uid);
  const settings = {
    messagingToken,
  };

  let func;
  let snap;
  let eventContext;
  let pushNotification;

  beforeAll(async () => {
    func = Func(context);

    pushNotification = {
      type: 'admin',
      detail: { text: 'push notification text' },
    };

    snap = {
      val: () => pushNotification,
      ref: { remove: jest.fn() },
    };

    eventContext = {
      params: { uid, pushNotificationId },
    };

    await setSettings(uid, settings);
    await func(snap, eventContext);
    await func(snap, { params: { uid: 'without settings' } });
  });

  afterAll(async () => {
    await removeSettings(uid, settings);
  });

  it('should have the isTest flag', () => {
    expect(environment.isTest).toEqual(true);
  });

  describe('with messagingToken', () => {
    it('should call sendFCMMessage', () => {
      expect(sendFCMMessage).toHaveBeenCalledWith({
        token: messagingToken,
        data: { type: pushNotification.type, ...pushNotification.detail },
      });
    });

    it('should remove the ref', () => {
      expect(snap.ref.remove).toHaveBeenCalled();
    });
  });

  describe('without messagingToken', () => {
    it('should not call sendFCMMessage without valid settings', () => {
      expect(sendFCMMessage).toHaveBeenCalledTimes(1);
    });

    it('should remove the ref both times', () => {
      expect(snap.ref.remove).toHaveBeenCalledTimes(2);
    });
  });
});
