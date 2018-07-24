/* global firebase */
importScripts('https://www.gstatic.com/firebasejs/5.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.2.0/firebase-messaging.js');

const environment = {
  firebase: {
    apiKey: 'AIzaSyBRLf1WkEBxAw5owXqTTlFIIjYNR1hoatg',
    authDomain: 'fir-ssr-starter.firebaseapp.com',
    databaseURL: 'https://fir-ssr-starter.firebaseio.com',
    projectId: 'fir-ssr-starter',
    storageBucket: '',
    messagingSenderId: '58348257612',
  },
};

firebase.initializeApp(environment.firebase);

importScripts('/static/scripts/sw.js');
