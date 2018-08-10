jest.mock('../utilities/algolia-utilities');

const admin = require('../utilities/test-admin');
const environment = require('../environments/environment.test');
const context = { admin, environment };
const algolia = require('../utilities/algolia-utilities');
const { usersIndex, saveObject, deleteObject } = algolia(context);

const Func = require('./users-on-write');

describe('UsersOnWrite', () => {
  const email = 'tester@chrisesplin.com';

  let func;
  let addedChange;
  let deletedChange;
  let user;
  let saveUser;
  let deleteUser;

  let now = new Date().toString();

  beforeEach(async () => {
    func = Func(context);

    user = {
      uid: '123456',
      email: null,
      emailVerified: true,
      lastSignInTime: now,
      creationTime: now,
      providerData: [{ email }],
    };

    addedChange = {
      after: {
        data: () => user,
      },
    };

    deletedChange = {
      after: {
        data: () => undefined,
      },
    };

    saveUser = saveObject(usersIndex);
    deleteUser = deleteObject(usersIndex);
  });

  it('should have the isTest flag', () => {
    expect(environment.isTest).toEqual(true);
  });

  it('should save the object', async () => {
    await func(addedChange, { params: { uid: user.uid } });

    expect(saveUser).toHaveBeenCalledWith({
      creationTime: now,
      email: null,
      firstProvider: {
        email: 'tester@chrisesplin.com',
      },
      lastSignInTime: now,
      objectID: '123456',
      uid: '123456',
    });
  });

  it('should delete the object', async () => {
    await func(deletedChange, { params: { uid: user.uid } });

    expect(deleteUser).toHaveBeenCalledWith(user.uid);
  });
});
