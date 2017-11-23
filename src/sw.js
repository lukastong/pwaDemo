importScripts('./serviceworker-cache-polyfill.js');

let CACHE_VERSION = 1;
let CURRENT_CACHES = {
    prefetch: 'LIAO-PREFETCH_CACHE-V' + CACHE_VERSION
};

self.addEventListener('install', (event) => {
    let now = Date.now();

    let urlsToPrefetch = [
      '/',
      "index.html",
      "rick.png"
    ];

    console.log('Handling install event. Resources to prefetch:', urlsToPrefetch);

    event.waitUntil(
        caches.open(CURRENT_CACHES.prefetch).then((cache) => {
            let cachePromises = urlsToPrefetch.map((urlToPrefetch) => {
                let url = new URL(urlToPrefetch, location.href);
                url.search += (url.search ? '&' : '?') + 'cache-bust=' + now;
                let request = new Request(url, {mode: 'no-cors'});
                return fetch(request).then((response) => {
                    if (response.status >= 400) {
                        throw new Error(`request for ${urlToPrefetch} failed with status ${response.statusText}`);
                    }

                    return cache.put(urlToPrefetch, response);
                }).catch((error) => {
                    console.error('Not caching ' + urlToPrefetch + ' due to ' + error);
                });
            });

            return Promise.all(cachePromises).then(() => {
                console.log('Pre-fetching complete.');
            });
        }).catch((error) => {
            console.error('Pre-fetching failed:', error);
        })
    );
});

self.addEventListener('activate', (event) => {
    let expectedCacheNames = Object.keys(CURRENT_CACHES).map((key) => {
        return CURRENT_CACHES[key];
    });

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (expectedCacheNames.indexOf(cacheName) === -1) {
                        console.log('Deleting out of date cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    console.log('Handling fetch event for', event.request.url);

    event.respondWith(
        caches.match(event.request)
          .then((response) => {
              if (response) {
                  console.log('Found response in cache:', response.url);
                  return response;
              }

              console.log('No response found in cache. About to fetch from network...');
            return fetch(event.request).then((response) => {
                console.log('Response from network is:', response.url);
                return caches.open(CURRENT_CACHES.prefetch).then(function(cache) {
                  cache.put(event.request, response.clone());
                  return response;
                });
            })
            .catch((error) => {
                console.error('Fetching failed:', error);
                return caches.match('rick.png')
            });
        })
    );
});
