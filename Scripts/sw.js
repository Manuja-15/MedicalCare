self.addEventListener('install', event => {
    event.waitUntil(
      caches.open('v1').then(cache => {
        return cache.addAll([
            '/MedicalCare',  // Root path for GitHub Pages
            '/MedicalCare/index.html',  // Homepage
            '/MedicalCare/styles/styles.css',  // CSS file
            '/MedicalCare/scripts/script.js',  // JavaScript file
            '/MedicalCare/favicons/favicon-192x192.png',  // Favicon 192x192
            '/MedicalCare/favicons/favicon-512x512.png'  // Favicon 512x512
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
