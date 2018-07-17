const admin = require('firebase-admin');
const environment = require('./environments/environment.json');
const functions = require('firebase-functions');

admin.initializeApp();

const {
  AuthorizationOnCreate,
  
} = require('./src');
const context = { admin, environment };


// authorization-on-create
const authorizationOnCreate = AuthorizationOnCreate(context);
exports.authorizationOnCreate = functions.auth
  .user()
  .onCreate(authorizationOnCreate);
  