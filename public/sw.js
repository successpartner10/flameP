// Service Worker — Self-Destruct & Cache Wipe
// This version clears ALL caches and unregisters itself so the app
// always loads fresh JS/CSS from the network.

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(cacheNames.map((name) => {
        console.log('[SW] Deleting cache:', name);
        return caches.delete(name);
      }));
    }).then(() => {
      console.log('[SW] All caches cleared. Unregistering service worker.');
      return self.registration.unregister();
    }).then(() => {
      // Force all controlled clients to reload and get fresh assets
      return self.clients.matchAll({ type: 'window' });
    }).then((clients) => {
      clients.forEach((client) => client.navigate(client.url));
    })
  );
});

// Pass ALL fetches straight to network — no caching
self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});
