document.addEventListener("DOMContentLoaded", () => {
  const isCoarse = window.matchMedia("(pointer: coarse)").matches;
  if (!isCoarse) {
    document.documentElement.classList.add("cursor-enhanced");
    initCursorRing();
  }
  initMagnetic();
  initTooltips();
  // simple global to disable enhanced cursor from console if desired
  window.disableEnhancedCursor = () => {
    document.documentElement.classList.remove("cursor-enhanced");
    document
      .querySelectorAll(".cursor-ring, .cursor-dot")
      .forEach((n) => n.remove());
  };
});

function initCursorRing() {
  const ring = document.createElement("div");
  const dot = document.createElement("div");
  ring.className = "cursor-ring";
  dot.className = "cursor-dot";
  document.body.appendChild(ring);
  document.body.appendChild(dot);

  let x = window.innerWidth / 2,
    y = window.innerHeight / 2;
  let tx = x,
    ty = y;
  let isAnimating = true;

  const raf = () => {
    if (!isAnimating) return;

    x += (tx - x) * 0.2;
    y += (ty - y) * 0.2;

    // Use transform instead of left/top for better performance
    ring.style.transform = `translate(${x - ring.offsetWidth / 2}px, ${
      y - ring.offsetHeight / 2
    }px)`;
    dot.style.transform = `translate(${tx - dot.offsetWidth / 2}px, ${
      ty - dot.offsetHeight / 2
    }px)`;

    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);

  // Use passive listener and throttle mouse events
  let mouseMoveThrottle = false;
  window.addEventListener(
    "mousemove",
    (e) => {
      if (!mouseMoveThrottle) {
        tx = e.clientX;
        ty = e.clientY;
        mouseMoveThrottle = true;
        requestAnimationFrame(() => {
          mouseMoveThrottle = false;
        });
      }
    },
    { passive: true }
  );

  // Use event delegation for better performance
  const interactive =
    "a, button, .magnetic, .nav-link, .project-card, .skill-category, .contact-card, .btn-send";
  const body = document.body;

  document.addEventListener(
    "mouseover",
    (e) => {
      if (e.target.closest(interactive)) body.classList.add("cursor-active");
    },
    { passive: true }
  );

  document.addEventListener(
    "mouseout",
    (e) => {
      if (e.target.closest(interactive)) body.classList.remove("cursor-active");
    },
    { passive: true }
  );

  // Cleanup function for performance
  window.addEventListener("beforeunload", () => {
    isAnimating = false;
  });
}

function initMagnetic() {
  const els = Array.from(document.querySelectorAll(".magnetic"));

  els.forEach((el) => {
    el.style.willChange = "transform";
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

      // Use requestAnimationFrame for smooth animation
      requestAnimationFrame(() => {
        if (isHovering) {
          el.style.transform = `translate(${x * 0.06}px, ${y * 0.06}px)`;
        }
      });
    };

    const onLeave = () => {
      isHovering = false;
      el.style.transform = "";
      rect = null;
    };

    el.addEventListener("mouseenter", onEnter, { passive: true });
    el.addEventListener("mousemove", onMove, { passive: true });
    el.addEventListener("mouseleave", onLeave, { passive: true });
  });
}

function initTooltips() {
  const tooltip = document.createElement("div");
  tooltip.className = "skill-tooltip";
  document.body.appendChild(tooltip);

  const skillIcons = document.querySelectorAll(".skill-icon-img");

  skillIcons.forEach((icon) => {
    // Remove default title to prevent browser tooltip
    const title = icon.getAttribute("title");
    if (title) {
      icon.setAttribute("data-title", title);
      icon.removeAttribute("title");
    }

    icon.addEventListener("mouseenter", (e) => {
      const text = e.target.getAttribute("data-title");
      if (text) {
        tooltip.textContent = text;
        tooltip.classList.add("visible");
        updateTooltipPosition(e, tooltip);
      }
    });

    icon.addEventListener("mousemove", (e) => {
      updateTooltipPosition(e, tooltip);
    });

    icon.addEventListener("mouseleave", () => {
      tooltip.classList.remove("visible");
    });
  });
}

function updateTooltipPosition(e, tooltip) {
  const x = e.clientX;
  const y = e.clientY;
  tooltip.style.left = `${x}px`;
  tooltip.style.top = `${y}px`;
}
