const admin = require('../functions/utilities/test-admin');
const users = require('../seeds/fake-users.json');

seedUsers(users);

async function seedUsers(users) {
  let i = users.length;

  while (i--) {
    const user = users[i];
    await admin.auth().createUser(user);
    console.info('created', user);
  }

  console.info('complete!');

  process.exit();
}
