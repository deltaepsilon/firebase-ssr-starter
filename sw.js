/* global firebase */
importScripts('https://www.gstatic.com/firebasejs/5.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.2.0/firebase-messaging.js');
importScripts('/environment.sw.js')

firebase.initializeApp(environment.firebase);

var messaging = firebase.messaging();

const iconUrl =
  'https://firebasestorage.googleapis.com/v0/b/firelist-react.appspot.com/o/assets%2Fbolt-144px.png?alt=media&token=a747522e-22a4-496d-bcc9-429a007a86fb';
messaging.setBackgroundMessageHandler(payload =>
  self.registration.showNotification('Firebase SSR', {
    body: payload.data.message,
    data: payload.data,
    icon: iconUrl,
  })
);

self.addEventListener('notificationclick', function(e) {
  const { noteId } = e.notification.data;
  const noteUrl = `/note/${noteId}`;

  e.notification.close();

  if (noteId) {
    e.waitUntil(clients.openWindow(noteUrl));
  }
});

if (!environment.isDevelopment) {
  /**
   * Cacheing
   * 
   https://developers.google.com/web/fundamentals/primers/service-workers/#cache_and_return_requests
   */

  //Establish cache
  const CACHE_NAME = 'firebase-ssr-v0.0.0';
  const urlsToCache = ['/', '/static/styles/app.css'];
  self.addEventListener('install', event => {
    const promise = caches
      .open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
      .catch(error => console.log('sw install error: optimistic caching', error))
      .then(() => {
        console.log('sw install successful');
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
      .catch(error => console.log('sw activation error', error))
      .then(() => console.log('sw activation successful'));

    event.waitUntil(promise);
  });
} else {
  console.log('sw cacheing disabled for development');
}
