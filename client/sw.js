const CACHE_NAME = "01v96-remote-v1.0.0";
const STATIC_CACHE_URLS = [
  "/",
  "/css/main.css",
  "/lib/font-awesome/css/font-awesome.min.css",
  "/lib/jquery/jquery-2.1.0.min.js",
  "/lib/fastclick/fastclick.js",
  "/js/main.js",
  "/img/favicon.ico",
  "/img/touch/57.png",
  "/img/touch/76.png",
  "/img/touch/120.png",
  "/img/touch/152.png",
  "/img/touch/256.png",
  "/img/touch/512.png",
  "/img/loading.gif",
  "/img/fader-level.svg",
];

// Install event - cache static assets
self.addEventListener("install", (event) => {
  console.log("[Service Worker] Install");
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("[Service Worker] Caching all: app shell and content");
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("[Service Worker] Activate");
  event.waitUntil(
    caches
      .keys()
      .then((keyList) => {
        return Promise.all(
          keyList.map((key) => {
            if (key !== CACHE_NAME) {
              console.log("[Service Worker] Removing old cache", key);
              return caches.delete(key);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache when offline
self.addEventListener("fetch", (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Skip WebSocket requests - they can't be cached
  if (
    event.request.url.includes("ws://") ||
    event.request.url.includes("wss://")
  ) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version or fetch from network
      return (
        response ||
        fetch(event.request)
          .then((response) => {
            // Don't cache non-successful responses
            if (
              !response ||
              response.status !== 200 ||
              response.type !== "basic"
            ) {
              return response;
            }

            // Clone the response since it can only be consumed once
            const responseToCache = response.clone();

            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });

            return response;
          })
          .catch(() => {
            // If both cache and network fail, try to serve a fallback page
            if (event.request.destination === "document") {
              return caches.match("/");
            }
          })
      );
    })
  );
});

// Handle background sync for offline actions
self.addEventListener("sync", (event) => {
  if (event.tag === "background-sync") {
    console.log("[Service Worker] Background Sync triggered");
    // Here you could implement logic to sync any offline actions
  }
});

// Handle push notifications (if needed in the future)
self.addEventListener("push", (event) => {
  if (event.data) {
    console.log("[Service Worker] Push received:", event.data.text());
    // Here you could implement push notification logic
  }
});
