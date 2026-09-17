const CACHE_NAME = "countit-v2";

const FILES_TO_CACHE = [
  "index.html",
  "style.css",
  "lessons.html",
  "achievements.html",
  "profile.html",
  "lesson1.html",
  "lesson2.html",
  "lesson3.html",
  "lesson4.html",
  "lesson5.html",
  "lesson6.html",
  "lesson7.html",
  "lesson8.html",
  "lesson9.html",
  "lesson10.html",
  "manifest.json",
  "app.js",
  "icon.png"
];


// INSTALL
self.addEventListener("install", event => {

  event.waitUntil(

    caches.open(CACHE_NAME)
      .then(cache => {

        return cache.addAll(FILES_TO_CACHE);

      })

  );

});


// FETCH
self.addEventListener("fetch", event => {

  event.respondWith(

    caches.match(event.request)
      .then(response => {

        return response || fetch(event.request);

      })

  );

});