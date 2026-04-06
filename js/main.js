// Language switch — updates all [data-i18n] elements and toggle states
function setLang(lang) {
  if (!translations[lang]) return;

  const t = translations[lang];
  document.title = t.pageTitle;
  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) el.innerHTML = t[key];
  });

  // Sync all toggle buttons (desktop + mobile)
  ['btn-en', 'mbtn-en'].forEach(id => {
    const b = document.getElementById(id);
    if (b) { b.classList.toggle('active', lang === 'en'); b.setAttribute('aria-pressed', lang === 'en'); }
  });
  ['btn-pt', 'mbtn-pt'].forEach(id => {
    const b = document.getElementById(id);
    if (b) { b.classList.toggle('active', lang === 'pt'); b.setAttribute('aria-pressed', lang === 'pt'); }
  });

  localStorage.setItem('lang', lang);
}

// Mobile nav toggle
function closeMobileNav() {
  document.getElementById('mobile-nav').classList.remove('open');
  document.getElementById('hamburger').setAttribute('aria-expanded', 'false');
}

// Typewriter effect for the hero name
function initTypewriter() {
  const el = document.getElementById('typewriter-name');
  if (!el) return;
  const full = el.dataset.text || el.textContent;
  el.textContent = '';
  let i = 0;
  const tick = () => {
    el.textContent = full.slice(0, ++i);
    if (i < full.length) setTimeout(tick, 60);
  };
  setTimeout(tick, 600);
}

// Scroll reveal via IntersectionObserver
function initReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => io.observe(el));
}

// Highlight active nav link based on scroll position
function initActiveNav() {
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${e.target.id}`));
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  document.querySelectorAll('section[id]').forEach(s => io.observe(s));
}

// Subtle parallax on hero window
function initParallax() {
  const win = document.querySelector('.hero-window');
  if (!win) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    win.style.transform = y < 600 ? `translateY(${y * 0.04}px)` : '';
  }, { passive: true });
}

document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('lang') || 'en';
  setLang(savedLang);

  initReveal();
  initActiveNav();
  initTypewriter();
  initParallax();

  // Hero reveals immediately without waiting for scroll
  requestAnimationFrame(() => {
    document.querySelectorAll('#hero .reveal').forEach(el => el.classList.add('visible'));
  });

  document.getElementById('hamburger').addEventListener('click', function () {
    const isOpen = document.getElementById('mobile-nav').classList.toggle('open');
    this.setAttribute('aria-expanded', isOpen);
  });
});
