var CACHE_NAME = 'pwa-task-manager';
var urlsToCache = [
    '/',
    '/completed'
];

// Install a service worker
self.addEventListener('install', event => {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Cache and return requests
self.addEventListener('fetch', event => {
    // Check if the request is for the old domain and redirect to local server
    let requestUrl = event.request.url;

    if (requestUrl.includes('yourdomain.com') || requestUrl.includes('your-domain.com')) {
        // Redirect to local server
        requestUrl = requestUrl
            .replace(/https?:\/\/yourdomain\.com/g, 'http://localhost:8001')
            .replace(/https?:\/\/your-domain\.com/g, 'http://localhost:8001')
            .replace(/yourdomain\.com/g, 'localhost:8001')
            .replace(/your-domain\.com/g, 'localhost:8001');

        // Create new request with corrected URL
        const newRequest = new Request(requestUrl, {
            method: event.request.method,
            headers: event.request.headers,
            body: event.request.body,
            mode: 'cors',
            credentials: event.request.credentials,
            cache: event.request.cache,
            redirect: event.request.redirect,
            referrer: event.request.referrer
        });

        event.respondWith(fetch(newRequest));
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }
            )
    );
});

// Update a service worker
self.addEventListener('activate', event => {
    var cacheWhitelist = ['pwa-task-manager'];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});