// Este service worker cachea todos los recursos para no generar trafico en la red y convierte a la PWA en instalable.
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('app').then(function(cache) {
      return cache.addAll([

      ]);
    })
  );
});
self.addEventListener('fetch', function(event) {
  event.respondWith(
    // si la info esta cacheada, muestra eso, caso contrario realiza el fetch al server.
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

//#region Background Sync
// self.addEventListener('sync', event =>{
//   if(event.tag == 'tag-name'){
//     event.waitUntil(syncOperation());
//   }
// })
//#endregion 


//#region Periodic Sync
// self.addEventListener('periodicsync', event =>{
//   if(event.tag == 'sync-tag'){
//     event.waitUntil(doPeriodicSyncOperation());
//   }
// })
//#endregion