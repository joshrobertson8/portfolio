// Navigation and section behavior for desktop and mobile menus.
document.addEventListener('DOMContentLoaded', () => {
  const navMenu = document.querySelector('.nav-menu');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));
  const navbar = document.querySelector('.navbar');
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const body = document.body;

  if (!navMenu || !mobileMenuBtn || navLinks.length === 0) {
    return;
  }

  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  let prefersReducedMotion = motionQuery.matches;
  const updateMotionPreference = (event) => {
    prefersReducedMotion = event.matches;
  };
  if (typeof motionQuery.addEventListener === 'function') {
    motionQuery.addEventListener('change', updateMotionPreference);
  } else if (typeof motionQuery.addListener === 'function') {
    motionQuery.addListener(updateMotionPreference);
  }

  let isMenuOpen = false;
  let scrollTicking = false;

  const setMenuState = (open) => {
    isMenuOpen = open;
    navMenu.classList.toggle('active', open);
    mobileMenuBtn.classList.toggle('active', open);
    navMenu.setAttribute('aria-hidden', String(!open));
    mobileMenuBtn.setAttribute('aria-expanded', String(open));
    body.style.overflow = open ? 'hidden' : '';
  };

  const closeMenu = () => setMenuState(false);

  // Ensure consistent state on load.
  closeMenu();

  mobileMenuBtn.addEventListener('click', () => {
    setMenuState(!isMenuOpen);
  });

  document.addEventListener(
    'click',
    (event) => {
      if (!isMenuOpen) return;
      if (!navMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
        closeMenu();
      }
    },
    { passive: true }
  );

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isMenuOpen) {
      closeMenu();
    }
  });

  const updateActiveLink = (hash) => {
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === hash);
    });
  };

  const scrollToSection = (target, hash, triggeredFromMenu) => {
    const behavior = prefersReducedMotion ? 'auto' : 'smooth';

    const executeScroll = () => {
      target.scrollIntoView({ behavior, block: 'start' });
      if (hash) {
        try {
          history.replaceState(null, '', hash);
        } catch (_error) {
          // Ignore unsupported history states.
        }
      }
    };

    if (triggeredFromMenu) {
      const delay = prefersReducedMotion ? 0 : 160;
      closeMenu();
      window.setTimeout(executeScroll, delay);
    } else {
      executeScroll();
    }
  };

  navLinks.forEach((link) => {
    link.addEventListener(
      'click',
      (event) => {
        const href = link.getAttribute('href');
        if (!href || !href.startsWith('#')) {
          closeMenu();
          updateActiveLink(href);
          return;
        }

        const target = document.getElementById(href.slice(1));
        if (!target) return;

        event.preventDefault();
        updateActiveLink(href);
        scrollToSection(target, href, isMenuOpen);
      },
      { passive: false }
    );
  });

  const sectionMetrics = () =>
    sections.map((section) => ({
      id: section.id,
      top: section.offsetTop,
      height: section.offsetHeight,
    }));

  let sectionsBounds = sectionMetrics();

  const refreshSectionBounds = () => {
    sectionsBounds = sectionMetrics();
  };

  const handleScroll = () => {
    if (scrollTicking) return;
    scrollTicking = true;

    requestAnimationFrame(() => {
      const scrollY = window.scrollY;

      if (navbar) {
        navbar.classList.toggle('scrolled', scrollY > 50);
      }

      const offset = (navbar?.offsetHeight ?? 80) + 20;
      const focusLine = scrollY + offset;

      let activeHash = null;
      for (const bound of sectionsBounds) {
        if (focusLine >= bound.top && focusLine < bound.top + bound.height) {
          activeHash = `#${bound.id}`;
          break;
        }
      }

      if (activeHash) {
        updateActiveLink(activeHash);
      }

      scrollTicking = false;
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  window.addEventListener(
    'resize',
    () => {
      refreshSectionBounds();
      if (isMenuOpen && window.innerWidth > 1024) {
        closeMenu();
      }
    },
    { passive: true }
  );

  window.addEventListener('load', () => {
    refreshSectionBounds();
    handleScroll();
  });

  if (prefersReducedMotion) {
    sections.forEach((section) => section.classList.add('visible'));
  } else if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    sections.forEach((section) => observer.observe(section));
  } else {
    sections.forEach((section) => section.classList.add('visible'));
  }

  refreshSectionBounds();
  handleScroll();
});
