var currentCacheName = 'restaurant-reviews-1';
var urlsToCache =[
  '/',
  '/css/styles.css',
  '/css/responsive.css',
  '/data/restaurants.json',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg',
  '/js/main.js',
  '/js/restaurant_info.js',
  '/js/dbhelper.js',
  '/index.html',
  '/restaurant.html'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(currentCacheName)
      .then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(cacheNames.map(function(cacheName) {
        if(cacheName != currentCacheName) {
            return caches.delete(cacheName);
          }
        }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          if(response) {
            return response;
        }
        return fetch(event.request);
      })
    );
  });
