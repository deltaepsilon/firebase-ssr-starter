const admin = require('firebase-admin');
const environment = require('../environments/environment.dev');
const serviceAccount = require('../service-account.json');

admin.initializeApp(Object.assign(environment.firebase, {
  credential: admin.credential.cert(serviceAccount),
}));

module.exports = admin;
