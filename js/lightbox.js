/* ===========================================================================
   lightbox.js — full-screen image viewer for the gallery grids
   (loaded on index.html and galerija.html)
   =========================================================================== */
(function () {
  'use strict';

  var lightbox = document.getElementById('lightbox');
  var items = Array.prototype.slice.call(document.querySelectorAll('.gallery__item'));
  if (!lightbox || !items.length) return;

  var imgEl = document.getElementById('lightbox-img');
  var capEl = document.getElementById('lightbox-caption');
  var countEl = document.getElementById('lightbox-counter');
  var btnClose = lightbox.querySelector('.lightbox__close');
  var btnPrev = lightbox.querySelector('.lightbox__prev');
  var btnNext = lightbox.querySelector('.lightbox__next');

  /* Build the slide list from the figures' data-attributes. */
  var slides = items.map(function (fig) {
    return {
      full: fig.getAttribute('data-full'),
      caption: fig.getAttribute('data-caption') || ''
    };
  });

  var current = 0;
  var lastFocused = null;

  function render() {
    var s = slides[current];
    imgEl.src = s.full;
    imgEl.alt = s.caption;
    capEl.textContent = s.caption;
    countEl.textContent = (current + 1) + ' / ' + slides.length;
  }

  function open(index) {
    current = index;
    lastFocused = document.activeElement;
    render();
    lightbox.classList.add('is-open');
    document.body.classList.add('is-locked');
    btnClose.focus();
  }

  function close() {
    lightbox.classList.remove('is-open');
    document.body.classList.remove('is-locked');
    imgEl.removeAttribute('src');
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  function step(delta) {
    current = (current + delta + slides.length) % slides.length;
    render();
  }

  /* Open on thumbnail click. */
  items.forEach(function (fig, i) {
    var trigger = fig.querySelector('.gallery__open');
    if (trigger) {
      trigger.addEventListener('click', function () { open(i); });
    }
  });

  btnClose.addEventListener('click', close);
  btnPrev.addEventListener('click', function () { step(-1); });
  btnNext.addEventListener('click', function () { step(1); });

  /* Click on the dark backdrop (not the image) closes the viewer. */
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox || e.target.classList.contains('lightbox__stage')) {
      close();
    }
  });

  /* Keyboard controls. */
  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') step(-1);
    else if (e.key === 'ArrowRight') step(1);
  });
})();
