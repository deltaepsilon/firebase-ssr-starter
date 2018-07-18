jest.mock('../utilities/set-custom-claims');

const admin = require('../utilities/dev-admin');
const environment = require('../environments/environment.test');
const context = { admin, environment };
const SetCustomClaimsByEmail = require('../utilities/set-custom-claims-by-email');
const setCustomClaimsByEmail = SetCustomClaimsByEmail(context);
const RemoveCustomClaimsByEmail = require('../utilities/remove-custom-claims-by-email');
const removeCustomClaimsByEmail = RemoveCustomClaimsByEmail(context);

const Func = require('./authorization-on-create');
const usersCollection = admin.firestore().collection(environment.schema.users);

describe('AuthorizationOnCreate', () => {
  const email = 'tester@chrisesplin.com';
  let func;
  let user;
  let claimsObj;
  let userDoc;
  let now = new Date();

  beforeEach(done => {
    func = Func(context);

    user = {
      uid: '123456',
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

    setCustomClaimsByEmail(claimsObj).then(() => done(), done.fail);
  });

  afterAll(done => {
    Promise.resolve()
      .then(() => userDoc.delete())
      .then(() => removeCustomClaimsByEmail(email))
      .then(() => done(), done.fail);
  });

  it('should set claims', done => {
    func(user)
      .then(() => userDoc.get())
      .then(snapshot => snapshot.data())
      .then(user => {
        expect(user.claims).toEqual(claimsObj.claims);
        expect(user.email).toEqual(email);
        done();
      })
      .catch(done.fail);
  });
});
