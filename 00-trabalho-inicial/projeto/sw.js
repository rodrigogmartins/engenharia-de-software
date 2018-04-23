const CACHE = 'pwabuilder-precache';
const precacheFiles = [
    '/',
    '/index.html',
    '/perfil.html',
    '/produtos.html',
    '/produto.html',
    '/sobre.html',
    '/cadastro.html',
    '/avaliacoes.html',
    '/carrinhocompras.html',
    '/alterardados.html',
    '/js/main.js',
    '/js/produto.js',
    '/js/material.min.js',
    '/css/styles.css',
    '/css/material.grey-pink.min.css',
    '/images/bala.jpg',
    '/images/coracao.png',
    '/images/figado.png',
    '/images/footer-background.png',
    '/images/header-bg.jpg',
    '/images/heroina.jpeg',
    '/images/logo-sobre.jpg',
    '/images/logo.png',
    '/images/lsd.jpg',
    '/images/meth.jpg',
    '/images/icons/icon-72x72.png',
    '/images/icons/icon-96x96.png',
    '/images/icons/icon-128x128.png',
    '/images/icons/icon-144x144.png',
    '/images/icons/icon-152x152.png',
    '/images/icons/icon-384x384.png',
    '/images/icons/icon-512x512.png'
];

self.addEventListener('install', function(evt) {
    console.log('The service worker is being installed.');
    evt.waitUntil(precache().then(function() {
        console.log('[ServiceWorker] Skip waiting on install');
        return self.skipWaiting();
    })
    );
});

self.addEventListener('activate', function(event) {
    console.log('[ServiceWorker] Claiming clients for current page');
    return self.clients.claim();
});

self.addEventListener('fetch', function(evt) {
    console.log('The service worker is serving the asset.' + evt.request.url);
    evt.respondWith(fromCache(evt.request).catch(fromServer(evt.request)));
    evt.waitUntil(update(evt.request));
});


function precache() {
    return caches.open(CACHE).then(function(cache) {
        return cache.addAll(precacheFiles);
    });
}


function fromCache(request) {
    return caches.open(CACHE).then(function(cache) {
        return cache.match(request).then(function(matching) {
            return matching || Promise.reject('no-match');
        });
    });
}


function update(request) {
    return caches.open(CACHE).then(function(cache) {
        return fetch(request).then(function(response) {
            return cache.put(request, response);
        });
    });
}

function fromServer(request) {
    return fetch(request).then(function(response) {
        return response;
    });
}
