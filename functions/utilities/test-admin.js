const admin = require('firebase-admin');
const environment = require('../environments/environment.test');
const serviceAccount = require('../service-account.json');

admin.initializeApp(
  Object.assign(environment.firebase, {
    credential: admin.credential.cert(serviceAccount),
  })
);

admin.firestore().settings({ timestampsInSnapshots: true });

module.exports = admin;
