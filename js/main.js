/* AMINSOURCE — interactions */
(function () {
  'use strict';

  // Navbar shadow on scroll
  var nav = document.querySelector('.nav');
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle('scrolled', window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Mobile menu toggle
  var toggle = document.querySelector('.menu-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
    // close menu when a link is clicked
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  // Reveal on scroll
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  // Inquiry form -> open WhatsApp with prefilled message (no backend needed)
  var form = document.getElementById('inquiry-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var g = function (id) { var el = document.getElementById(id); return el ? el.value.trim() : ''; };
      var name = g('f-name');
      var company = g('f-company');
      var country = g('f-country');
      var product = g('f-product');
      var msg = g('f-message');
      var waNumber = form.getAttribute('data-wa') || '8613538973550';
      var lines = ['Hello Anlin Trading, I have a sourcing inquiry:', ''];
      if (name) lines.push('Name: ' + name);
      if (company) lines.push('Company: ' + company);
      if (country) lines.push('Country: ' + country);
      if (product) lines.push('Product: ' + product);
      if (msg) lines.push('Details: ' + msg);
      var url = 'https://wa.me/' + waNumber + '?text=' + encodeURIComponent(lines.join('\n'));
      window.open(url, '_blank');
    });
  }
})();
