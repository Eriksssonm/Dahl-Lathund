// Cache-version – öka vid varje deploy för att tvinga uppdatering
const CACHE = 'dahl-lathund-v3';

// Allt som appen behöver för att fungera offline
const FILES = [
  './',
  './index.html',
  './manifest.json',
];

// INSTALL: cacha alla filer direkt vid installation
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(FILES))
      .then(() => self.skipWaiting())
  );
});

// ACTIVATE: rensa gamla cache-versioner
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// FETCH: cache-first för appens egna filer, network-only för externa
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // Ignorera externa requests (dahl.se-länkar etc) – låt dem gå direkt
  if (url.origin !== self.location.origin) return;

  // Ignorera chrome-extension och icke-GET
  if (e.request.method !== 'GET') return;
  if (!e.request.url.startsWith('http')) return;

  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) {
        // Finns i cache – svara direkt, uppdatera cache i bakgrunden
        fetch(e.request)
          .then(fresh => {
            if (fresh && fresh.status === 200) {
              caches.open(CACHE).then(c => c.put(e.request, fresh));
            }
          })
          .catch(() => {}); // Tyst fail om offline
        return cached;
      }

      // Inte i cache – hämta från nätet och cacha
      return fetch(e.request).then(res => {
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() => {
        // Komplett offline och inget i cache – returnera index.html som fallback
        return caches.match('./index.html');
      });
    })
  );
});
