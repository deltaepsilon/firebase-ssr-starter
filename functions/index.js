const admin = require('firebase-admin');
const environment = require('./environments/environment.js');
const functions = require('firebase-functions');

admin.initializeApp();

admin.firestore().settings({ timestampsInSnapshots: true });

const { AuthorizationOnCreate } = require('./src');
const context = { admin, environment };

// authorization-on-create
exports.authorizationOnCreate = functions.auth.user().onCreate(AuthorizationOnCreate(context));
