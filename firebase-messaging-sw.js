importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyCGE9TrLvHAIwuXn0o6jqFSw5RhSOHDtg8",
    projectId: "apptaxi-f2190",
    messagingSenderId: "804273724178",
    appId: "1:804273724178:web:c5955a1f657884c0e7f1cb"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[sw.js] Mensaje en segundo plano recibido:', payload);
    const notificationTitle = payload.notification.title || "📜 Crónica del Reino";
    const notificationOptions = {
        body: payload.notification.body,
        icon: 'favicon.png',
        badge: 'favicon.png',
        tag: 'chronicon-push'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

const CACHE_NAME = 'chronicon-v121';
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

self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (clientList) {
            if (clientList.length > 0) {
                let client = clientList[0];
                for (let i = 0; i < clientList.length; i++) {
                    if (clientList[i].focused) {
                        client = clientList[i];
                    }
                }
                return client.focus();
            }
            return clients.openWindow('index.html');
        })
    );
});

// --- SISTEMA DE ALARMA LOCAL (EXPERIMENTAL) ---
// Permite que la app programe avisos que suenan aunque esté cerrada
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SCHEDULE_NOTIFICATION') {
        const { title, body, timestamp, tag } = event.data;

        // Intentar programar con Notification Triggers (si el móvil lo soporta)
        const options = {
            body: body,
            icon: 'favicon.png',
            badge: 'favicon.png',
            tag: tag,
            showTrigger: new TimestampTrigger(timestamp)
        };

        self.registration.showNotification(title, options).catch(err => {
            console.warn("Notification Triggers no soportado aún, se usará el modo activo.");
        });
    }
});
