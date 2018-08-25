/* global firebase */
importScripts('https://www.gstatic.com/firebasejs/5.4.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.4.1/firebase-messaging.js');
importScripts('/environment.sw.js');

firebase.initializeApp(environment.firebase);

var messaging = firebase.messaging();

const iconUrl =
  'https://firebasestorage.googleapis.com/v0/b/firelist-react.appspot.com/o/assets%2Fbolt-144px.png?alt=media&token=a747522e-22a4-496d-bcc9-429a007a86fb';
messaging.setBackgroundMessageHandler(payload => {
  const notification = {
    body: payload.data.text,
    data: payload.data,
    icon: iconUrl,
  };

  self.registration.showNotification(notification.data.title || 'Firebase SSR', notification);
});

self.addEventListener('notificationclick', function(e) {
  const { url } = e.notification.data;

  e.notification.close();

  url && e.waitUntil(clients.openWindow(url));
});

if (typeof isDevelopment == 'undefined') {
  /**
   * Cacheing
   * 
   https://developers.google.com/web/fundamentals/primers/service-workers/#cache_and_return_requests
   */

  //Establish cache
  const CACHE_NAME = 'firebase-ssr-v0.0.0';
  const urlsToCache = ['/', '/static/styles/app.css', '_next/static/style.css'];

  console.info(`Attempting to establish cache ${CACHE_NAME}`);
  self.addEventListener('install', event => {
    const promise = caches
      .open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
      .catch(error => console.info('sw install error: optimistic caching', error))
      .then(() => {
        console.info('sw install successful');
      });

    event.waitUntil(promise);
  });

  // Access cache
  self.addEventListener('fetch', event => {
    const promise = caches.match(event.request).then(response => response || cacheRequest(event));
    event.respondWith(promise);
  });

  function cacheRequest(event) {
    const request = event.request.clone();
    return fetch(request).then(
      response =>
        !shouldCache(response)
          ? response
          : caches
              .open(CACHE_NAME)
              .then(cache => cache.put(event.request, response.clone()))
              .then(() => response)
    );
  }

  function shouldCache(response) {
    return response && response.status == 200 && response.type == 'basic';
  }

  // Manage caches
  self.addEventListener('activate', event => {
    const promise = caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => cacheName != CACHE_NAME && caches.delete(cacheName))
        )
      )
      .catch(error => console.info('sw activation error', error))
      .then(() => console.info('sw activation successful'));

    event.waitUntil(promise);
  });
} else {
  console.info('sw cacheing disabled for development');
}
