const cacheName = 'piac-pwa-v2';
const filesToCache = [
 '/',
 '/index.html',
 '/gallery.html',
 '/style.css',
 '/js/main.js',
 '/images/meme1.gif',
 '/images/meme2.gif',
 '/images/meme3.gif',
 '/images/meme4.gif',
 '/images/meme5.gif',
 '/images/meme6.gif',
 '/images/meme7.gif',
 '/images/meme8.gif',
 '/images/meme9.gif',
];
self.addEventListener('install', (event) => {
 event.waitUntil(
 caches.open(cacheName).then((cache) => {
 return cache.addAll(filesToCache);
 })
 );
});

self.addEventListener('fetch', (event) => {
 event.respondWith(
 caches.match(event.request).then((response) => {
 return response || fetch(event.request);
 })
 );
});

self.addEventListener('activate', (event) => {
 const cacheWhitelist = [cacheName];

 event.waitUntil(
 caches.keys().then((cacheNames) => {
 return Promise.all(
 cacheNames.map((cache) => {
 if (!cacheWhitelist.includes(cache)) {
 return caches.delete(cache);
 }
 })
 );
 })
 );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
    caches.match(event.request).then((response) => {
    return response || fetch(event.request).then((fetchResponse) => {
    if (event.request.method === 'GET') {
    return caches.open(cacheName).then((cache) => {
    cache.put(event.request, fetchResponse.clone());
    return fetchResponse;
    });
    }
    return fetchResponse;
    });
    }).catch(() => {
    if (event.request.mode === 'navigate') {
    return caches.match('/index.html');
    }
    })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
    caches.match(event.request).then((response) => {
    return response || fetch(event.request).then((fetchResponse) => {
    return caches.open(cacheName).then((cache) => {
    cache.put(event.request, fetchResponse.clone());
    return fetchResponse;
    });
    });
    }).catch(() => {
    // Fallback dla braku połączenia
    if (event.request.mode === 'navigate') {
    return caches.match('/index.html');
    }
    })
    );
   });


   

   