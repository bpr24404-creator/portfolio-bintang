const CACHE = "bintang-magazine-v1";
const APP = "./";
self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then(c => c.addAll([APP, "./index.html", "./manifest.webmanifest"])));
});
self.addEventListener("activate", event => { event.waitUntil(self.clients.claim()); });
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(res => {
    const copy=res.clone(); caches.open(CACHE).then(c=>c.put(event.request, copy)); return res;
  }).catch(()=>cached)));
});
