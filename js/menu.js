// Optimized menu functionality
document.addEventListener("DOMContentLoaded", function () {
  const mobileMenu = document.getElementById("mobile-menu");
  const navbarMenu = document.querySelector(".navbar__menu");
  const navbarItems = document.querySelectorAll(".navbar__item a");
  const body = document.body;

  // Cache DOM elements and state
  let isMenuOpen = false;

  // Optimized toggle menu function
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;

    // Use classList.toggle for better performance
    mobileMenu.classList.toggle("is-active", isMenuOpen);
    navbarMenu.classList.toggle("active", isMenuOpen);

    // Use requestAnimationFrame for smooth visual updates
    requestAnimationFrame(() => {
      body.style.overflow = isMenuOpen ? "hidden" : "";

      if (!isMenuOpen) {
        // Batch DOM updates for closing animation
        setTimeout(() => {
          navbarItems.forEach((item) => {
            item.style.transform = "";
            item.style.opacity = "";
          });
        }, 500);
      }
    });
  }

  // Primary menu toggle with event delegation
  mobileMenu.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Optimized menu item click handler
  navbarItems.forEach((item) => {
    item.addEventListener(
      "click",
      () => {
        if (isMenuOpen) {
          toggleMenu();
        }
      },
      { passive: true }
    );
  });

  // Consolidated outside click handler with better performance
  document.addEventListener(
    "click",
    (e) => {
      if (
        isMenuOpen &&
        !navbarMenu.contains(e.target) &&
        e.target !== mobileMenu
      ) {
        toggleMenu();
      }
    },
    { passive: true }
  );

  // Escape key handler
  document.addEventListener(
    "keydown",
    (e) => {
      if (e.key === "Escape" && isMenuOpen) {
        toggleMenu();
      }
    },
    { passive: true }
  );

  // Throttled resize handler
  let resizeTimeout;
  window.addEventListener(
    "resize",
    () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (window.innerWidth > 768 && isMenuOpen) {
          toggleMenu();
        }
      }, 100);
    },
    { passive: true }
  );
});
