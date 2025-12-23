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

    this.x += this.vx;
    this.y += this.vy;

    this.vx *= 0.98;
    this.vy *= 0.98;

    const returnForce = 0.02;
    this.vx += (this.baseX - this.x) * returnForce;
    this.vy += (this.baseY - this.y) * returnForce;

    if (this.x < 0 || this.x > this.canvas.width) {
      this.vx *= -1;
    }
    if (this.y < 0 || this.y > this.canvas.height) {
      this.vy *= -1;
    }

    this.x = Math.max(0, Math.min(this.canvas.width, this.x));
    this.y = Math.max(0, Math.min(this.canvas.height, this.y));
  }

  draw(ctx) {
    ctx.fillStyle = this.config.particleColor;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();

    ctx.shadowBlur = 10;
    ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

export class ParticleSystem {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: null, y: null, radius: 150 };
    this.animationId = null;

    this.config = {
      particleCount: options.particleCount || 80,
      particleColor: options.particleColor || 'rgba(255, 255, 255, 0.5)',
      lineColor: options.lineColor || 'rgba(255, 255, 255, 0.15)',
      particleSize: options.particleSize || 2,
      particleSpeed: options.particleSpeed || 0.5,
      connectionDistance: options.connectionDistance || 120,
      mouseInteraction: options.mouseInteraction !== false,
      ...options,
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
    for (let i = 0; i < this.config.particleCount; i += 1) {
      this.particles.push(new Particle(this.canvas, this.config));
    }
  }

  setupEventListeners() {
    let resizeTimeout;
    this.resizeHandler = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.setCanvasSize();
        this.createParticles();
      }, 200);
    };

    window.addEventListener('resize', this.resizeHandler);

    if (this.config.mouseInteraction) {
      let mouseMoveTimeout;
      this.mouseMoveHandler = (e) => {
        if (!mouseMoveTimeout) {
          mouseMoveTimeout = setTimeout(() => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
            mouseMoveTimeout = null;
          }, 16);
        }
      };

      this.mouseLeaveHandler = () => {
        this.mouse.x = null;
        this.mouse.y = null;
      };

      this.canvas.addEventListener('mousemove', this.mouseMoveHandler);
      this.canvas.addEventListener('mouseleave', this.mouseLeaveHandler);
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach((particle) => {
      particle.update(this.mouse);
      particle.draw(this.ctx);
    });

    this.drawConnections();

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  drawConnections() {
    for (let i = 0; i < this.particles.length; i += 1) {
      for (let j = i + 1; j < this.particles.length; j += 1) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.config.connectionDistance) {
          const opacity = 1 - distance / this.config.connectionDistance;
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

    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
    }

    if (this.canvas && this.mouseMoveHandler) {
      this.canvas.removeEventListener('mousemove', this.mouseMoveHandler);
    }
    if (this.canvas && this.mouseLeaveHandler) {
      this.canvas.removeEventListener('mouseleave', this.mouseLeaveHandler);
    }
  }
}
