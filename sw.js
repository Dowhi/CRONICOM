const CACHE_NAME = 'chronicon-v1';
const ASSETS = [
    '/CRONICOM/',
    '/CRONICOM/index.html',
    '/CRONICOM/calendar_medieval.html',
    '/CRONICOM/favicon.png',
    '/CRONICOM/manifest.json'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
