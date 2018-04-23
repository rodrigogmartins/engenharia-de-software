// NEW
// This is the "Offline copy of pages" wervice worker
// Install stage sets up the index page (home page) in the cahche and opens a new cache
self.addEventListener('install', function(event) {
    let indexPage = new Request('index.html');
    event.waitUntil(
        fetch(indexPage).then(function(response) {
            caches.open('pwabuilder-offline').then(function(cache) {
                console.log('[PWA Builder] Cached index page during Install' + response.url);
                return cache.addAll([
                    '/projeto/',
                    '/projeto/index.html',
                    '/projeto/perfil.html',
                    '/projeto/produtos.html',
                    '/projeto/produto.html',
                    '/projeto/sobre.html',
                    '/projeto/cadastro.html',
                    '/projeto/avaliacoes.html',
                    '/projeto/carrinhocompras.html',
                    '/projeto/alterardados.html',
                    '/projeto/images/bala.jpg',
                    '/projeto/images/coracao.png',
                    '/projeto/images/figado.png',
                    '/projeto/images/footer-background.png',
                    '/projeto/images/header-bg.jpg',
                    '/projeto/images/heroina.jpeg',
                    '/projeto/images/logo-sobre.jpg',
                    '/projeto/images/logo.png',
                    '/projeto/images/lsd.jpg',
                    '/projeto/images/meth.jpg',
                    '/projeto/images/rim.jpg',
                    '/projeto/images/sangue.jpeg',
                    '/projeto/images/weed.jpg',
                    '/projeto/images/icons/icon-72x72.png'
                ]);
            });
        })
    );
});


self.addEventListener('fetch', function(event) {
    const updateCache = function(request) {
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

            // Check to see if you have it in the cache
            // Return response
            // If not in the cache, then return error page
            return caches.open('pwabuilder-offline').then(function(cache) {
                return cache.match(event.request).then(function(matching) {
                    const report = !matching || matching.status == 404 ? Promise.reject('no-match') : matching;
                    return report;
                });
            });
        })
    );
});
