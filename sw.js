// https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Offline_Service_workers
// https://jakearchibald.com/2014/offline-cookbook/
// https://web.dev/offline-cookbook/
const cacheName = 'password-generator-v1';
const files = [
    "/",
    "/index.html",
    "/manifest.json",
    "/eff.txt",
    "/icons/apple-icon-57x57.png",
    "/icons/apple-icon-57x57.avif",
    "/icons/apple-icon-72x72.png",
    "/icons/apple-icon-72x72.avif",
    "/icons/favicon-96x96.png",
    "/icons/favicon-96x96.avif",
    "/icons/android-icon-192.192.png",
    "/icons/android-icon-192.192.avif",
    "/icons/apple-icon-512x512.png",
    "/icons/apple-icon-512x512.avif"
]

self.addEventListener("install", (e) => {
  e.waitUntil((async () => {
        const cache = await caches.open(cacheName)
        await cache.addAll(files)
    })())
})


self.addEventListener('fetch', (e) => {
    e.respondWith((async () => {
        const r = await caches.match(e.request)
        if (r) { return r }
        const response = await fetch(e.request)
        const cache = await caches.open(cacheName)
        cache.put(e.request, response.clone())
        return response
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
