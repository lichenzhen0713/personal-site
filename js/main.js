/* ==========================================================================
   Lichenzhen / Lith — interactions
   Theme, navigation, scroll reveal. No dependencies.
   ========================================================================== */

(function () {
  'use strict';

  var root = document.documentElement;
  var body = document.body;
  var header = document.querySelector('[data-header]');
  var themeToggle = document.querySelector('.theme-toggle');
  var menuToggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('site-nav');
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('[data-nav]'));
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------------
     Theme
     ------------------------------------------------------------------------ */

  var THEME_COLORS = {
    light: '#f3f0e8',
    dark: '#0c0e11'
  };

  function currentTheme() {
    return root.dataset.theme === 'dark' ? 'dark' : 'light';
  }

  function syncThemeUI() {
    var theme = currentTheme();
    var next = theme === 'dark' ? '浅色' : '深色';
    var meta = document.querySelector('meta[name="theme-color"]');

    if (themeToggle) {
      themeToggle.setAttribute('aria-label', '切换到' + next + '模式');
      themeToggle.setAttribute('title', '切换到' + next + '模式');
    }
    if (meta) {
      meta.setAttribute('content', THEME_COLORS[theme]);
    }
    root.style.colorScheme = theme;
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try {
        localStorage.setItem('theme', next);
      } catch (e) { /* 忽略存储失败 */ }
      syncThemeUI();
    });
  }

  syncThemeUI();

  /* ------------------------------------------------------------------------
     Header state
     ------------------------------------------------------------------------ */

  var ticking = false;

  function onScroll() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 8);
    ticking = false;
  }

  window.addEventListener(
    'scroll',
    function () {
      if (!ticking) {
        window.requestAnimationFrame(onScroll);
        ticking = true;
      }
    },
    { passive: true }
  );

  onScroll();

  /* ------------------------------------------------------------------------
     Mobile navigation
     ------------------------------------------------------------------------ */

  function setMenu(open) {
    body.classList.toggle('nav-open', open);
    if (menuToggle) {
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.setAttribute('aria-label', open ? '关闭菜单' : '打开菜单');
    }
  }

  function closeMenu() {
    setMenu(false);
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', function (event) {
      event.stopPropagation();
      setMenu(!body.classList.contains('nav-open'));
    });
  }

  if (nav) {
    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) closeMenu();
    });
  }

  document.addEventListener('click', function (event) {
    if (!body.classList.contains('nav-open')) return;
    if (nav && nav.contains(event.target)) return;
    if (menuToggle && menuToggle.contains(event.target)) return;
    closeMenu();
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && body.classList.contains('nav-open')) {
      closeMenu();
      if (menuToggle) menuToggle.focus();
    }
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 760) closeMenu();
  });

  /* ------------------------------------------------------------------------
     Active section
     ------------------------------------------------------------------------ */

  var sections = ['work', 'about', 'now', 'contact']
    .map(function (id) {
      return document.getElementById(id);
    })
    .filter(Boolean);

  function setActive(id) {
    navLinks.forEach(function (link) {
      var active = link.getAttribute('data-nav') === id;
      link.classList.toggle('is-active', active);
      if (active) {
        link.setAttribute('aria-current', 'true');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  if ('IntersectionObserver' in window && sections.length) {
    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-32% 0px -58% 0px', threshold: 0 }
    );

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  /* ------------------------------------------------------------------------
     Scroll reveal
     ------------------------------------------------------------------------ */

  var revealItems = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));

  if (!revealItems.length) return;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach(function (item) {
      item.classList.add('is-visible');
    });
    return;
  }

  var revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
  );

  revealItems.forEach(function (item) {
    revealObserver.observe(item);
  });
})();
