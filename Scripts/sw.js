self.addEventListener('install', event => {
    event.waitUntil(
      caches.open('v1').then(cache => {
        return cache.addAll([
            '/',  // Root path for GitHub Pages
            '/index.html',  // Homepage
            '/styles/styles.css',  // CSS file
            '/scripts/script.js',  // JavaScript file
            '/favicons/favicon-192x192.png',  // Favicon 192x192
            '/favicons/favicon-512x512.png'  // Favicon 512x512
        ]);
      })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
});
