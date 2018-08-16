const admin = require('../utilities/test-admin');
const environment = require('../environments/environment.test');
const context = { admin, environment };
const getMessageLog = require('../utilities/get-message-log')(context);
const setMessageLog = require('../utilities/set-message-log')(context);
const removeMessageLog = require('../utilities/remove-message-log')(context);
const getMessageStats = require('../utilities/get-message-stats')(context);
const updateMessageStats = require('../utilities/update-message-stats')(context);
const removeMessageStats = require('../utilities/remove-message-stats')(context);

const Func = require('./messages-on-write');

describe('MessagesOnWrite', () => {
  const uid = '123456';
  const messageId = '987654';

  let func;
  let addedChange;
  let deletedChange;
  let message;

  beforeEach(async () => {
    func = Func(context);

    message = {
      uid,
      created: 'created',
      displayName: 'displayName',
      email: 'email',
      photoUrl: 'photoUrl',
      text: 'text',
    };

    addedChange = {
      after: {
        data: () => message,
      },
    };

    deletedChange = {
      after: {
        data: () => {},
      },
    };
  });

  afterEach(async () => {
    await removeMessageStats(uid);
    return removeMessageLog(messageId);
  });

  it('should have the isTest flag', () => {
    expect(environment.isTest).toEqual(true);
  });

  describe('with values', () => {
    let result;
    let stats;

    beforeEach(async () => {
      await func(addedChange, { params: { uid, messageId } });

      result = await getMessageLog(messageId);
      stats = await getMessageStats(uid);
    });

    it('should save the object', () => {
      expect(result.uid).toEqual(uid);
    });

    it('should save the stats', () => {
      expect(stats.uid).toEqual(uid);
      expect(stats.count).toEqual(1);
    });
  });

  describe('without values', () => {
    beforeEach(async () => {
      await updateMessageStats(uid, message);
      await setMessageLog(messageId, message);
    });

    it('should start with an object', async () => {
      const message = await getMessageLog(messageId);
      expect(message.uid).toEqual(uid);
    });

    it('should delete the object', async () => {
      await func(deletedChange, { params: { uid, messageId } });

      const message = await getMessageLog(messageId);

      expect(message).toEqual(undefined);
    });

    it('should have zero count for the stats', async () => {
      await func(deletedChange, { params: { uid, messageId } });
      
      const stats = await getMessageStats(uid);

      expect(stats.uid).toEqual(uid);
      expect(stats.count).toEqual(0);
    });
  });
});
