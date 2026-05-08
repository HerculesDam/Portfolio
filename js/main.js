(() => {
  /* ───────────────────────────────────────── */
  /*  1. LANGUAGE                              */
  /* ───────────────────────────────────────── */
  const langBtns = document.querySelectorAll('.lang-btn');
  const dataI18nEls = document.querySelectorAll('[data-i18n]');
  let currentLang = localStorage.getItem('portfolio-lang') || 'en';

  function setLang(lang) {
    currentLang = lang;
    localStorage.setItem('portfolio-lang', lang);
    // Update lang radio buttons
    langBtns.forEach(btn => {
      const isActive = btn.dataset.lang === lang;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-checked', isActive);
    });
    document.documentElement.lang = lang;

    // Update all data-i18n elements
    dataI18nEls.forEach(el => {
      const key = el.dataset.i18n;
      if (!key) return;
      let val = translations[lang]?.[key] ?? translations['en']?.[key] ?? key;
      // array values (e.g. termProjects) — handled specially by terminal render
      if (Array.isArray(val)) {
        // For array values, store but don't set innerHTML here
        // (the terminal renderer will use them directly)
        el.setAttribute('data-i18n-raw', JSON.stringify(val));
        return;
      }
      if (typeof val === 'string') {
        // For icon-only buttons (theme toggle), only update aria-label, never innerHTML
        if (el.id === 'theme-toggle') {
          el.setAttribute('aria-label', val);
          return;
        }
        el.innerHTML = val;
      }
    });

    // Update meta tags
    document.title = translations[lang]?.pageTitle || translations['en'].pageTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = translations[lang]?.metaDesc || translations['en'].metaDesc;
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.content = translations[lang]?.ogTitle || translations['en'].ogTitle;
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.content = translations[lang]?.ogDesc || translations['en'].ogDesc;
    const ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) ogLocale.content = lang === 'pt' ? 'pt_BR' : 'en_US';

    // Update terminal prompt in the DOM
    const prompt = document.querySelector('.term-prompt');
    if (prompt) prompt.textContent = (translations[lang]?.termPrompt || 'guest@portfolio:~$') + ' ';
  }

  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      setLang(btn.dataset.lang);
    });
  });

  // Init language
  setLang(currentLang);

  /* ───────────────────────────────────────── */
  /*  2. THEME TOGGLE                          */
  /* ───────────────────────────────────────── */
  const themeBtn = document.getElementById('theme-toggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  function getTheme() {
    return localStorage.getItem('portfolio-theme') || (prefersDark ? 'dark' : 'light');
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
    if (themeBtn) themeBtn.innerHTML = theme === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    // update meta color-scheme
    const metaCS = document.querySelector('meta[name="color-scheme"]');
    if (metaCS) metaCS.content = theme === 'dark' ? 'dark light' : 'light dark';
  }

  setTheme(getTheme());

  themeBtn?.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    setTheme(next);
  });

  /* ───────────────────────────────────────── */
  /*  3. NAVIGATION & MOBILE                   */
  /* ───────────────────────────────────────── */
  const hamburger = document.getElementById('nav-hamburger');
  const mobileNav = document.getElementById('mobile-nav');

  hamburger?.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !expanded);
    mobileNav?.setAttribute('aria-hidden', expanded);
  });

  // Close mobile nav on link click
  mobileNav?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.setAttribute('aria-expanded', 'false');
      mobileNav.setAttribute('aria-hidden', 'true');
    });
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        target.focus({ preventScroll: true });
      }
    });
  });

  /* ───────────────────────────────────────── */
  /*  4. SCROLL PROGRESS BAR                   */
  /* ───────────────────────────────────────── */
  const scrollBar = document.getElementById('scroll-progress');
  if (scrollBar) {
    window.addEventListener('scroll', () => {
      const h = document.documentElement;
      const scrollTop = h.scrollTop || document.body.scrollTop;
      const scrollHeight = h.scrollHeight || document.body.scrollHeight;
      const clientHeight = h.clientHeight;
      const pct = (scrollTop / (scrollHeight - clientHeight)) * 100;
      scrollBar.style.transform = `scaleX(${pct / 100})`;
    }, { passive: true });
  }

  /* ───────────────────────────────────────── */
  /*  5. REVEAL ANIMATIONS (IntersectionObserver)*/
  /* ───────────────────────────────────────── */
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReduced) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // If it's a stagger container, reveal children sequentially
          if (entry.target.classList.contains('reveal-stagger')) {
            const children = entry.target.children;
            Array.from(children).forEach((child, i) => {
              setTimeout(() => child.classList.add('visible'), i * 120);
            });
          }
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => observer.observe(el));
  } else {
    // Show all immediately if reduced motion
    document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => el.classList.add('visible'));
    document.querySelectorAll('.reveal-stagger > *').forEach(child => child.classList.add('visible'));
  }

  /* ───────────────────────────────────────── */
  /*  6. SKILL BAR ANIMATION                   */
  /* ───────────────────────────────────────── */
  if (!prefersReduced) {
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fills = entry.target.querySelectorAll('.skill-bar-fill');
          fills.forEach(fill => {
            const w = fill.dataset.width;
            if (w) fill.style.width = w + '%';
          });
          skillObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    document.querySelectorAll('.skill-group').forEach(group => skillObserver.observe(group));
  } else {
    document.querySelectorAll('.skill-bar-fill').forEach(fill => {
      const w = fill.dataset.width;
      if (w) fill.style.width = w + '%';
    });
  }

  /* ───────────────────────────────────────── */
  /*  7. MULTI-TEXT TYPEWRITER                 */
  /* ───────────────────────────────────────── */
  const multiTextEl = document.getElementById('multi-text');
  if (multiTextEl && !prefersReduced) {
    const getRoles = () => [
      translations[currentLang]?.role1 || 'Automation Engineer',
      translations[currentLang]?.role2 || 'Full-Stack Developer',
      translations[currentLang]?.role3 || 'IoT Enthusiast',
      translations[currentLang]?.role4 || 'Problem Solver',
    ];
    let roles = getRoles();
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeTick() {
      // Refresh roles in case language changed
      roles = getRoles();
      const current = roles[roleIdx % roles.length];
      if (isDeleting) {
        multiTextEl.textContent = current.substring(0, charIdx - 1);
        charIdx--;
        typeSpeed = 40;
      } else {
        multiTextEl.textContent = current.substring(0, charIdx + 1);
        charIdx++;
        typeSpeed = 90;
      }

      if (!isDeleting && charIdx === current.length) {
        typeSpeed = 1600;
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        roleIdx++;
        typeSpeed = 400;
      }
      multiTextEl._timeout = setTimeout(typeTick, typeSpeed);
    }

    typeTick();
    // Cleanup on page hide
    window.addEventListener('beforeunload', () => clearTimeout(multiTextEl._timeout));
  }

  /* ───────────────────────────────────────── */
  /*  8. HERO STATUS PULSING DOT               */
  /* ───────────────────────────────────────── */
  // already handled via CSS animation on .status-dot

  /* ───────────────────────────────────────── */
  /*  9. INTERACTIVE TERMINAL                  */
  /* ───────────────────────────────────────── */
  const termBody = document.getElementById('terminal-body');
  const termInput = document.getElementById('term-input');
  const termInputLine = document.getElementById('term-input-line');
  const history = [];
  let historyIndex = -1;
  let currentCmd = '';

  if (termInput && termBody) {
    // Show welcome message
    appendOutput(translations[currentLang]?.termWelcome || 'Welcome!');

    termInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const cmd = termInput.value.trim();
        if (cmd) {
          history.push(cmd);
          historyIndex = history.length;
          appendOutput(`<span class="term-prompt" aria-hidden="true">${translations[currentLang]?.termPrompt || 'guest@portfolio:~$'}</span> ${escapeHtml(cmd)}`);
          executeCommand(cmd);
        }
        termInput.value = '';
        // Scroll to bottom
        termBody.scrollTop = termBody.scrollHeight;
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex > 0) {
          historyIndex--;
          termInput.value = history[historyIndex];
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < history.length - 1) {
          historyIndex++;
          termInput.value = history[historyIndex];
        } else {
          historyIndex = history.length;
          termInput.value = '';
        }
      } else if (e.ctrlKey && e.key === 'l') {
        e.preventDefault();
        clearTerminal();
      } else if (e.key === 'Tab') {
        e.preventDefault();
        // Simple autocomplete
        const val = termInput.value.toLowerCase();
        const commands = ['whoami','neofetch','ls projects','cat resume','contact','skills','clear','help','lang en','lang pt','theme dark','theme light'];
        const match = commands.find(c => c.startsWith(val));
        if (match) termInput.value = match;
      }
    });

    // Focus terminal input when clicking anywhere in terminal
    termBody.addEventListener('click', () => termInput.focus());
  }

  function appendOutput(html) {
    if (!termBody) return;
    const line = document.createElement('div');
    line.className = 'term-output-line';
    line.innerHTML = html;
    termBody.insertBefore(line, termInputLine);
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function executeCommand(cmd) {
    const lang = currentLang;
    const t = translations[lang];
    const lower = cmd.toLowerCase().trim();

    if (lower === 'help') {
      appendOutput(t.termHelp);
    } else if (lower === 'whoami') {
      appendOutput(t.termWhoami);
    } else if (lower === 'neofetch') {
      const lines = t.termNeofetch;
      if (Array.isArray(lines)) {
        const pre = document.createElement('div');
        pre.className = 'term-output-line neofetch-output';
        pre.innerHTML = lines.map(l => escapeHtml(l)).join('<br>');
        termBody.insertBefore(pre, termInputLine);
      }
    } else if (lower === 'ls projects' || lower === 'ls') {
      const projects = t.termProjects;
      if (Array.isArray(projects)) {
        appendOutput(projects.map(p => escapeHtml(p)).join('<br>'));
      }
    } else if (lower === 'cat resume') {
      appendOutput(t.termResume);
    } else if (lower === 'contact') {
      appendOutput(t.termContact.replace(/\n/g, '<br>'));
    } else if (lower === 'skills') {
      appendOutput(t.termSkills.replace(/\n/g, '<br>'));
    } else if (lower === 'clear') {
      clearTerminal();
    } else if (lower === 'lang en') {
      setLang('en');
      appendOutput(translations['en'].termLangEn);
    } else if (lower === 'lang pt') {
      setLang('pt');
      appendOutput(translations['pt'].termLangPt);
    } else if (lower === 'theme dark') {
      setTheme('dark');
      appendOutput(t.termThemeD);
    } else if (lower === 'theme light') {
      setTheme('light');
      appendOutput(t.termThemeL);
    } else {
      appendOutput(t.termUnknown);
    }
  }

  function clearTerminal() {
    if (!termBody) return;
    const lines = termBody.querySelectorAll('.term-output-line');
    lines.forEach(line => line.remove());
  }

  /* ───────────────────────────────────────── */
  /* 10. ANIMATED BACKGROUND CANVAS            */
  /* ───────────────────────────────────────── */
  const canvas = document.getElementById('animated-bg');
  if (canvas && !prefersReduced) {
    const ctx = canvas.getContext('2d');
    let w, h;
    const particles = [];
    const particleCount = 60;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = document.body.scrollHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * 1.5 + 0.5,
        speedY: Math.random() * 0.4 + 0.15,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
      particles.forEach(p => {
        p.y += p.speedY;
        if (p.y > h) { p.y = 0; p.x = Math.random() * w; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `rgba(0, 255, 100, ${p.opacity})`
          : `rgba(30, 30, 40, ${p.opacity})`;
        ctx.fill();
      });
      requestAnimationFrame(draw);
    }

    draw();

    // Update particle colors on theme change
    const origSetTheme = setTheme;
    window._setThemeWrapped = true;
  }

  /* ───────────────────────────────────────── */
  /* 11. 3D TILT ON PROJECT CARDS              */
  /* ───────────────────────────────────────── */
  if (!prefersReduced) {
    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / centerY * -5;
        const rotateY = (x - centerX) / centerX * 5;
        card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(600px) rotateX(0) rotateY(0) scale3d(1,1,1)';
      });
    });
  }

  /* ───────────────────────────────────────── */
  /* 12. FULLSCREEN GALLERY OVERLAY            */
  /* ───────────────────────────────────────── */
  const galleryCards = document.querySelectorAll('.gallery-card');
  const galleryFullscr = document.getElementById('gallery-fullscr');
  const galleryImg = document.getElementById('gallery-fullscr-img');
  const galleryCaption = document.getElementById('gallery-fullscr-caption');
  const galleryClose = document.getElementById('gallery-fullscr-close');
  const galleryPrev = document.getElementById('gallery-fullscr-prev');
  const galleryNext = document.getElementById('gallery-fullscr-next');

  if (galleryCards.length && galleryFullscr) {
    let galleryIdx = 0;

    function openGallery(idx) {
      galleryIdx = idx;
      const card = galleryCards[idx];
      if (!card) return;
      const img = card.querySelector('img');
      const projName = card.querySelector('.gallery-proj-name')?.textContent || '';
      const desc = card.querySelector('figcaption span:last-child')?.textContent || '';
      if (galleryImg && img) {
        galleryImg.src = img.src;
        galleryImg.alt = img.alt;
      }
      if (galleryCaption) {
        galleryCaption.innerHTML = `<strong>${projName}</strong>${desc ? ' — ' + desc : ''}`;
      }
      // Placeholder fallback
      if (!img && galleryImg) {
        const icon = card.querySelector('.gallery-placeholder')?.textContent?.trim();
        galleryImg.removeAttribute('src');
        galleryImg.alt = projName;
      }
      galleryFullscr.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeGallery() {
      galleryFullscr.classList.remove('open');
      document.body.style.overflow = '';
    }

    function prevGallery() {
      galleryIdx = (galleryIdx - 1 + galleryCards.length) % galleryCards.length;
      openGallery(galleryIdx);
    }

    function nextGallery() {
      galleryIdx = (galleryIdx + 1) % galleryCards.length;
      openGallery(galleryIdx);
    }

    // Click on card opens fullscreen
    galleryCards.forEach((card, i) => {
      card.addEventListener('click', () => openGallery(i));
    });

    // Close button
    if (galleryClose) galleryClose.addEventListener('click', closeGallery);
    // Prev/next buttons
    if (galleryPrev) galleryPrev.addEventListener('click', (e) => { e.stopPropagation(); prevGallery(); });
    if (galleryNext) galleryNext.addEventListener('click', (e) => { e.stopPropagation(); nextGallery(); });
    // Click outside image closes
    galleryFullscr.addEventListener('click', (e) => {
      if (e.target === galleryFullscr || e.target === galleryImg) return;
      if (!e.target.closest('.gallery-fullscr-prev') && !e.target.closest('.gallery-fullscr-next')) closeGallery();
    });
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!galleryFullscr.classList.contains('open')) return;
      if (e.key === 'Escape') closeGallery();
      if (e.key === 'ArrowLeft') prevGallery();
      if (e.key === 'ArrowRight') nextGallery();
    });
  }

})();
