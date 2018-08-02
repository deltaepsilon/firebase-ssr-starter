# firebase-ssr-starter

Firebase + Next.js + AMP = 🐱‍👓; In other words, built for MAXIMUM SEO and MAXIMUM FLEXIBILITY with no compromises (or ragerts)

# Environments

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
import schema from './schema';

export default {
  firebase: {
    apiKey: 'AIzaSyBRLf1WkEBxAw5owXqTTlFIIjYNR1hoatg',
    authDomain: 'fir-ssr-starter.firebaseapp.com',
    databaseURL: 'https://fir-ssr-starter.firebaseio.com',
    projectId: 'fir-ssr-starter',
    storageBucket: '',
    messagingSenderId: '58348257612',
  },
  schema,
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

# Deploying

## Get a Firebase CI token

Run `yarn global add firebase-tools` if you don't have `firebase-tools` on your machine.

Run `firebase login:ci` and follow the prompts to generate a Firebase CI token. Use `firebase login:ci --no-localhost` if you're having trouble.

Copy `./env.list.dist` to `env.list` and replace `FIREBASE_TOKEN=XXXXX` with `FIREBASE_TOKEN=YOUR-TOKEN-HERE`.

## Install Docker

Install Docker using the [Docker Community Edition(CE) Install Guide](https://docs.docker.com/install/).

## Build Docker image to deploy

For Bash run `./bin/build.sh`.

For Powershell run `.\bin\build.ps1`.

## OPTIONAL: Run the deploy image interactively

For Bash run `./bin/interactive.sh`.

For Powershell run `.\bin\interactive.ps1`.

## Deploy the built code

For Bash run `./bin/deploy.sh`.

For Powershell run `.\bin\deploy.ps1`.
