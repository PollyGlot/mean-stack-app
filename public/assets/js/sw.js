// var cacheName = 'v1';
//
// // файлы, которые кэшируем
// var cacheFiles = [
//     'offline',
// ];
//
// self.addEventListener('install', function(e) {
//     console.log('[ServiceWorker] Installed');
//     // e.waitUntil ждёт события пока не будет промиса
//     e.waitUntil(
//         // открываем кэш
//         caches.open(cacheName).then(function(cache) {
//             // добавляем все объявленные файлы в кэш
//             console.log('[ServiceWorker] Caching cacheFiles');
//             return cache.addAll(cacheFiles);
//         })
//     );
// });
//
// self.addEventListener('activate', function(e) {
//     console.log('[ServiceWorker] Activated');
//     e.waitUntil(
//         // получаем все ключи кэша (cacheName)
//         caches.keys().then(function(cacheNames) {
//             return Promise.all(cacheNames.map(function(thisCacheName) {
//
//                 // если кэшированный элемент сохранён под предыдущей версией cacheName
//                 if (thisCacheName !== cacheName) {
//                     // удаляем тот кэшированный файл
//                     console.log('[ServiceWorker] Removing Cached Files from Cache - ', thisCacheName);
//                     return caches.delete(thisCacheName);
//                 }
//             }));
//         })
//     );
//
// });
//
// self.addEventListener('fetch', function(e) {
//     console.log('[ServiceWorker] Fetch', e.request.url);
//     // e.respondWidth отвечает на событие fetch
//     e.respondWith(
//         // проверяем в кэше был ли сделал запрос
//         caches.match(e.request)
//             .then(function(response) {
//
//                 // если запрос в кэше
//                 if ( response ) {
//                     console.log("[ServiceWorker] Found in Cache", e.request.url, response);
//                     // возвращаем кэшированную версию
//                     return response;
//                 }
//                 // если запрос НЕ в кэше, fetch и cache
//                 var requestClone = e.request.clone();
//                 fetch(requestClone)
//                     .then(function(response) {
//
//                         if ( !response ) {
//                             console.log("[ServiceWorker] No response from fetch ")
//                             return response;
//                         }
//
//                         var responseClone = response.clone();
//
//                         //  открываем кэш
//                         caches.open(cacheName).then(function(cache) {
//
//                             // ложим fetched ответ в кэш
//                             cache.put(e.request, responseClone);
//                             console.log('[ServiceWorker] New Data Cached', e.request.url);
//
//                             // возвращаем ответ
//                             return response;
//                         });
//                     })
//                     .catch(function(err) {
//                         console.log('[ServiceWorker] Error Fetching and Caching New Data', err);
//                     });
//             })
//     );
// });
