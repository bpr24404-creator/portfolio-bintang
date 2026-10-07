const CACHE='bintang-mag-v2';
const CORE=['./','./index.html','./manifest.webmanifest','./sw.js',...Array.from({length:17},(_,i)=>`./pages/page_${String(i+1).padStart(2,'0')}.jpg`)];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
