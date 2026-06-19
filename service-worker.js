const CURRENT_CACHES = ['cwbd_static'];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open('pwa-cache').then((cache => {
            return cache.addAll([
                '/',
                '/index.html',
                '/css/home.min.css',
                '/jscript/gallery.js',
                '/jscript/jscript.js'
            ])
        }))
    )
})
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    )
})