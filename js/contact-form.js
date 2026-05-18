/* ===========================================================================
   contact-form.js — quote form validation + WhatsApp submission
   (loaded on kontakt.html)

   The form does not post to a server. On a valid submit it opens WhatsApp
   with a pre-filled message. To add e-mail delivery later, see PREOSTALO.md.
   =========================================================================== */
(function () {
  'use strict';

  var form = document.getElementById('quote-form');
  if (!form) return;

  /* WhatsApp number is configured via data-whatsapp on the <form>. */
  var waNumber = (form.getAttribute('data-whatsapp') || '').replace(/[^0-9]/g, '');
  var note = document.getElementById('form-note');

  /* Required fields and their human labels (for messages). */
  var FIELDS = ['ime', 'telefon', 'email', 'povrsina', 'materijal'];
  var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function fieldEl(name) { return form.elements[name]; }

  function setError(name, message) {
    var el = fieldEl(name);
    var wrap = el.closest('.field');
    var errEl = document.getElementById('err-' + name);
    if (message) {
      if (wrap) wrap.classList.add('is-invalid');
      if (errEl) errEl.textContent = message;
      el.setAttribute('aria-invalid', 'true');
    } else {
      if (wrap) wrap.classList.remove('is-invalid');
      if (errEl) errEl.textContent = '';
      el.removeAttribute('aria-invalid');
    }
    return !message;
  }

  /* Validate a single field. Returns true when valid. */
  function validateField(name) {
    var value = (fieldEl(name).value || '').trim();

    if (!value) return setError(name, 'Ovo polje je obavezno.');

    if (name === 'email' && !emailRe.test(value)) {
      return setError(name, 'Unesite ispravnu email adresu.');
    }
    if (name === 'telefon' && value.replace(/[^0-9]/g, '').length < 6) {
      return setError(name, 'Unesite ispravan broj telefona.');
    }
    if (name === 'povrsina') {
      var n = parseFloat(value.replace(',', '.'));
      if (!isFinite(n) || n <= 0) {
        return setError(name, 'Unesite površinu u m² (npr. 12).');
      }
    }
    return setError(name, '');
  }

  function validateAll() {
    var ok = true;
    var firstInvalid = null;
    FIELDS.forEach(function (name) {
      if (!validateField(name)) {
        ok = false;
        if (!firstInvalid) firstInvalid = fieldEl(name);
      }
    });
    if (firstInvalid) firstInvalid.focus();
    return ok;
  }

  /* Live feedback: validate on blur, and clear errors as the user fixes them. */
  FIELDS.forEach(function (name) {
    var el = fieldEl(name);
    el.addEventListener('blur', function () { validateField(name); });
    el.addEventListener('input', function () {
      var wrap = el.closest('.field');
      if (wrap && wrap.classList.contains('is-invalid')) validateField(name);
    });
  });

  /* Compose the WhatsApp message from the form values. */
  function buildMessage() {
    var val = function (n) { return (form.elements[n].value || '').trim(); };
    var lines = [
      'Zdravo Imperia! Želim ponudu za kuhinju po meri.',
      '',
      'Ime i prezime: ' + val('ime'),
      'Telefon: ' + val('telefon'),
      'Email: ' + val('email'),
      'Površina kuhinje: ' + val('povrsina') + ' m²',
      'Klasa materijala: ' + val('materijal')
    ];
    var msg = val('poruka');
    if (msg) lines.push('', 'Napomena: ' + msg);
    return lines.join('\n');
  }

  function showNote(html) {
    if (!note) return;
    note.hidden = false;
    note.innerHTML = html;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!validateAll()) {
      showNote('Molimo popunite ispravno sva obavezna polja označena zvezdicom.');
      return;
    }

    var url = 'https://wa.me/' + waNumber +
              '?text=' + encodeURIComponent(buildMessage());

    showNote(
      'Otvaramo WhatsApp sa vašim upitom. Ako se prozor ne otvori automatski, ' +
      '<a href="' + url + '" target="_blank" rel="noopener">kliknite ovde</a>.'
    );

    window.open(url, '_blank', 'noopener');
  });
})();
