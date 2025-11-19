/**
 * Scroll-based Animations and Parallax Effects
 * Uses IntersectionObserver for performance-optimized reveal animations
 */

class ScrollAnimations {
  constructor() {
    this.scrollPosition = 0;
    this.parallaxElements = [];
    this.init();
  }
  
  init() {
    this.setupIntersectionObserver();
    this.setupParallax();
    this.addRevealClasses();
  }
  
  /**
   * Add reveal animation classes to elements
   */
  addRevealClasses() {
    // Section headers
    document.querySelectorAll('.section-title').forEach(el => {
      el.classList.add('reveal-element');
    });
    
    // Section numbers
    document.querySelectorAll('.section-number').forEach(el => {
      el.classList.add('reveal-left');
    });
    
    // Already has stagger-item class from HTML
    // Experience items, skill categories, project cards
  }
  
  /**
   * Setup IntersectionObserver for reveal animations
   */
  setupIntersectionObserver() {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -100px 0px', // Trigger slightly before element enters viewport
      threshold: 0.1
    };
    
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          
          // Optionally unobserve after revealing (one-time animation)
          // this.observer.unobserve(entry.target);
        }
      });
    };
    
    this.observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe all reveal elements
    const revealElements = document.querySelectorAll(
      '.reveal-element, .reveal-left, .reveal-right, .reveal-scale, .stagger-item'
    );
    
    revealElements.forEach(el => {
      this.observer.observe(el);
    });
  }
  
  /**
   * Setup parallax scroll effects
   */
  setupParallax() {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    
    // Select elements for parallax
    this.parallaxElements = [
      ...document.querySelectorAll('.hero-logo'),
      ...document.querySelectorAll('.section-header'),
    ];
    
    // Initial setup
    this.parallaxElements.forEach(el => {
      el.classList.add('parallax-element');
    });
    
    // Throttled scroll handler
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
          this.handleScroll();
          scrollTimeout = null;
        }, 10); // ~100fps for smooth parallax
      }
    }, { passive: true });
  }
  
  /**
   * Handle scroll event for parallax
   */
  handleScroll() {
    this.scrollPosition = window.pageYOffset;
    
    this.parallaxElements.forEach((el, index) => {
      const rect = el.getBoundingClientRect();
      const elementTop = rect.top + this.scrollPosition;
      const elementHeight = rect.height;
      const viewportHeight = window.innerHeight;
      
      // Calculate offset based on scroll position
      const scrollPercent = (this.scrollPosition - elementTop + viewportHeight) / 
                           (viewportHeight + elementHeight);
      
      if (scrollPercent >= 0 && scrollPercent <= 1) {
        const offset = (scrollPercent - 0.5) * 100; // -50 to 50
        el.style.setProperty('--scroll-offset', `${offset}px`);
      }
    });
  }
  
  /**
   * Cleanup
   */
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

/**
 * Smooth Scroll for Navigation Links
 */
class SmoothScroll {
  constructor() {
    this.init();
  }
  
  init() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        
        // Skip if it's just "#" or empty
        if (!href || href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          
          const navHeight = document.querySelector('.navbar')?.offsetHeight || 0;
          const targetPosition = target.offsetTop - navHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          // Update active nav link
          this.updateActiveNavLink(anchor);
        }
      });
    });
    
    // Update active link on scroll
    this.setupScrollSpy();
  }
  
  updateActiveNavLink(clickedLink) {
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
    });
    
    if (clickedLink.classList.contains('nav-link')) {
      clickedLink.classList.add('active');
    }
  }
  
  setupScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
          let current = '';
          const scrollPos = window.pageYOffset + 100;
          
          sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
              current = section.getAttribute('id');
            }
          });
          
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
              link.classList.add('active');
            }
          });
          
          scrollTimeout = null;
        }, 100);
      }
    }, { passive: true });
  }
}

/**
 * Enhanced Hover Effects with Tilt
 */
class EnhancedHoverEffects {
  constructor() {
    this.init();
  }
  
  init() {
    const tiltElements = document.querySelectorAll('.hover-tilt');
    
    tiltElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        el.style.transition = 'none';
      });
      
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      });
      
      el.addEventListener('mouseleave', () => {
        el.style.transition = 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)';
        el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
      });
    });
  }
}

/**
 * Ripple Effect on Click
 */
class RippleEffect {
  constructor() {
    this.init();
  }
  
  init() {
    const rippleElements = document.querySelectorAll('.ripple-effect, .btn-send, .project-link');
    
    rippleElements.forEach(el => {
      el.classList.add('ripple-effect');
      
      el.addEventListener('click', (e) => {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple-circle');
        
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        el.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });
  }
}

// Initialize all animation systems when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Delay initialization slightly to ensure all elements are loaded
  setTimeout(() => {
    new ScrollAnimations();
    new SmoothScroll();
    new EnhancedHoverEffects();
    new RippleEffect();
  }, 100);
});

// Make sections visible for scroll animations
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.classList.add('visible');
  });
});
