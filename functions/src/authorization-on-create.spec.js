const admin = require('../utilities/dev-admin');
const environment = require('../environments/environment.dev');

const Func = require('./authorization-on-create');

describe('AuthorizationOnCreate', () => {
  let func;
  let user;

  beforeEach(() => {
    func = Func({ admin, environment });
    user = {
      uid: '123456',
      email: 'tester@chrisesplin.com',
    };
  });

  it('should have the right environment', () => {
    expect(environment.firebase.isDev).toEqual(true);
  });

  it('should return a promise', () => {
    const result = func(user);
    expect(result).toEqual({});
  });
});
