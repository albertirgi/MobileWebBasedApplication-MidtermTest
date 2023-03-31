const cacheName = "pwa-portfolio";
const filesToCache = [
    "./",
    "./index.html",
    "./blog.html",
    "./about.html",
    "./contact.html",
    "./portfolio-example01.html",
    "./styles.css",
    "./app.js",
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
    "./images/portfolio-example-06.jpg"
];

self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});