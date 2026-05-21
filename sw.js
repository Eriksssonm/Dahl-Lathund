// Cache-version – UPPDATERAS AUTOMATISKT vid varje deploy via deploy-datum
// Ändra versionssträngen nedan vid varje ny deploy för att tvinga uppdatering hos alla
const CACHE = 'dahl-lathund-v20260521-1323';
const FONT_CACHE = 'dahl-fonts-v1';

const APP_FILES = [
  './',
  './index.html',
  './manifest.json',
];

// INSTALL: cacha app-filer direkt
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(APP_FILES))
      .then(() => self.skipWaiting())
  );
});

// ACTIVATE: rensa gamla app-cache versioner (behåll font-cache separat)
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE && k !== FONT_CACHE).map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

// FETCH: strategi beror på resurstyp
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // Ignorera icke-GET och chrome-extension
  if (e.request.method !== 'GET') return;
  if (!e.request.url.startsWith('http')) return;

  // Google Fonts: cache-first med lång livstid
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(
      caches.open(FONT_CACHE).then(c =>
        c.match(e.request).then(cached => {
          if (cached) return cached;
          return fetch(e.request).then(res => {
            if (res && res.status === 200) c.put(e.request, res.clone());
            return res;
          }).catch(() => cached);
        })
      )
    );
    return;
  }

  // Externa requests (dahl.se-länkar etc) – network-only
  if (url.origin !== self.location.origin) return;

  // App-filer: cache-first + bakgrundsuppdatering (stale-while-revalidate)
  e.respondWith(
    caches.match(e.request).then(cached => {
      const fetchPromise = fetch(e.request).then(fresh => {
        if (fresh && fresh.status === 200) {
          caches.open(CACHE).then(c => c.put(e.request, fresh.clone()));
        }
        return fresh;
      }).catch(() => null);

      return cached || fetchPromise.then(res => res || caches.match('./index.html'));
    })
  );
});
