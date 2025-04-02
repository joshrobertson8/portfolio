document.addEventListener('DOMContentLoaded', function() {
  const mobileMenu = document.getElementById("mobile-menu");
  const navbarMenu = document.querySelector(".navbar__menu");
  const navbarItems = document.querySelectorAll('.navbar__item a');
  const body = document.body;

  // Toggle mobile menu
  mobileMenu.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Close menu when clicking on a menu item
  navbarItems.forEach(item => {
    item.addEventListener('click', () => {
      if (navbarMenu.classList.contains('active')) {
        toggleMenu();
      }
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navbarMenu.classList.contains('active') && 
        !navbarMenu.contains(e.target) && 
        e.target !== mobileMenu) {
      toggleMenu();
    }
  });

  // Handle escape key to close menu
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navbarMenu.classList.contains('active')) {
      toggleMenu();
    }
  });

  // Toggle menu function
  function toggleMenu() {
    mobileMenu.classList.toggle("is-active");
    navbarMenu.classList.toggle("active");
    
    // Toggle body scroll lock
    if (navbarMenu.classList.contains('active')) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = '';
      
      // Add a small delay for the closing animation
      setTimeout(() => {
        // Reset any transforms or transitions after closing
        navbarItems.forEach(item => {
          item.style.transform = '';
          item.style.opacity = '';
        });
      }, 500);
    }
  }

  // Close the mobile menu on window resize if it goes above mobile breakpoint
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navbarMenu.classList.contains('active')) {
      toggleMenu();
    }
  });
});