// https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Offline_Service_workers
// https://jakearchibald.com/2014/offline-cookbook/
// https://web.dev/offline-cookbook/
const cacheName = 'password-generator-v1.2';
const files = [
    "/",
    "/index.html",
    "/manifest.json",
    "/eff.txt",
    "apple-icon-57x57.avif",
    "apple-icon-72x72.png",
    "apple-icon-192.192.avif",
    "apple-icon-512x512.png",
    "apple-icon-57x57.png",
    "apple-icon-96x96.avif",
    "apple-icon-192.192.png",
    "apple-icon-72x72.avif",
    "apple-icon-96x96.png",
    "apple-icon-512x512.avif"
]

self.addEventListener("install", (e) => {
  e.waitUntil((async () => {
        const cache = await caches.open(cacheName)
        await cache.addAll(files)
    })())
})


self.addEventListener('fetch', (e) => {
    e.respondWith((async () => {
        let response = await caches.match(e.request)
        return response || await fetch(e.request)
    })())
})

self.addEventListener('activate', (e) => {
    e.waitUntil(caches.keys().then((keyList) => {
        return Promise.all(keyList.map((key) => {
            if (key === cacheName) { return }
            return caches.delete(key)
        }))
    }))
})
