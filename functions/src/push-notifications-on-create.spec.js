jest.mock('../utilities/send-fcm-message');

const admin = require('../utilities/test-admin');
const environment = require('../environments/environment.test');
const context = { admin, environment };
const getUserSettings = require('../utilities/get-user-settings')(context);
const setUserSettings = require('../utilities/set-user-settings')(context);
const removeUserSettings = require('../utilities/remove-user-settings')(context);

const Func = require('./push-notifications-on-create');
const sendFCMMessage = require('../utilities/send-fcm-message')(context);

describe('PushNotificationsOnCreate', () => {
  const uid = '123456';
  const pushNotificationId = '987654';
  const messagingToken = 'fake messaging token';
  const settings = {
    messagingTokens: {
      valid: messagingToken,
      invalid: 'invalid',
    },
  };

  let func;
  let snap;
  let eventContext;
  let pushNotification;

  beforeAll(async () => {
    func = Func(context);

    pushNotification = {
      type: 'admin',
      created: new Date().toString(),
      detail: { text: 'push notification text' },
    };

    snap = {
      val: () => pushNotification,
      ref: { remove: jest.fn() },
    };

    eventContext = {
      params: { uid, pushNotificationId },
    };

    await setUserSettings(uid, settings);
    await func(snap, eventContext);
    await func(snap, { params: { uid: 'without settings' } });
  });

  afterAll(async () => {
    await removeUserSettings(uid, settings);
  });

  it('should have the isTest flag', () => {
    expect(environment.isTest).toEqual(true);
  });

  describe('with messagingToken', () => {
    it('should call sendFCMMessage', () => {
      expect(sendFCMMessage).toHaveBeenCalledWith({
        token: messagingToken,
        data: {
          type: pushNotification.type,
          created: pushNotification.created,
          ...pushNotification.detail,
        },
      });
    });

    it('should remove the ref', () => {
      expect(snap.ref.remove).toHaveBeenCalled();
    });

    it('should remove the invalid key', async () => {
      const settings = await getUserSettings(uid);

      expect(Object.keys(settings.messagingTokens).join()).toEqual('valid');
    });
  });

  describe('without messagingToken', () => {
    it('should not call sendFCMMessage without valid settings', () => {
      expect(sendFCMMessage).toHaveBeenCalledTimes(2);
    });

    it('should remove the ref both times', () => {
      expect(snap.ref.remove).toHaveBeenCalledTimes(2);
    });
  });
});
