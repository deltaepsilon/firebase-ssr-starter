const admin = require('firebase-admin');
const environment = require('./environments/environment.js');
const functions = require('firebase-functions');

admin.initializeApp();

admin.firestore().settings({ timestampsInSnapshots: true });

const { AuthorizationOnCreate, SettingsOnWrite, UsersOnWrite } = require('./src');
const context = { admin, environment };

// authorization-on-create
exports.authorizationOnCreate = functions.auth.user().onCreate(AuthorizationOnCreate(context));

// messages-on-write
exports.messagesOnWrite = functions.firestore
  .document(`${environment.schema.mesages}/{uid}/messages/{messageId}`)
  .onWrite(MessagesOnWrite(context));

// settings-on-write
exports.settingsOnWrite = functions.firestore
  .document(`${environment.schema.settings}/{uid}`)
  .onWrite(SettingsOnWrite(context));

// users-on-write
exports.usersOnWrite = functions.firestore
  .document(`${environment.schema.users}/{uid}`)
  .onWrite(UsersOnWrite(context));
