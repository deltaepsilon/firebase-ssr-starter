jest.mock('../utilities/update-jwt');

const admin = require('../utilities/test-admin');
const environment = require('../environments/environment.test');
const context = { admin, environment };
const getUser = require('../utilities/get-user')(context);
const deleteUser = require('../utilities/delete-user')(context);
const uuidv4 = require('uuid/v4');

const Func = require('./settings-on-write');

describe('SettingsOnWrite', () => {
  const uid = uuidv4();

  let func;
  let addedChange;
  let deletedChange;
  let settings;
  let updateJwt;

  beforeEach(async () => {
    func = Func(context);

    settings = {
      displayName: 'display name',
      photoURL: 'photo url',
      photoURLPath: 'photo url path',
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
      expect(user.photoURL).toEqual(settings.photoURL);
      expect(user.photoURLPath).toEqual(settings.photoURLPath);
    });

    it('should save the object', async () => {
      expect(updateJwt).toHaveBeenCalledWith(uid, {
        displayName: settings.displayName,
        photoURL: settings.photoURL,
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
      expect(!!user.photoURL).toEqual(false);
      expect(!!user.photoURLPath).toEqual(false);
      expect(!!user.updated).toEqual(true);
    });

    it('should save the object', async () => {
      expect(updateJwt).toHaveBeenCalledWith(uid, {
        displayName: undefined,
        photoURL: undefined,
      });
    });
  });
});
