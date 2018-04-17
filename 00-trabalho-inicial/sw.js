var CACHE = 'pwabuilder-precache';
var precacheFiles = [
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

//Install stage sets up the cache-array to configure pre-cache content
self.addEventListener('install', function (evt) {
  console.log('The service worker is being installed.');
  evt.waitUntil(precache().then(function () {
    console.log('[ServiceWorker] Skip waiting on install');
    return self.skipWaiting();
  })
  );
});


//allow sw to control of current page
self.addEventListener('activate', function (event) {
  console.log('[ServiceWorker] Claiming clients for current page');
  return self.clients.claim();

});

self.addEventListener('fetch', function (evt) {
  console.log('The service worker is serving the asset.' + evt.request.url);
  evt.respondWith(fromCache(evt.request).catch(fromServer(evt.request)));
  evt.waitUntil(update(evt.request));
});


function precache() {
  return caches.open(CACHE).then(function (cache) {
    return cache.addAll(precacheFiles);
  });
}


function fromCache(request) {
  //we pull files from the cache first thing so we can show them fast
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('no-match');
    });
  });
}


function update(request) {
  //this is where we call the server to get the newest version of the 
  //file to use the next time we show view
  return caches.open(CACHE).then(function (cache) {
    return fetch(request).then(function (response) {
      return cache.put(request, response);
    });
  });
}

function fromServer(request) {
  //this is the fallback if it is not in the cahche to go to the server and get it
  return fetch(request).then(function (response) { return response })
}
