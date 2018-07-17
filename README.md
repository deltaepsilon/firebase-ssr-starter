# firebase-ssr-starter
Firebase + Next.js + AMP = 🐱‍👓; In other words, built for MAXIMUM SEO and MAXIMUM FLEXIBILITY with no compromises (or ragerts)

## Sample /functions/environments/environment.js

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
    users: 'users',
  },
};
```

## Sample /environments/environment.js

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
};
```
