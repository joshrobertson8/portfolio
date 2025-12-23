export function initCursorRing() {
  const isCoarse = window.matchMedia('(pointer: coarse)').matches;
  if (isCoarse) return () => {};

  const ring = document.createElement('div');
  const dot = document.createElement('div');
  ring.className = 'cursor-ring';
  dot.className = 'cursor-dot';
  document.body.appendChild(ring);
  document.body.appendChild(dot);
  document.documentElement.classList.add('cursor-enhanced');

  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;
  let tx = x;
  let ty = y;
  let isAnimating = true;

  const raf = () => {
    if (!isAnimating) return;
    x += (tx - x) * 0.2;
    y += (ty - y) * 0.2;

    ring.style.transform = `translate(${x - ring.offsetWidth / 2}px, ${y - ring.offsetHeight / 2}px)`;
    dot.style.transform = `translate(${tx - dot.offsetWidth / 2}px, ${ty - dot.offsetHeight / 2}px)`;

    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);

  let mouseMoveThrottle = false;
  const onMouseMove = (e) => {
    if (!mouseMoveThrottle) {
      tx = e.clientX;
      ty = e.clientY;
      mouseMoveThrottle = true;
      requestAnimationFrame(() => {
        mouseMoveThrottle = false;
      });
    }
  };
  window.addEventListener('mousemove', onMouseMove, { passive: true });

  const interactive = 'a, button, .magnetic, .nav-link, .project-card, .skill-category, .contact-card, .btn-send';

  const onMouseOver = (e) => {
    if (e.target.closest(interactive)) document.body.classList.add('cursor-active');
  };
  const onMouseOut = (e) => {
    if (e.target.closest(interactive)) document.body.classList.remove('cursor-active');
  };

  document.addEventListener('mouseover', onMouseOver, { passive: true });
  document.addEventListener('mouseout', onMouseOut, { passive: true });

  const cleanup = () => {
    isAnimating = false;
    document.documentElement.classList.remove('cursor-enhanced');
    document.body.classList.remove('cursor-active');
    window.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseover', onMouseOver);
    document.removeEventListener('mouseout', onMouseOut);
    ring.remove();
    dot.remove();
  };

  window.disableEnhancedCursor = () => cleanup();

  return cleanup;
}

export function initMagnetic() {
  const elements = Array.from(document.querySelectorAll('.magnetic'));
  if (!elements.length) return () => {};

  const cleanups = elements.map((el) => {
    el.style.willChange = 'transform';
    let rect = null;
    let isHovering = false;

    const onEnter = () => {
      rect = el.getBoundingClientRect();
      isHovering = true;
    };

    const onMove = (e) => {
      if (!isHovering || !rect) return;
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);

      requestAnimationFrame(() => {
        if (isHovering) {
          el.style.transform = `translate(${x * 0.06}px, ${y * 0.06}px)`;
        }
      });
    };

    const onLeave = () => {
      isHovering = false;
      el.style.transform = '';
      rect = null;
    };

    el.addEventListener('mouseenter', onEnter, { passive: true });
    el.addEventListener('mousemove', onMove, { passive: true });
    el.addEventListener('mouseleave', onLeave, { passive: true });

    return () => {
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      el.style.transform = '';
    };
  });

  return () => cleanups.forEach((fn) => fn && fn());
}

export function initTooltips() {
  const tooltip = document.createElement('div');
  tooltip.className = 'skill-tooltip';
  document.body.appendChild(tooltip);

  const icons = Array.from(document.querySelectorAll('.skill-icon-img'));
  const handlers = icons.map((icon) => {
    const dataTitle = icon.getAttribute('title');
    if (dataTitle) {
      icon.setAttribute('data-title', dataTitle);
      icon.removeAttribute('title');
    }

    const onEnter = (e) => {
      const text = e.target.getAttribute('data-title');
      if (text) {
        tooltip.textContent = text;
        tooltip.classList.add('visible');
        updateTooltipPosition(e, tooltip);
      }
    };

    const onMove = (e) => updateTooltipPosition(e, tooltip);
    const onLeave = () => tooltip.classList.remove('visible');

    icon.addEventListener('mouseenter', onEnter);
    icon.addEventListener('mousemove', onMove);
    icon.addEventListener('mouseleave', onLeave);

    return () => {
      icon.removeEventListener('mouseenter', onEnter);
      icon.removeEventListener('mousemove', onMove);
      icon.removeEventListener('mouseleave', onLeave);
    };
  });

  const cleanup = () => {
    handlers.forEach((fn) => fn && fn());
    tooltip.remove();
  };

  return cleanup;
}

function updateTooltipPosition(e, tooltip) {
  tooltip.style.left = `${e.clientX}px`;
  tooltip.style.top = `${e.clientY}px`;
}

export function initRippleEffect() {
  const elements = Array.from(document.querySelectorAll('.ripple-effect, .btn-send, .project-link'));
  if (!elements.length) return () => {};

  const handlers = elements.map((el) => {
    el.classList.add('ripple-effect');

    const onClick = (e) => {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple-circle');

      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      el.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    };

    el.addEventListener('click', onClick);
    return () => el.removeEventListener('click', onClick);
  });

  return () => handlers.forEach((fn) => fn && fn());
}

export function initRevealAnimations(prefersReducedMotion) {
  const targets = Array.from(
    document.querySelectorAll('.reveal-element, .reveal-left, .reveal-right, .reveal-scale, .stagger-item'),
  );

  if (!targets.length) return () => {};

  if (prefersReducedMotion) {
    targets.forEach((target) => target.classList.add('revealed'));
    return () => {};
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
  );

  targets.forEach((target) => observer.observe(target));

  return () => observer.disconnect();
}

export function initParallax(prefersReducedMotion) {
  if (prefersReducedMotion) return () => {};

  const elements = [
    ...document.querySelectorAll('.hero-logo'),
    ...document.querySelectorAll('.section-header'),
  ];

  if (!elements.length) return () => {};

  let ticking = false;
  const update = () => {
    const scrollY = window.pageYOffset;
    const viewportHeight = window.innerHeight;

    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const elementTop = rect.top + scrollY;
      const elementHeight = rect.height;
      const scrollPercent = (scrollY - elementTop + viewportHeight) / (viewportHeight + elementHeight);

      if (scrollPercent >= 0 && scrollPercent <= 1) {
        const offset = (scrollPercent - 0.5) * 100;
        el.style.setProperty('--scroll-offset', `${offset}px`);
      }
    });
  };

  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  update();

  return () => {
    window.removeEventListener('scroll', onScroll);
    elements.forEach((el) => el.style.removeProperty('--scroll-offset'));
  };
}
