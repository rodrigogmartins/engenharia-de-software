self.addEventListener('install', function(event) {
    let indexPage = new Request('index.html');
    event.waitUntil(
        fetch(indexPage).then(function(response) {
            caches.open('pwabuilder-offline').then(function(cache) {
                console.log('[PWA Builder] Cached index page during Install' + response.url);
                return cache.addAll(['/01-weather-forecast/',
                    '/01-weather-forecast/index.html',
                    '/01-weather-forecast/css/style.css',
                    '/01-weather-forecast/js/apikeys.js',
                    '/01-weather-forecast/js/estados.hs',
                    '/01-weather-forecast/js/forecast.js',
                    '/01-weather-forecast/js/main.js',
                    '/01-weather-forecast/sw.js',
                    '/01-weather-forecast/image/250px/1.jpg',
                    '/01-weather-forecast/image/250px/1n.jpg',
                    '/01-weather-forecast/image/250px/2.jpg',
                    '/01-weather-forecast/image/250px/2n.jpg',
                    '/01-weather-forecast/image/250px/2r.jpg',
                    '/01-weather-forecast/image/250px/2rn.jpg',
                    '/01-weather-forecast/image/250px/3.jpg',
                    '/01-weather-forecast/image/250px/3.png',
                    '/01-weather-forecast/image/250px/3n.jpg',
                    '/01-weather-forecast/image/250px/3n.png',
                    '/01-weather-forecast/image/250px/3tm.jpg',
                    '/01-weather-forecast/image/250px/4.jpg',
                    '/01-weather-forecast/image/250px/4n.jpg',
                    '/01-weather-forecast/image/250px/4r.jpg',
                    '/01-weather-forecast/image/250px/4rn.jpg',
                    '/01-weather-forecast/image/250px/4t.png',
                    '/01-weather-forecast/image/250px/4tn.png',
                    '/01-weather-forecast/image/250px/5.jpg',
                    '/01-weather-forecast/image/250px/5n.jpg',
                    '/01-weather-forecast/image/250px/6.jpg',
                    '/01-weather-forecast/image/250px/6n.jpg',
                    '/01-weather-forecast/image/250px/7.jpg',
                    '/01-weather-forecast/image/250px/7.png',
                    '/01-weather-forecast/image/250px/7n.jpg',
                    '/01-weather-forecast/image/250px/7n.png',
                    '/01-weather-forecast/image/250px/8.jpg',
                    '/01-weather-forecast/image/250px/8n.jpg',
                    '/01-weather-forecast/image/250px/9.jpg',
                    '/01-weather-forecast/image/250px/9n.jpg',
                    '/01-weather-forecast/image/250px/.jpg'
                ]);
            });
        })
    );
});

self.addEventListener('fetch', function(event) {
    let updateCache = function(request) {
        return caches.open('pwabuilder-offline').then(function(cache) {
            return fetch(request).then(function(response) {
                console.log('[PWA Builder] add page to offline' + response.url);
                return cache.put(request, response);
            });
        });
    };

    event.waitUntil(updateCache(event.request));

    event.respondWith(
        fetch(event.request).catch(function(error) {
            console.log('[PWA Builder] Network request Failed. Serving content from cache: ' + error);
            return caches.open('pwabuilder-offline').then(function(cache) {
                return cache.match(event.request).then(function(matching) {
                    let report = !matching || matching.status == 404
                        ? Promise.reject('no-match') : matching;
                    return report;
                });
            });
        })
    );
});
