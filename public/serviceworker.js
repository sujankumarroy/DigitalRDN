const APP_VERSION = "2.5.56";
const CACHE_NAME = `drdn-${APP_VERSION}`;
const STATIC_ASSETS = [
    '/',
    '/public/index.html',
    '/public/admin.html',
    '/public/css/style.css',
    '/public/css/admin.css',
    '/dist/script.js',
    '/dist/admin.js'
];

// Install: Cache all static files
self.addEventListener("install", event => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(STATIC_ASSETS);
        })
    );
});

// Activate: Clean up old caches
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
            );
        })
    );
    self.clients.claim();
});

self.addEventListener("fetch", (event) => {
    if (event.request.method !== "GET") return;
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            const fetchPromise = fetch(event.request).then((networkResponse) => {
                if (!networkResponse || networkResponse.status !== 200) return networkResponse;
                const clone = networkResponse.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, clone);
                });
                return networkResponse;
            });
            return cachedResponse || fetchPromise;
        })
    );
});
