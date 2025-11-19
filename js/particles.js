/**
 * Advanced Particle System for Hero Section
 * Features: Mouse interaction, connection lines, performance optimization
 */

class ParticleSystem {
  constructor(canvasId, options = {}) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: null, y: null, radius: 150 };
    this.animationId = null;
    
    // Configuration
    this.config = {
      particleCount: options.particleCount || 80,
      particleColor: options.particleColor || 'rgba(255, 255, 255, 0.5)',
      lineColor: options.lineColor || 'rgba(255, 255, 255, 0.15)',
      particleSize: options.particleSize || 2,
      particleSpeed: options.particleSpeed || 0.5,
      connectionDistance: options.connectionDistance || 120,
      mouseInteraction: options.mouseInteraction !== false,
      ...options
    };
    
    this.init();
  }
  
  init() {
    this.setCanvasSize();
    this.createParticles();
    this.setupEventListeners();
    this.animate();
  }
  
  setCanvasSize() {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
  }
  
  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.config.particleCount; i++) {
      this.particles.push(new Particle(this.canvas, this.config));
    }
  }
  
  setupEventListeners() {
    // Resize handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.setCanvasSize();
        this.createParticles();
      }, 200);
    });
    
    // Mouse move handler (throttled for performance)
    if (this.config.mouseInteraction) {
      let mouseMoveTimeout;
      this.canvas.addEventListener('mousemove', (e) => {
        if (!mouseMoveTimeout) {
          mouseMoveTimeout = setTimeout(() => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
            mouseMoveTimeout = null;
          }, 16); // ~60fps
        }
      });
      
      this.canvas.addEventListener('mouseleave', () => {
        this.mouse.x = null;
        this.mouse.y = null;
      });
    }
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Update and draw particles
    this.particles.forEach(particle => {
      particle.update(this.mouse);
      particle.draw(this.ctx);
    });
    
    // Draw connections
    this.drawConnections();
    
    this.animationId = requestAnimationFrame(() => this.animate());
  }
  
  drawConnections() {
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < this.config.connectionDistance) {
          const opacity = 1 - (distance / this.config.connectionDistance);
          this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.15})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
        }
      }
    }
  }
  
  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

class Particle {
  constructor(canvas, config) {
    this.canvas = canvas;
    this.config = config;
    this.reset();
  }
  
  reset() {
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;
    this.vx = (Math.random() - 0.5) * this.config.particleSpeed;
    this.vy = (Math.random() - 0.5) * this.config.particleSpeed;
    this.size = Math.random() * this.config.particleSize + 1;
    this.baseX = this.x;
    this.baseY = this.y;
  }
  
  update(mouse) {
    // Mouse interaction
    if (mouse.x !== null && mouse.y !== null) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < mouse.radius) {
        const force = (mouse.radius - distance) / mouse.radius;
        const angle = Math.atan2(dy, dx);
        this.vx -= Math.cos(angle) * force * 0.5;
        this.vy -= Math.sin(angle) * force * 0.5;
      }
    }
    
    // Update position
    this.x += this.vx;
    this.y += this.vy;
    
    // Damping effect for smoother motion
    this.vx *= 0.98;
    this.vy *= 0.98;
    
    // Return to base position gently
    const returnForce = 0.02;
    this.vx += (this.baseX - this.x) * returnForce;
    this.vy += (this.baseY - this.y) * returnForce;
    
    // Boundary check
    if (this.x < 0 || this.x > this.canvas.width) {
      this.vx *= -1;
    }
    if (this.y < 0 || this.y > this.canvas.height) {
      this.vy *= -1;
    }
    
    // Keep within bounds
    this.x = Math.max(0, Math.min(this.canvas.width, this.x));
    this.y = Math.max(0, Math.min(this.canvas.height, this.y));
  }
  
  draw(ctx) {
    ctx.fillStyle = this.config.particleColor;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    
    // Add subtle glow
    ctx.shadowBlur = 10;
    ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

// Initialize particle system when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (!prefersReducedMotion) {
    // Create canvas element
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
      const canvas = document.createElement('canvas');
      canvas.id = 'particle-canvas';
      canvas.style.position = 'absolute';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.pointerEvents = 'none';
      canvas.style.zIndex = '1';
      heroSection.appendChild(canvas);
      
      // Initialize particle system
      const particleSystem = new ParticleSystem('particle-canvas', {
        particleCount: window.innerWidth < 768 ? 40 : 80,
        particleSpeed: 0.3,
        connectionDistance: 120,
        mouseInteraction: true
      });
      
      // Store reference for cleanup if needed
      window.particleSystem = particleSystem;
    }
  }
});
