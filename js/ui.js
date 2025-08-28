document.addEventListener('DOMContentLoaded', () => {
  const isCoarse = window.matchMedia('(pointer: coarse)').matches;
  if (!isCoarse) {
    document.documentElement.classList.add('cursor-enhanced');
    initCursorRing();
  }
  initMagnetic();
  // simple global to disable enhanced cursor from console if desired
  window.disableEnhancedCursor = () => {
    document.documentElement.classList.remove('cursor-enhanced');
    document.querySelectorAll('.cursor-ring, .cursor-dot').forEach(n => n.remove());
  };
});

function initCursorRing() {
  const ring = document.createElement('div');
  const dot = document.createElement('div');
  ring.className = 'cursor-ring';
  dot.className = 'cursor-dot';
  document.body.appendChild(ring);
  document.body.appendChild(dot);

  let x = window.innerWidth / 2, y = window.innerHeight / 2;
  let tx = x, ty = y;

  const raf = () => {
    x += (tx - x) * 0.2;
    y += (ty - y) * 0.2;
    // use left/top so CSS translate(-50%, -50%) centers visuals
    ring.style.left = `${x}px`;
    ring.style.top = `${y}px`;
    dot.style.left = `${tx}px`;
    dot.style.top = `${ty}px`;
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);

  window.addEventListener('mousemove', (e) => {
    tx = e.clientX; ty = e.clientY;
  }, { passive: true });

  const interactive = 'a, button, .magnetic, .nav-link, .project-card, .skill-category, .contact-card, .btn-send';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactive)) document.body.classList.add('cursor-active');
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactive)) document.body.classList.remove('cursor-active');
  });
}

function initMagnetic() {
  const els = Array.from(document.querySelectorAll('.magnetic'));
  els.forEach((el) => {
    el.style.willChange = 'transform';
    let rect;
    const onEnter = () => { rect = el.getBoundingClientRect(); };
    const onMove = (e) => {
      if (!rect) rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      el.style.transform = `translate(${x * 0.06}px, ${y * 0.06}px)`;
    };
    const onLeave = () => { el.style.transform = ''; rect = null; };
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
  });
}
