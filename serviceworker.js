const APP_VERSION = "2.0.5";
const CACHE_NAME = `drdn-${APP_VERSION}`;
const STATIC_ASSETS = [
    '/',
    '/index',
    '/admin',
    '/css/style.css',
    '/css/admin.css',
    '/js/script.js',
    '/js/admin.js'
];

// Install: Cache all static files
self.addEventListener("install", event => {
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
});

// Fetch: Serve from cache first, then network
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
