// The desk's service worker, hand-written (registered by app/_sw.tsx).
//
// What offline means here: every page renders per request behind a session, and the desk
// caches no page and no data. Offline, the user sees one page, /offline.html, with a Retry
// button. Nothing else is touched: a request that is not a navigation goes to the network as
// if there were no worker.
//
// The cache name changes when offline.html changes, so the new page replaces the old one on
// the next activate.
const CACHE = "desk-offline-2026-10-27";
const OFFLINE = "/offline.html";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.add(OFFLINE))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.mode !== "navigate") return;
  event.respondWith(
    fetch(event.request).catch(() => caches.match(OFFLINE).then((page) => page ?? Response.error())),
  );
});
