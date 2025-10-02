const CACHE_NAME = "business-casual-cache-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./css/styles.css",
  "./js/scripts.js",
  "./assets/favicon.ico",
  "./assets/icons/android-chrome-192x192.png",
  "./assets/icons/android-chrome-256x256.png",
  "./assets/icons/android-chrome-512x512.png",
  "./assets/icons/android-chrome-1024x1024.png",
  "./assets/img/about.jpg",
  "./assets/img/bg.jpg",
  "./assets/img/intro.jpg",
  "./assets/img/products-01.jpg",
  "./assets/img/products-02.jpg",
  "./assets/img/products-03.jpg",
];

// Instalación: guarda en caché los recursos
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("Archivos cacheados ✅");
      return cache.addAll(urlsToCache);
    })
  );
});

// Activación: limpia cachés viejas
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log("Cache viejo eliminado ❌", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch: sirve desde cache primero, si no, desde red
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response; // devuelve lo que ya está en cache
      }
      return fetch(event.request); // si no está, pide a la red
    })
  );
});
