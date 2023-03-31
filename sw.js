const cacheName = "pwa-portfolio";
const filesToCache = [
    "./",
    "./index.html",
    "./blog.html",
    "./about.html",
    "./contact.html",
    "./portfolio-example01.html",
    "./styles.css",
    "./images/about-header.jpg",
    "./images/contact-image.jpg",
    "./images/example-blog01.jpg",
    "./images/example-blog02.jpg",
    "./images/example-blog03.jpg",
    "./images/example-blog04.jpg",
    "./images/example-blog05.jpg",
    "./images/example-blog06.jpg",
    "./images/example-blog07.jpg",
    "./images/example-work01.jpg",
    "./images/example-work02.jpg",
    "./images/example-work03.jpg",
    "./images/example-work04.jpg",
    "./images/example-work05.jpg",
    "./images/example-work06.jpg",
    "./images/example-work07.jpg",
    "./images/example-work08.jpg",
    "./images/example-work09.jpg",
    "./images/footer-background.png",
    "./images/header-bg.jpg",
    "./images/logo.png",
    "./images/photo-wide.jpg",
    "./images/photo.jpg",
    "./images/portfolio-example-01.jpg",
    "./images/portfolio-example-02.jpg",
    "./images/portfolio-example-03.jpg",
    "./images/portfolio-example-04.jpg",
    "./images/portfolio-example-05.jpg",
    "./images/portfolio-example-06.jpg",
    "./manifest.json"
];

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

// TODO: replace the following with the correct offline fallback page i.e.: const offlineFallbackPage = "offline.html";
const offlineFallbackPage = "ToDo-replace-this-name.html";

self.addEventListener("message", (event) => {
    if (event.data && event.data.type === "SKIP_WAITING") {
        self.skipWaiting();
    }
});

self.addEventListener('install', async(event) => {
    event.waitUntil(
        caches.open(CACHE)
        .then((cache) => cache.add(offlineFallbackPage))
    );
});

if (workbox.navigationPreload.isSupported()) {
    workbox.navigationPreload.enable();
}

self.addEventListener('fetch', (event) => {
    if (event.request.mode === 'navigate') {
        event.respondWith((async() => {
            try {
                const preloadResp = await event.preloadResponse;

                if (preloadResp) {
                    return preloadResp;
                }

                const networkResp = await fetch(event.request);
                return networkResp;
            } catch (error) {

                const cache = await caches.open(CACHE);
                const cachedResp = await cache.match(offlineFallbackPage);
                return cachedResp;
            }
        })());
    }
});