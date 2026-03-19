const CACHE = 'daengdaeng-v1';

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(cache =>
      cache.addAll(['/daengdaeng-care/', '/daengdaeng-care/index.html'])
    ).catch(() => {})
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(clients.claim());
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() =>
      caches.match(e.request).then(r => r || new Response('offline'))
    )
  );
});
