# firebase-ssr-starter

Firebase + Next.js + AMP = 🐱‍👓; In other words, built for MAXIMUM SEO and MAXIMUM FLEXIBILITY with no compromises (or ragerts)

## Environments

There are three type of environments required for this app to run.

1.  Firebase Functions
2.  Client-side
3.  Service Worker

## Firebase Functions environments

These environments come in two flavors, `environment.js` and `environment.test.js`.

Here are samples for both:

### /functions/environments/environment.js

```
module.exports = {
  firebase: {
    apiKey: 'AIzaSyBRLf1WkEBxAw5owXqTTlFIIjYNR1hoatg',
    authDomain: 'fir-ssr-starter.firebaseapp.com',
    databaseURL: 'https://fir-ssr-starter.firebaseio.com',
    projectId: 'fir-ssr-starter',
    storageBucket: '',
    messagingSenderId: '58348257612',
  },
  schema: {
    customClaims: 'custom-claims',
    users: 'users',
  },
};
```

### /functions/environments/environment.test.js

```
const prodEnvironment = require('./environment');

module.exports = {
  ...prodEnvironment,
  isTest: true,
  schema: {
    customClaims: 'test-custom-claims',
    users: 'test-users',
  },
};
```

## Client-side environments

Client-side environments come in two flavors, `environment.js` and `environment.dev.js`.

### Sample /environments/environment.js

```
export default {
  firebase: {
    apiKey: 'AIzaSyBRLf1WkEBxAw5owXqTTlFIIjYNR1hoatg',
    authDomain: 'fir-ssr-starter.firebaseapp.com',
    databaseURL: 'https://fir-ssr-starter.firebaseio.com',
    projectId: 'fir-ssr-starter',
    storageBucket: '',
    messagingSenderId: '58348257612',
  },
  schema: {
    users: (db, uid) => {
      return db
        .collection('user')
        .doc(uid);
    },
    preferences: (db, uid) => {
      return db
        .collection('user-owned')
        .collection('preferences')
        .doc(uid);
    },
  },
};
```

### Sample /environments/environment.dev.js

```
import prodEnvironment from "./environment";
export default {
  ...prodEnvironment,
  isDev: true
};
```

## Service Worker environment

And finally, we have our Service Worker that needs its own environment.

This one is a bit different because it's adding `environment` to global scope:

### Sample /environments/environment.sw.js

```
environment = {
  firebase: {
    apiKey: 'AIzaSyBRLf1WkEBxAw5owXqTTlFIIjYNR1hoatg',
    authDomain: 'fir-ssr-starter.firebaseapp.com',
    databaseURL: 'https://fir-ssr-starter.firebaseio.com',
    projectId: 'fir-ssr-starter',
    storageBucket: '',
    messagingSenderId: '58348257612',
  },
};
```
