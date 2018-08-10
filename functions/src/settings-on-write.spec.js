jest.mock('../utilities/update-jwt');

const admin = require('../utilities/test-admin');
const environment = require('../environments/environment.test');
const context = { admin, environment };
const getUser = require('../utilities/get-user')(context);
const deleteUser = require('../utilities/delete-user')(context);

const Func = require('./settings-on-write');

describe('SettingsOnWrite', () => {
  const uid = '123456';

  let func;
  let addedChange;
  let deletedChange;
  let settings;
  let updateJwt;

  beforeEach(async () => {
    func = Func(context);

    settings = {
      displayName: 'display name',
      photoUrl: 'photo url',
      photoUrlPath: 'photo url path',
    };

    addedChange = {
      after: {
        data: () => settings,
      },
    };

    deletedChange = {
      after: {
        data: () => {},
      },
    };

    updateJwt = require('../utilities/update-jwt')(context);
  });

  afterEach(async () => {
    return deleteUser(uid);
  });

  it('should have the isTest flag', () => {
    expect(environment.isTest).toEqual(true);
  });

  describe('with values', () => {
    let user;

    beforeAll(async () => {
      await func(addedChange, { params: { uid } });

      user = await getUser(uid);
    });

    it('should save the object', async () => {
      expect(user.photoUrl).toEqual(settings.photoUrl);
      expect(user.photoUrlPath).toEqual(settings.photoUrlPath);
    });

    it('should save the object', async () => {
      expect(updateJwt).toHaveBeenCalledWith(uid, {
        displayName: settings.displayName,
        photoUrl: settings.photoUrl,
      });
    });
  });

  describe('without values', () => {
    let user;

    beforeAll(async () => {
      await func(deletedChange, { params: { uid } });

      user = await getUser(uid);
    });

    it('should save the object', async () => {
      expect(!!user.photoUrl).toEqual(false);
      expect(!!user.photoUrlPath).toEqual(false);
      expect(!!user.updated).toEqual(true);
    });

    it('should save the object', async () => {
      expect(updateJwt).toHaveBeenCalledWith(uid, {
        displayName: undefined,
        photoUrl: undefined,
      });
    });
  });
});
