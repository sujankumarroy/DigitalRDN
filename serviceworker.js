const APP_VERSION = "1.2.56";
const CACHE_NAME = `drdn-${APP_VERSION}`;
const STATIC_ASSETS = [
    '/',
    '/index',
    '/assets/styles/style.css',
    '/assets/scripts/script.js'
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open("app-cache").then(cache => {
            return cache.addAll(STATIC_ASSETS);
        })
    );
});
