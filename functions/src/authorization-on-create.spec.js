jest.mock('../utilities/set-custom-claims');

const admin = require('../utilities/test-admin');
const environment = require('../environments/environment.test');
const context = { admin, environment };
const SetCustomClaimsByEmail = require('../utilities/set-custom-claims-by-email');
const setCustomClaimsByEmail = SetCustomClaimsByEmail(context);
const RemoveCustomClaimsByEmail = require('../utilities/remove-custom-claims-by-email');
const removeCustomClaimsByEmail = RemoveCustomClaimsByEmail(context);

const Func = require('./authorization-on-create');
const db = admin.firestore();

const usersCollection = db.collection(environment.schema.users);
const uuidv4 = require('uuid/v4');

describe('AuthorizationOnCreate', () => {
  const email = 'tester@chrisesplin.com';
  let func;
  let user;
  let claimsObj;
  let userDoc;
  let now = new Date();

  beforeEach(async () => {
    func = Func(context);

    user = {
      uid: uuidv4(),
      email: null,
      emailVerified: true,
      metadata: {
        lastSignInTime: now,
        creationTime: now,
      },
      providerData: [{ email }],
    };

    userDoc = usersCollection.doc(user.uid);

    claimsObj = {
      email,
      claims: {
        isAdmin: true,
      },
    };

    return setCustomClaimsByEmail(claimsObj);
  });

  afterAll(async () => {
    await userDoc.delete();
    await removeCustomClaimsByEmail(email);
  });

  it('should have the isTest flag', () => {
    expect(environment.isTest).toEqual(true);
  });

  it('should set claims', async () => {
    await func(user);
    const snapshot = await userDoc.get();
    const result = snapshot.data();

    expect(result.claims).toEqual(claimsObj.claims);
    expect(result.email).toEqual(email);
  });
});
