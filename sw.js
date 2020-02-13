self.addEventListener('install', function(e) {

    e.waitUntil(

        caches.open('airhorner').then(function(cache) {

            return cache.addAll([

                '/',
                '/index.html',
                '/index.html?homescreen=1',
                '/?homescreen=1',
                '/styles.css',
                '/generateQrCode.js',
                '/img/qrify_100.png',
                '/img/qrify_200.png',
                '/img/qrify_300.png',
                '/img/qrify_400.png',
                '/img/qrify_500.png',
                '/img/qrify_1000.png'
            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {

    console.log(event.request.url);

    event.respondWith(

        caches.match(event.request).then(function(response) {

            return response || fetch(event.request);
        })
    );
});