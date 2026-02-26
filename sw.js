const CACHE_NAME = 'chronicon-v120';
const ASSETS = [
    './',
    './index.html',
    './calendar_medieval.html?v=1.2.0',
    './favicon.png',
    './manifest.json',
    './dragon.mp3'
];

// Instalación: Almacenar archivos en caché
self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

// Activación: Limpiar caches antiguos
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Borrando cache antiguo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Estrategia: Network-First con Fallback a Cache y respuesta de error segura
self.addEventListener('fetch', (event) => {
    // Solo manejar peticiones GET para evitar errores con Firestore/POST
    if (event.request.method !== 'GET') return;

    event.respondWith(
        fetch(event.request)
            .then((response) => {
                return response;
            })
            .catch(async () => {
                const cachedResponse = await caches.match(event.request);
                if (cachedResponse) return cachedResponse;

                // Fallback para navegación offline
                if (event.request.mode === 'navigate') {
                    const indexFallback = await caches.match('./index.html') || await caches.match('./');
                    if (indexFallback) return indexFallback;
                }

                // Si todo falla, devolver una respuesta de error válida en lugar de undefined
                return new Response('Network error occurred and no cache available', {
                    status: 408,
                    headers: { 'Content-Type': 'text/plain' }
                });
            })
    );
});
