/**
 * ASCII Fireworks Animation
 * A spectacular visual effect for Josh Robertson's portfolio
 */

class ASCIIFireworks {
  constructor() {
    this.canvas = document.getElementById('fireworks-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.fireworks = [];
    this.stars = [];
    this.moonVisible = false;
    this.launched = 0;
    this.maxFireworks = 12;
    this.lastLaunch = 0;
    this.launchInterval = 1200;
    this.showStarsAndMoon = false;
    this.colors = [
      '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', 
      '#ff00ff', '#ff8800', '#88ff00', '#00ff88', '#0088ff',
      '#ff5500', '#ff00aa', '#aa00ff', '#ffffff'
    ];
    this.characters = ['*', '+', '.', '✦', '✧', '✩', '✪', '✫', '✬', '✮', '✯', '✰', '★', '☆', '♦', '♠', '♥', '♣'];
    this.isActive = false;
    this.finaleStarted = false;
    this.sunsetPhase = 'start'; // Add sunset phase tracking
    
    // Sound effects
    this.sounds = {
      whistling: new Audio('assets/sound/whistling.mp3'),
      explosion: new Audio('assets/sound/explosion.mp3'),
      finale: new Audio('assets/sound/finale.mp3'),
      sunset: new Audio('assets/sound/sunset.mp3')
    };
    
    // Set properties for sunset sound
    if (this.sounds.sunset) {
      this.sounds.sunset.volume = 0.4;
      this.sounds.sunset.loop = true;
    }
    
    this.specialEffectType = null;
    this.bind();
  }

  bind() {
    window.addEventListener('resize', () => this.resize());
    this.resize();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    
    // Update pixel ratio for retina displays
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = window.innerWidth * dpr;
    this.canvas.height = window.innerHeight * dpr;
    this.ctx.scale(dpr, dpr);
    
    this.canvas.style.width = window.innerWidth + 'px';
    this.canvas.style.height = window.innerHeight + 'px';
  }

  start() {
    if (this.isActive) return;
    
    this.isActive = true;
    this.particles = [];
    this.fireworks = [];
    this.stars = [];
    this.moonVisible = false;
    this.launched = 0;
    this.finaleStarted = false;
    this.sunsetPhase = 'start'; // Add sunset phase tracking
    
    // Choose a special effect for this show
    const effects = ['cascade', 'heart', 'spiral', 'starburst', 'rings', 'crossette'];
    this.specialEffectType = effects[Math.floor(Math.random() * effects.length)];
    
    document.body.classList.add('fireworks-active');
    this.canvas.style.display = 'block';
    
    // Add an active class to the button to indicate it can stop the show
    const fireworksBtn = document.getElementById('fireworks-btn');
    if (fireworksBtn) {
      fireworksBtn.classList.add('active');
      fireworksBtn.innerHTML = '<i class="fas fa-stop"></i>';
      fireworksBtn.setAttribute('aria-label', 'Stop Fireworks');
    }
    
    // Add the tooltip to the button
    const tooltip = document.getElementById('fireworks-tooltip');
    if (tooltip) tooltip.style.display = 'none';
    
    // Dispatch state change event
    document.dispatchEvent(new CustomEvent('fireworksStateChange', {
      detail: { active: true }
    }));
    
    // Start with sunset animation
    this.startSunsetAnimation();
  }

  // New method to handle sunset animation
  startSunsetAnimation() {
    // Initialize sunset properties
    this.sunPosition = { 
      x: this.canvas.width * 0.5, 
      y: this.canvas.height * 0.3,
      size: 60,
      rays: []
    };
    
    // Initialize sun rays
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const length = 20 + Math.random() * 10;
      this.sunPosition.rays.push({
        angle,
        length,
        pulseFactor: Math.random()
      });
    }
    
    // Create some clouds
    this.clouds = [];
    for (let i = 0; i < 8; i++) {
      this.clouds.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * (this.canvas.height * 0.4),
        width: 100 + Math.random() * 200,
        height: 40 + Math.random() * 60,
        speed: 0.2 + Math.random() * 0.3,
        segments: 5 + Math.floor(Math.random() * 3),
        opacity: 0.8 + Math.random() * 0.2
      });
    }
    
    // Play sunset ambient sound
    if (this.sounds.sunset) {
      this.sounds.sunset.currentTime = 0;
      this.sounds.sunset.play().catch(err => console.log('Sound play error:', err));
    }
    
    // Begin the animation
    this.sunsetPhase = 'sunset';
    this.sunsetStartTime = Date.now();
    this.animate();
  }
  
  // Update the sunset animation
  updateSunset() {
    const now = Date.now();
    const elapsed = now - this.sunsetStartTime;
    const sunsetDuration = 8000; // Increased from 5000 to 8000 for slower sunset
    
    if (elapsed >= sunsetDuration) {
      // Fade out sunset sound
      if (this.sounds.sunset) {
        const fadeOut = setInterval(() => {
          if (this.sounds.sunset.volume > 0.05) {
            this.sounds.sunset.volume -= 0.05;
          } else {
            this.sounds.sunset.pause();
            clearInterval(fadeOut);
          }
        }, 100);
      }
      
      // Transition to fireworks after sunset completes
      this.sunsetPhase = 'night';
      setTimeout(() => {
        // Add a brief dramatic pause before starting fireworks
        this.animate();
      }, 800); // Increased from 300 to 800 for longer pause
      return;
    }
    
    // Calculate sunset progress (0 to 1)
    const progress = Math.min(elapsed / sunsetDuration, 1);
    
    // Update sun position (move down)
    this.sunPosition.y = this.canvas.height * (0.3 + progress * 0.6);
    
    // Update clouds
    this.clouds.forEach(cloud => {
      cloud.x += cloud.speed;
      cloud.opacity = 0.8 * (1 - progress * 0.7); // Fade out clouds
      
      // Wrap clouds around screen
      if (cloud.x > this.canvas.width + cloud.width) {
        cloud.x = -cloud.width;
      }
    });
  }
  
  // Draw the sunset
  drawSunset() {
    const ctx = this.ctx;
    const width = this.canvas.width;
    const height = this.canvas.height;
    const progress = (Date.now() - this.sunsetStartTime) / 8000;
    
    // Create gradient for sky
    let skyGradient;
    if (progress < 0.3) {
      // Early sunset - blue to orange
      skyGradient = ctx.createLinearGradient(0, 0, 0, height);
      skyGradient.addColorStop(0, 'rgba(135, 206, 235, ' + (1 - progress * 2) + ')'); // Sky blue
      skyGradient.addColorStop(0.6, 'rgba(255, 165, 0, ' + Math.min(1, progress * 3) + ')'); // Orange
      skyGradient.addColorStop(1, 'rgba(255, 140, 0, ' + Math.min(1, progress * 3) + ')'); // Dark orange
    } else if (progress < 0.7) {
      // Mid sunset - orange to red/purple
      skyGradient = ctx.createLinearGradient(0, 0, 0, height);
      skyGradient.addColorStop(0, 'rgba(135, 206, 235, ' + Math.max(0, 0.4 - progress) + ')'); // Fading sky blue
      skyGradient.addColorStop(0.3, 'rgba(255, 100, 100, ' + Math.min(1, progress * 1.5) + ')'); // Red
      skyGradient.addColorStop(0.7, 'rgba(125, 0, 125, ' + Math.min(1, progress * 1.5) + ')'); // Purple
      skyGradient.addColorStop(1, 'rgba(20, 20, 40, ' + Math.min(1, progress * 2) + ')'); // Dark blue-black
    } else {
      // Late sunset - dark purple to black
      skyGradient = ctx.createLinearGradient(0, 0, 0, height);
      skyGradient.addColorStop(0, 'rgba(125, 0, 125, ' + Math.max(0, 1 - (progress - 0.7) * 5) + ')'); // Fading purple
      skyGradient.addColorStop(0.5, 'rgba(20, 20, 40, ' + Math.min(1, progress) + ')'); // Dark blue
      skyGradient.addColorStop(1, 'rgba(0, 0, 10, ' + Math.min(1, progress) + ')'); // Nearly black
    }
    
    // Draw sky background
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, width, height);
    
    // Draw sun with glow
    const sunX = this.sunPosition.x;
    const sunY = this.sunPosition.y;
    const sunSize = this.sunPosition.size;
    
    // Sun glow
    const sunGlow = ctx.createRadialGradient(
      sunX, sunY, sunSize * 0.5, 
      sunX, sunY, sunSize * 3
    );
    
    if (progress < 0.5) {
      // Bright yellow/orange glow
      sunGlow.addColorStop(0, 'rgba(255, 255, 200, 0.8)');
      sunGlow.addColorStop(0.2, 'rgba(255, 200, 50, 0.4)');
      sunGlow.addColorStop(1, 'rgba(255, 140, 0, 0)');
    } else {
      // Redder glow as sun sets
      sunGlow.addColorStop(0, 'rgba(255, 200, 100, 0.7)');
      sunGlow.addColorStop(0.2, 'rgba(255, 100, 50, 0.3)');
      sunGlow.addColorStop(1, 'rgba(255, 50, 0, 0)');
    }
    
    ctx.beginPath();
    ctx.arc(sunX, sunY, sunSize * 3, 0, Math.PI * 2);
    ctx.fillStyle = sunGlow;
    ctx.fill();
    
    // Sun itself
    const sunGradient = ctx.createRadialGradient(
      sunX - sunSize * 0.2, sunY - sunSize * 0.2, 0,
      sunX, sunY, sunSize
    );
    
    if (progress < 0.5) {
      // Yellow sun
      sunGradient.addColorStop(0, 'rgba(255, 255, 200, 1)');
      sunGradient.addColorStop(0.7, 'rgba(255, 220, 50, 1)');
      sunGradient.addColorStop(1, 'rgba(255, 180, 0, 1)');
    } else {
      // Orange/red sun
      sunGradient.addColorStop(0, 'rgba(255, 230, 150, 1)');
      sunGradient.addColorStop(0.7, 'rgba(255, 150, 50, 1)');
      sunGradient.addColorStop(1, 'rgba(255, 100, 0, 1)');
    }
    
    ctx.beginPath();
    ctx.arc(sunX, sunY, sunSize, 0, Math.PI * 2);
    ctx.fillStyle = sunGradient;
    ctx.fill();
    
    // Draw sun rays if sun is still visible
    if (progress < 0.8) {
      ctx.strokeStyle = progress < 0.5 ? 'rgba(255, 255, 200, 0.6)' : 'rgba(255, 200, 100, 0.4)';
      ctx.lineWidth = 3;
      
      this.sunPosition.rays.forEach((ray, i) => {
        const pulseRate = 0.002;
        const now = Date.now();
        const pulseFactor = Math.sin(now * pulseRate + ray.pulseFactor * Math.PI * 2) * 0.2 + 0.8;
        const rayLength = ray.length * pulseFactor * (1 - progress * 0.7);
        
        ctx.beginPath();
        ctx.moveTo(
          sunX + Math.cos(ray.angle) * sunSize,
          sunY + Math.sin(ray.angle) * sunSize
        );
        ctx.lineTo(
          sunX + Math.cos(ray.angle) * (sunSize + rayLength),
          sunY + Math.sin(ray.angle) * (sunSize + rayLength)
        );
        ctx.stroke();
      });
    }
    
    // Draw clouds
    this.clouds.forEach(cloud => {
      ctx.fillStyle = `rgba(255, 255, 255, ${cloud.opacity})`;
      
      // Draw cloud as a series of circles
      for (let i = 0; i < cloud.segments; i++) {
        const segmentWidth = cloud.width / cloud.segments;
        const x = cloud.x + i * segmentWidth;
        const y = cloud.y;
        const radius = cloud.height * 0.5 * (0.7 + Math.sin(i / cloud.segments * Math.PI) * 0.3);
        
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    });
    
    // Store horizon silhouette for later use if not already stored
    if (!this.horizonPoints || this.horizonPoints.length === 0) {
      // Create a varied skyline
      const horizonY = height * 0.9;
      const segments = 20;
      const segmentWidth = width / segments;
      
      this.horizonPoints = [];
      
      for (let i = 0; i <= segments; i++) {
        const x = i * segmentWidth;
        // Use sin functions to create variation in the horizon
        const variationHeight = Math.sin(i * 0.4) * 20 + Math.sin(i * 1.5) * 15 + Math.sin(i * 3) * 10;
        // Add occasional "buildings" for cityscape effect
        const buildingHeight = i % 3 === 0 ? Math.random() * 40 + 20 : 0;
        const y = horizonY - variationHeight - buildingHeight;
        
        this.horizonPoints.push({ x, y });
      }
    }
    
    // Draw horizon with silhouette (cityscape or hills)
    const horizonY = height * 0.9;
    const horizonGradient = ctx.createLinearGradient(0, horizonY - 50, 0, horizonY + 50);
    
    if (progress < 0.5) {
      horizonGradient.addColorStop(0, 'rgba(50, 50, 50, 0.7)');
      horizonGradient.addColorStop(1, 'rgba(0, 0, 0, 0.9)');
    } else {
      horizonGradient.addColorStop(0, 'rgba(30, 30, 30, 0.9)');
      horizonGradient.addColorStop(1, 'rgba(0, 0, 0, 0.95)');
    }
    
    ctx.fillStyle = horizonGradient;
    ctx.beginPath();
    ctx.moveTo(0, this.horizonPoints[0].y);
    
    // Use stored horizon points
    for (const point of this.horizonPoints) {
      ctx.lineTo(point.x, point.y);
    }
    
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();
  }

  stop() {
    this.isActive = false;
    document.body.classList.remove('fireworks-active');
    
    // Reset the button to its original state
    const fireworksBtn = document.getElementById('fireworks-btn');
    if (fireworksBtn) {
      fireworksBtn.classList.remove('active');
      fireworksBtn.innerHTML = '<i class="fas fa-rocket"></i>';
      fireworksBtn.setAttribute('aria-label', 'Launch Fireworks');
    }
    
    // Stop all sounds
    if (this.sounds.sunset) {
      this.sounds.sunset.pause();
      this.sounds.sunset.currentTime = 0;
      this.sounds.sunset.volume = 0.4; // Reset volume for next time
    }
    
    if (this.sounds.finale) {
      this.sounds.finale.pause();
      this.sounds.finale.currentTime = 0;
    }
    
    // Dispatch state change event
    document.dispatchEvent(new CustomEvent('fireworksStateChange', {
      detail: { active: false }
    }));
    
    // Fade out animation
    this.canvas.style.opacity = 0;
    setTimeout(() => {
      this.canvas.style.display = 'none';
      this.canvas.style.opacity = 1;
      this.particles = [];
      this.fireworks = [];
      this.stars = [];
    }, 1000);
  }

  createFirework(x, y, targetX, targetY) {
    // Play whistling sound
    if (this.sounds.whistling) {
      this.sounds.whistling.currentTime = 0;
      this.sounds.whistling.volume = 0.2 + Math.random() * 0.2;
      this.sounds.whistling.play().catch(err => console.log('Sound play error:', err));
    }
    
    const firework = {
      x,
      y,
      targetX,
      targetY,
      speed: 1.2 + Math.random() * 2.5,
      angle: Math.atan2(targetY - y, targetX - x),
      trailLength: 8 + Math.floor(Math.random() * 8),
      trail: [],
      color: this.colors[Math.floor(Math.random() * this.colors.length)],
      size: 2 + Math.random() * 1.5,
      alpha: 1,
      // Add a type property for multi-stage fireworks
      type: Math.random() > 0.5 ? 
            (Math.random() > 0.5 ? 'multi-stage' : 'crossette') : 
            'regular',
      // Add special type for finale
      isFinale: this.launched > this.maxFireworks - 4 && Math.random() > 0.3,
      // Add flickering effect
      flicker: Math.random() > 0.7,
      // Add smoke trail
      smokeTrail: Math.random() > 0.3,
    };
    this.fireworks.push(firework);
  }

  createParticles(x, y, count, color, options = {}) {
    // Play explosion sound
    if (this.sounds.explosion) {
      this.sounds.explosion.currentTime = 0;
      this.sounds.explosion.volume = 0.3 + Math.random() * 0.2;
      this.sounds.explosion.playbackRate = 0.8 + Math.random() * 0.4;
      this.sounds.explosion.play().catch(err => console.log('Sound play error:', err));
    }
    
    const character = options.char || this.characters[Math.floor(Math.random() * this.characters.length)];
    const particleCount = count || 80 + Math.floor(Math.random() * 60);
    const angleOffset = options.angleOffset || 0;
    const speedMultiplier = options.speedMultiplier || 1;
    
    for (let i = 0; i < particleCount; i++) {
      let angle;
      let speed = (0.7 + Math.random() * 3.5) * speedMultiplier;
      
      // Use different angle calculation based on special effect type
      if (options.effectType === 'heart') {
        // Heart shape pattern
        const t = (i / particleCount) * Math.PI * 2;
        const scale = 4;
        const heartX = 16 * Math.pow(Math.sin(t), 3);
        const heartY = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        angle = Math.atan2(heartY, heartX);
      } else if (options.effectType === 'spiral') {
        // Spiral pattern
        angle = (i / particleCount) * Math.PI * 10 + angleOffset;
        speed = speed * (0.5 + 0.5 * (i / particleCount)); // Particles further along the spiral move faster
      } else if (options.effectType === 'starburst') {
        // Starburst pattern (5-pointed star)
        const points = 5;
        const starAngle = (i % points) * (Math.PI * 2 / points);
        angle = starAngle + (Math.floor(i / points) * 0.1);
      } else if (options.effectType === 'cascade') {
        // Cascade pattern (like a waterfall)
        angle = Math.PI / 2 + (Math.random() * Math.PI / 4 - Math.PI / 8);
      } else if (options.effectType === 'rings') {
        // Ring pattern with several rings of different radii
        const ringCount = 4;
        const ringIndex = Math.floor(i / (particleCount / ringCount));
        const ringSize = 0.5 + (ringIndex / ringCount) * 2; // Different sizes for different rings
        const ringOffset = (i % (particleCount / ringCount)) / (particleCount / ringCount) * Math.PI * 2;
        angle = ringOffset;
        speed = speed * ringSize;
      } else if (options.effectType === 'crossette') {
        // Crossette pattern - particles that will split into perpendicular streams
        angle = Math.random() * Math.PI * 2;
        speed = speed * 1.2;
      } else {
        // Regular radial pattern with some randomness
        angle = Math.random() * Math.PI * 2;
      }
      
      // Add some randomness to make it look more natural
      angle += (Math.random() * 0.2 - 0.1);
      
      const particle = {
        x,
        y,
        char: character,
        angle: angle,
        speed: speed,
        friction: 0.975 + Math.random() * 0.01,
        gravity: 0.07 + Math.random() * 0.03,
        size: 12 + Math.random() * 12,
        color: color || this.colors[Math.floor(Math.random() * this.colors.length)],
        alpha: 1,
        decay: 0.007 + Math.random() * 0.01,
        // Add special property for crossette
        willSplit: options.effectType === 'crossette' && Math.random() > 0.7,
        splitTime: 15 + Math.floor(Math.random() * 15),
        // Shimmer effect
        shimmer: Math.random() > 0.7,
        shimmerIntensity: 0.5 + Math.random() * 0.5,
        // Trail effect for some particles
        hasTrail: Math.random() > 0.8,
        trailLength: 3 + Math.floor(Math.random() * 5),
        trail: []
      };
      this.particles.push(particle);
    }
    
    // Create shockwaves and light flash
    this.createShockwave(x, y, color);
    this.createLightFlash(x, y, color);
    
    // Create smoke particles
    if (Math.random() > 0.5) {
      this.createSmokeParticles(x, y, 15 + Math.floor(Math.random() * 10));
    }
  }

  createShockwave(x, y, color) {
    const shockwave = {
      x,
      y,
      radius: 10,
      maxRadius: 150 + Math.random() * 150,
      lineWidth: 6 + Math.random() * 4,
      alpha: 1,
      color: color || this.colors[Math.floor(Math.random() * this.colors.length)],
      decay: 0.015 + Math.random() * 0.015,
      shockwaveType: 'circle'
    };
    this.particles.push(shockwave);
    
    // Add a secondary shockwave with different speed/color
    if (Math.random() > 0.5) {
      const secondaryShockwave = {
        x,
        y,
        radius: 5,
        maxRadius: 100 + Math.random() * 100,
        lineWidth: 4 + Math.random() * 3,
        alpha: 0.8,
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        decay: 0.02 + Math.random() * 0.02,
        shockwaveType: 'circle'
      };
      this.particles.push(secondaryShockwave);
    }
  }

  createLightFlash(x, y, color) {
    const flash = {
      x,
      y,
      radius: 50 + Math.random() * 30,
      alpha: 0.8 + Math.random() * 0.2,
      color: color || '#ffffff',
      decay: 0.05 + Math.random() * 0.05,
      type: 'flash'
    };
    this.particles.push(flash);
  }

  createSmokeParticles(x, y, count) {
    const smokeCount = count || 10;
    for (let i = 0; i < smokeCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.5 + Math.random() * 1;
      const smoke = {
        x,
        y,
        angle,
        speed,
        radius: 15 + Math.random() * 20,
        growth: 0.1 + Math.random() * 0.3,
        alpha: 0.2 + Math.random() * 0.3,
        color: 'rgba(200, 200, 200, 0.3)',
        decay: 0.003 + Math.random() * 0.005,
        type: 'smoke',
        turbulence: 0.05 + Math.random() * 0.05,
        vx: Math.cos(angle) * speed,
        vy: (Math.sin(angle) * speed) - 0.2, // Slight upward drift
        life: 0,
        maxLife: 100 + Math.random() * 100
      };
      this.particles.push(smoke);
    }
  }

  createStarsAndMoon() {
    // This method is now only called from the tooltip update
    // to maintain backward compatibility
    if (!this.showStarsAndMoon && this.stars.length === 0) {
      this.createInitialStars();
    }
  }

  createMultiStageExplosion(x, y, color) {
    // Create a primary explosion
    this.createParticles(x, y, 50, color);
    
    // Schedule secondary explosions
    const secondaryCount = 4 + Math.floor(Math.random() * 4);
    
    for (let i = 0; i < secondaryCount; i++) {
      const angle = (i / secondaryCount) * Math.PI * 2;
      const distance = 70 + Math.random() * 80;
      const delay = 500 + Math.random() * 500; // Increased from 300 + random 300 to 500 + random 500
      
      const targetX = x + Math.cos(angle) * distance;
      const targetY = y + Math.sin(angle) * distance;
      
      setTimeout(() => {
        if (this.isActive) {
          // Different effect type for each secondary explosion
          const effects = ['heart', 'spiral', 'starburst', 'rings', 'cascade'];
          const effectType = effects[Math.floor(Math.random() * effects.length)];
          
          this.createParticles(targetX, targetY, 30, color, { effectType });
          
          // Play explosion sound
          if (this.sounds.explosion) {
            this.sounds.explosion.currentTime = 0;
            this.sounds.explosion.volume = 0.2 + Math.random() * 0.2;
            this.sounds.explosion.playbackRate = 0.8 + Math.random() * 0.4;
            this.sounds.explosion.play().catch(err => console.log('Sound play error:', err));
          }
        }
      }, delay);
    }
  }

  createCrossetteExplosion(x, y, color) {
    // Similar to multi-stage but with a crossette pattern
    this.createParticles(x, y, 40, color, { effectType: 'crossette' });
    
    // Schedule a few additional bursts along each arm
    const armCount = 4 + Math.floor(Math.random() * 4);
    
    for (let i = 0; i < armCount; i++) {
      const angle = (i / armCount) * Math.PI * 2;
      const distance = 50 + Math.random() * 50;
      const delay = 200 + Math.random() * 200;
      
      const targetX = x + Math.cos(angle) * distance;
      const targetY = y + Math.sin(angle) * distance;
      
      setTimeout(() => {
        if (this.isActive) {
          this.createParticles(targetX, targetY, 20, color, { effectType: 'starburst' });
          
          // Play explosion sound
          if (this.sounds.explosion) {
            this.sounds.explosion.currentTime = 0;
            this.sounds.explosion.volume = 0.15 + Math.random() * 0.15;
            this.sounds.explosion.playbackRate = 0.9 + Math.random() * 0.2;
            this.sounds.explosion.play().catch(err => console.log('Sound play error:', err));
          }
        }
      }, delay);
    }
  }

  createFinaleExplosion(x, y) {
    // Create a massive, spectacular finale explosion
    const colors = this.colors;
    
    // Initial massive burst
    this.createParticles(x, y, 200, colors[Math.floor(Math.random() * colors.length)], { 
      effectType: 'starburst', 
      speedMultiplier: 1.2
    });
    
    // Pattern for coordinated bursts
    const burstCount = 18; // Increased from 12 for more fireworks
    const burstOffsets = [];
    
    // Create a more organized pattern for finale bursts
    // Outer ring of explosions
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const distance = 200 + Math.random() * 50;
      burstOffsets.push({
        x: x + Math.cos(angle) * distance,
        y: y + Math.sin(angle) * distance,
        delay: i * 150, // More evenly spaced timing
        effectType: i % 2 === 0 ? 'heart' : 'rings'
      });
    }
    
    // Inner ring with different pattern
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2 + (Math.PI / 12);
      const distance = 100 + Math.random() * 30;
      burstOffsets.push({
        x: x + Math.cos(angle) * distance,
        y: y + Math.sin(angle) * distance,
        delay: 1800 + i * 150, // Start after outer ring
        effectType: i % 2 === 0 ? 'spiral' : 'starburst'
      });
    }
    
    // Launch each burst in the pattern
    burstOffsets.forEach((burst, i) => {
      setTimeout(() => {
        if (this.isActive) {
          const color = colors[Math.floor(Math.random() * colors.length)];
          
          // Create the burst
          this.createParticles(burst.x, burst.y, 80, color, { 
            effectType: burst.effectType, 
            speedMultiplier: 1.0
          });
          
          // Play explosion sound with varied pitch
          if (this.sounds.explosion) {
            this.sounds.explosion.currentTime = 0;
            this.sounds.explosion.volume = 0.3 + Math.random() * 0.2;
            this.sounds.explosion.playbackRate = 0.7 + Math.random() * 0.6;
            this.sounds.explosion.play().catch(err => console.log('Sound play error:', err));
          }
          
          // For the last burst, add a special effect
          if (i === burstOffsets.length - 1) {
            // Wait a moment, then launch a final special burst
            setTimeout(() => {
              if (this.isActive) {
                this.createParticles(x, y - 50, 150, '#ffffff', { 
                  effectType: 'crossette', 
                  speedMultiplier: 1.3
                });
              }
            }, 500);
          }
        }
      }, burst.delay);
    });
    
    // After all explosions, show stars and moon
    setTimeout(() => {
      if (this.isActive && !this.showStarsAndMoon && this.stars.length === 0) {
        // Start with stars fading in
        this.createInitialStars();
      }
    }, burstOffsets[burstOffsets.length - 1].delay + 2000); // After last planned burst
  }

  createSpecialEffect(x, y) {
    // Create a special effect based on the chosen type for this show
    const color = this.colors[Math.floor(Math.random() * this.colors.length)];
    
    switch(this.specialEffectType) {
      case 'heart':
        this.createParticles(x, y, 120, color, { effectType: 'heart', speedMultiplier: 2 });
        break;
      case 'spiral':
        this.createParticles(x, y, 120, color, { effectType: 'spiral', speedMultiplier: 1.5 });
        break;
      case 'starburst':
        this.createParticles(x, y, 120, color, { effectType: 'starburst', speedMultiplier: 2 });
        break;
      case 'cascade':
        this.createParticles(x, y, 120, color, { effectType: 'cascade', speedMultiplier: 1.2 });
        break;
      case 'rings':
        this.createParticles(x, y, 150, color, { effectType: 'rings', speedMultiplier: 1.5 });
        break;
      case 'crossette':
        this.createParticles(x, y, 100, color, { effectType: 'crossette', speedMultiplier: 1.3 });
        break;
      default:
        this.createParticles(x, y, 120, color);
    }
  }

  updateFireworks() {
    // Launch new fireworks
    const now = Date.now();
    if (this.launched < this.maxFireworks && now - this.lastLaunch > this.launchInterval) {
      const x = Math.random() * this.canvas.width;
      const y = this.canvas.height;
      const targetX = Math.random() * this.canvas.width;
      const targetY = 50 + Math.random() * (this.canvas.height * 0.6);
      
      this.createFirework(x, y, targetX, targetY);
      this.lastLaunch = now;
      this.launched++;
      
      // For special finale effect on last firework
      if (this.launched === this.maxFireworks) {
        this.specialEffectType = 'rings';
        this.finaleStarted = true;
      }
    }
    
    // Update existing fireworks
    for (let i = this.fireworks.length - 1; i >= 0; i--) {
      const firework = this.fireworks[i];
      
      firework.x += Math.cos(firework.angle) * firework.speed;
      firework.y += Math.sin(firework.angle) * firework.speed;
      
      // Add flickering effect to some fireworks
      if (firework.flicker && Math.random() > 0.9) {
        firework.alpha = 0.5 + Math.random() * 0.5;
      } else {
        firework.alpha = 1;
      }
      
      // Add to trail
      firework.trail.push({ x: firework.x, y: firework.y, alpha: 1 });
      
      // Trim trail if too long
      if (firework.trail.length > firework.trailLength) {
        firework.trail.shift();
      }
      
      // Fade trail
      for (let j = 0; j < firework.trail.length; j++) {
        firework.trail[j].alpha = (j / firework.trailLength);
      }
      
      // Add smoke particles to trail
      if (firework.smokeTrail && Math.random() > 0.9) {
        this.createSmokeParticles(firework.x, firework.y, 1);
      }
      
      // Check if firework reached target
      const distanceToTarget = Math.sqrt(
        Math.pow(firework.targetX - firework.x, 2) + 
        Math.pow(firework.targetY - firework.y, 2)
      );
      
      if (distanceToTarget < 5 || firework.y < 0) {
        // Different explosion types
        if (firework.isFinale) {
          this.createFinaleExplosion(firework.x, firework.y);
        } else if (firework.type === 'multi-stage') {
          this.createMultiStageExplosion(firework.x, firework.y, firework.color);
        } else if (firework.type === 'crossette') {
          this.createCrossetteExplosion(firework.x, firework.y, firework.color);
        } else if (Math.random() > 0.7) {
          this.createSpecialEffect(firework.x, firework.y);
        } else {
          this.createParticles(firework.x, firework.y, null, firework.color);
        }
        
        // Remove firework
        this.fireworks.splice(i, 1);
      }
    }
  }

  updateParticles() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const particle = this.particles[i];
      
      // Handle shockwave particles
      if (particle.shockwaveType === 'circle') {
        particle.radius += 3; // Reduced from 5 for slower expansion
        particle.alpha -= particle.decay;
        
        if (particle.radius >= particle.maxRadius || particle.alpha <= 0) {
          this.particles.splice(i, 1);
        }
        continue;
      }
      
      // Handle flash particles
      if (particle.type === 'flash') {
        particle.alpha -= particle.decay;
        
        if (particle.alpha <= 0) {
          this.particles.splice(i, 1);
        }
        continue;
      }
      
      // Handle smoke particles
      if (particle.type === 'smoke') {
        particle.life++;
        particle.radius += particle.growth;
        particle.alpha -= particle.decay;
        
        // Apply some turbulence to smoke movement
        particle.vx += (Math.random() - 0.5) * particle.turbulence;
        particle.vy += (Math.random() - 0.5) * particle.turbulence - 0.01; // Slight upward drift
        
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        if (particle.alpha <= 0 || particle.life >= particle.maxLife) {
          this.particles.splice(i, 1);
        }
        continue;
      }
      
      // Regular particles
      particle.speed *= particle.friction;
      particle.x += Math.cos(particle.angle) * particle.speed;
      particle.y += Math.sin(particle.angle) * particle.speed + particle.gravity;
      
      // Add shimmer effect to some particles
      if (particle.shimmer) {
        particle.alpha = Math.max(0, particle.alpha - particle.decay * (0.5 + Math.sin(Date.now() * 0.01) * particle.shimmerIntensity * 0.5));
      } else {
        particle.alpha -= particle.decay;
      }
      
      // Add particle trail if enabled
      if (particle.hasTrail) {
        particle.trail.push({ x: particle.x, y: particle.y, alpha: particle.alpha });
        
        if (particle.trail.length > particle.trailLength) {
          particle.trail.shift();
        }
      }
      
      // Handle crossette particle splitting
      if (particle.willSplit && particle.splitTime > 0) {
        particle.splitTime--;
        
        if (particle.splitTime <= 0) {
          // Create perpendicular particles
          const splitCount = 4 + Math.floor(Math.random() * 4);
          const perpAngle = particle.angle + Math.PI / 2;
          
          for (let j = 0; j < splitCount; j++) {
            const splitAngle = perpAngle + (j / splitCount) * Math.PI * 2;
            const splitParticle = {
              x: particle.x,
              y: particle.y,
              char: particle.char,
              angle: splitAngle,
              speed: particle.speed * 1.2,
              friction: particle.friction,
              gravity: particle.gravity,
              size: particle.size * 0.7,
              color: particle.color,
              alpha: particle.alpha,
              decay: particle.decay * 1.2,
              shimmer: particle.shimmer
            };
            this.particles.push(splitParticle);
          }
        }
      }
      
      if (particle.alpha <= 0) {
        this.particles.splice(i, 1);
      }
    }
    
    // Update stars
    if (this.showStarsAndMoon) {
      for (const star of this.stars) {
        star.twinklePhase += star.twinkleSpeed;
        if (star.twinklePhase > Math.PI * 2) {
          star.twinklePhase -= Math.PI * 2;
        }
      }
    }
    
    // Check if fireworks sequence is complete
    if (this.launched >= this.maxFireworks && this.fireworks.length === 0 && 
        this.particles.length === 0 && this.finaleStarted) {
      
      // If we haven't shown stars and moon yet, show them before ending
      if (!this.showStarsAndMoon) {
        this.showStarsAndMoon = true;
        this.createStarsAndMoon();
        
        // No longer automatically stop - let user click the button to end
        // Update the tooltip to indicate that clicking stops the show
        setTimeout(() => {
          const tooltip = document.getElementById('fireworks-tooltip');
          if (tooltip && this.isActive) {
            tooltip.textContent = 'Click to end show';
            tooltip.style.display = 'block';
            setTimeout(() => {
              if (tooltip) {
                tooltip.classList.add('fade-out');
                setTimeout(() => {
                  tooltip.style.display = 'none';
                  tooltip.classList.remove('fade-out');
                }, 1000);
              }
            }, 3000);
          }
        }, 5000);
      }
    }
  }

  drawFireworks() {
    this.fireworks.forEach(firework => {
      // Draw smoke trail first if enabled
      if (firework.smokeTrail) {
        for (let i = 0; i < firework.trail.length; i++) {
          const point = firework.trail[i];
          const size = firework.size * 2 * (i / firework.trail.length);
          this.ctx.beginPath();
          this.ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
          this.ctx.fillStyle = `rgba(200, 200, 200, ${point.alpha * 0.2})`;
          this.ctx.fill();
        }
      }
      
      // Draw trail
      for (let i = 0; i < firework.trail.length; i++) {
        const point = firework.trail[i];
        this.ctx.beginPath();
        this.ctx.arc(point.x, point.y, firework.size, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(${this.hexToRgb(firework.color)}, ${point.alpha * firework.alpha})`;
        this.ctx.fill();
      }
      
      // Draw firework
      this.ctx.beginPath();
      this.ctx.arc(firework.x, firework.y, firework.size + 1, 0, Math.PI * 2);
      
      // Add glow effect
      const gradient = this.ctx.createRadialGradient(
        firework.x, firework.y, 0,
        firework.x, firework.y, firework.size * 2
      );
      gradient.addColorStop(0, firework.color);
      gradient.addColorStop(0.3, firework.color);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      this.ctx.fillStyle = gradient;
      this.ctx.globalAlpha = firework.alpha;
      this.ctx.fill();
      this.ctx.globalAlpha = 1;
    });
  }

  drawParticles() {
    // Draw flashes first
    this.particles.forEach(particle => {
      if (particle.type === 'flash') {
        const gradient = this.ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.radius
        );
        gradient.addColorStop(0, `rgba(${this.hexToRgb(particle.color)}, ${particle.alpha})`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
      }
    });
    
    // Draw smoke particles
    this.particles.forEach(particle => {
      if (particle.type === 'smoke') {
        const gradient = this.ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.radius
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${particle.alpha * 0.3})`);
        gradient.addColorStop(0.5, `rgba(200, 200, 200, ${particle.alpha * 0.2})`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
      }
    });
    
    // Draw shockwaves
    this.particles.forEach(particle => {
      if (particle.shockwaveType === 'circle') {
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        this.ctx.strokeStyle = `rgba(${this.hexToRgb(particle.color)}, ${particle.alpha})`;
        this.ctx.lineWidth = particle.lineWidth;
        this.ctx.stroke();
      }
    });
    
    // Draw regular particles
    this.particles.forEach(particle => {
      if (!particle.type && !particle.shockwaveType) {
        // Draw trail if particle has one
        if (particle.hasTrail && particle.trail.length > 0) {
          for (let i = 0; i < particle.trail.length; i++) {
            const point = particle.trail[i];
            this.ctx.font = `${particle.size * 0.8}px monospace`;
            this.ctx.fillStyle = `rgba(${this.hexToRgb(particle.color)}, ${point.alpha * 0.3})`;
            this.ctx.fillText(particle.char, point.x, point.y);
          }
        }
        
        // Draw ASCII character with optional shimmer effect
        this.ctx.font = `${particle.size}px monospace`;
        if (particle.shimmer) {
          // Add slight color variation for shimmer
          const shimmerOffset = Math.sin(Date.now() * 0.01) * 30;
          this.ctx.fillStyle = `rgba(${this.hexToRgbWithOffset(particle.color, shimmerOffset)}, ${particle.alpha})`;
        } else {
          this.ctx.fillStyle = `rgba(${this.hexToRgb(particle.color)}, ${particle.alpha})`;
        }
        this.ctx.fillText(particle.char, particle.x, particle.y);
        
        // Add a glow effect for some particles
        if (Math.random() > 0.9 && particle.alpha > 0.5) {
          this.ctx.shadowColor = particle.color;
          this.ctx.shadowBlur = 10;
          this.ctx.fillText(particle.char, particle.x, particle.y);
          this.ctx.shadowBlur = 0;
        }
      }
    });
  }

  drawStarsAndMoon() {
    if (!this.showStarsAndMoon && this.stars.length === 0) return;
    
    // Draw stars
    this.stars.forEach(star => {
      // Calculate twinkle effect
      const twinkle = (Math.sin(star.twinklePhase) + 1) * 0.5 * (star.brightness || 1);
      
      // Use star's current opacity for fade-in effect
      const currentOpacity = star.opacity !== undefined ? star.opacity : 1;
      
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      this.ctx.fillStyle = star.color;
      this.ctx.globalAlpha = (0.3 + twinkle * 0.7) * currentOpacity;
      this.ctx.fill();
      
      // Add glow for special stars
      if (star.special) {
        this.ctx.globalAlpha = (0.1 + twinkle * 0.3) * currentOpacity;
        this.ctx.beginPath();
        this.ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
        this.ctx.fillStyle = star.color;
        this.ctx.fill();
        
        // Add twinkle rays for special stars
        if (twinkle > 0.7) {
          const rayLength = star.size * (5 + twinkle * 5);
          this.ctx.globalAlpha = 0.2 * twinkle * currentOpacity;
          
          for (let i = 0; i < 4; i++) {
            const angle = (i / 4) * Math.PI * 2;
            this.ctx.beginPath();
            this.ctx.moveTo(star.x, star.y);
            this.ctx.lineTo(
              star.x + Math.cos(angle) * rayLength,
              star.y + Math.sin(angle) * rayLength
            );
            this.ctx.strokeStyle = star.color;
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
          }
        }
      }
      
      this.ctx.globalAlpha = 1;
    });
    
    // Draw moon if visible
    if (this.moonVisible) {
      const moonX = this.canvas.width * 0.8;
      const moonY = this.canvas.height * 0.2;
      const moonSize = 40;
      
      // If moon is just appearing, determine its opacity based on stars progress
      let moonOpacity = 1;
      if (!this.showStarsAndMoon) {
        // Calculate average star opacity as a reference
        const totalOpacity = this.stars.reduce((sum, star) => sum + star.opacity, 0);
        const avgOpacity = totalOpacity / this.stars.length;
        // Moon appears later, when stars are already quite visible
        moonOpacity = Math.max(0, (avgOpacity - 0.5) * 2);
      }
      
      // Create moon glow
      const moonGlow = this.ctx.createRadialGradient(
        moonX, moonY, moonSize * 0.8,
        moonX, moonY, moonSize * 2.5
      );
      moonGlow.addColorStop(0, `rgba(255, 255, 230, ${0.3 * moonOpacity})`);
      moonGlow.addColorStop(1, 'rgba(255, 255, 230, 0)');
      
      this.ctx.beginPath();
      this.ctx.arc(moonX, moonY, moonSize * 2.5, 0, Math.PI * 2);
      this.ctx.fillStyle = moonGlow;
      this.ctx.fill();
      
      // Use global alpha for the moon opacity during fade-in
      this.ctx.globalAlpha = moonOpacity;
      
      // Create moon gradient
      const moonGradient = this.ctx.createRadialGradient(
        moonX - moonSize * 0.3, moonY - moonSize * 0.3, 0,
        moonX, moonY, moonSize
      );
      moonGradient.addColorStop(0, 'rgba(255, 255, 240, 1)');
      moonGradient.addColorStop(0.7, 'rgba(255, 250, 230, 1)');
      moonGradient.addColorStop(1, 'rgba(240, 240, 210, 1)');
      
      // Draw moon
      this.ctx.beginPath();
      this.ctx.arc(moonX, moonY, moonSize, 0, Math.PI * 2);
      this.ctx.fillStyle = moonGradient;
      this.ctx.fill();
      
      // Draw some moon craters
      this.ctx.globalAlpha = 0.05 * moonOpacity;
      this.ctx.fillStyle = '#333';
      
      // Crater 1
      this.ctx.beginPath();
      this.ctx.arc(moonX + moonSize * 0.2, moonY + moonSize * 0.3, moonSize * 0.15, 0, Math.PI * 2);
      this.ctx.fill();
      
      // Crater 2
      this.ctx.beginPath();
      this.ctx.arc(moonX - moonSize * 0.3, moonY + moonSize * 0.1, moonSize * 0.1, 0, Math.PI * 2);
      this.ctx.fill();
      
      // Crater 3
      this.ctx.beginPath();
      this.ctx.arc(moonX + moonSize * 0.1, moonY - moonSize * 0.2, moonSize * 0.2, 0, Math.PI * 2);
      this.ctx.fill();
      
      this.ctx.globalAlpha = 1;
    }
  }

  hexToRgb(hex) {
    // Remove # if present
    hex = hex.replace('#', '');
    
    // Parse r, g, b values
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    return `${r}, ${g}, ${b}`;
  }
  
  hexToRgbWithOffset(hex, offset) {
    // Remove # if present
    hex = hex.replace('#', '');
    
    // Parse r, g, b values
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    
    // Add offset and clamp to 0-255
    r = Math.min(255, Math.max(0, r + offset));
    g = Math.min(255, Math.max(0, g + offset));
    b = Math.min(255, Math.max(0, b + offset));
    
    return `${r}, ${g}, ${b}`;
  }

  animate() {
    if (!this.isActive) return;
    
    if (this.sunsetPhase === 'sunset') {
      // Clear canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      // Update and draw sunset
      this.updateSunset();
      this.drawSunset();
      
      // Continue animation
      requestAnimationFrame(() => this.animate());
      return;
    } else if (this.sunsetPhase === 'night') {
      // Transition to fireworks phase
      this.sunsetPhase = 'fireworks';
      this.lastLaunch = Date.now(); // Reset launch timer
      
      // Create stars with initial zero opacity
      this.createInitialStars();
    }
    
    // Clear canvas with a more attractive fade effect
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw the horizon silhouette to maintain continuity with sunset
    if (this.horizonPoints && this.horizonPoints.length > 0) {
      this.drawHorizonSilhouette();
    }
    
    // Draw stars and moon first if they're visible
    if (this.showStarsAndMoon) {
      this.drawStarsAndMoon();
    } else if (this.stars.length > 0) {
      // Stars are fading in
      this.updateStarFadeIn();
      this.drawStarsAndMoon();
    }
    
    // Update
    this.updateFireworks();
    this.updateParticles();
    
    // Draw
    this.drawFireworks();
    this.drawParticles();
    
    // Continue animation
    requestAnimationFrame(() => this.animate());
  }

  // New method to draw horizon silhouette during night phase
  drawHorizonSilhouette() {
    const ctx = this.ctx;
    const width = this.canvas.width;
    const height = this.canvas.height;
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.95)';
    ctx.beginPath();
    ctx.moveTo(0, this.horizonPoints[0].y);
    
    for (const point of this.horizonPoints) {
      ctx.lineTo(point.x, point.y);
    }
    
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();
  }

  // New method to create stars with zero initial opacity
  createInitialStars() {
    // Clear any existing stars
    this.stars = [];
    
    // Create stars for the night sky (initially invisible)
    const starCount = 150 + Math.random() * 100;
    for (let i = 0; i < starCount; i++) {
      const x = Math.random() * this.canvas.width;
      const y = Math.random() * (this.canvas.height * 0.7); // Keep stars in upper 70% of screen
      const size = 1 + Math.random() * 2;
      const twinkleSpeed = 0.01 + Math.random() * 0.03;
      const brightness = 0.5 + Math.random() * 0.5;
      
      const star = {
        x,
        y,
        size,
        twinkleSpeed,
        twinklePhase: Math.random() * Math.PI * 2,
        color: Math.random() > 0.8 ? 
               this.colors[Math.floor(Math.random() * this.colors.length)] : 
               '#ffffff',
        opacity: 0, // Start with zero opacity
        targetOpacity: Math.random() * 0.7 + 0.3, // Target opacity varies by star
        fadeSpeed: 0.002 + Math.random() * 0.003 // Different fade in speeds
      };
      this.stars.push(star);
    }
    
    // Add a bright twinkle effect to random stars
    for (let i = 0; i < 20; i++) {
      const starIndex = Math.floor(Math.random() * this.stars.length);
      if (this.stars[starIndex]) {
        this.stars[starIndex].brightness = 0.8 + Math.random() * 0.2;
        this.stars[starIndex].size = 2 + Math.random() * 2;
        this.stars[starIndex].special = true;
        this.stars[starIndex].targetOpacity = 0.9; // Brighter target
      }
    }
    
    // Moon will be added when stars are fully visible
    this.moonVisible = false;
    this.starFadeStartTime = Date.now();
  }

  // New method to update star fade in
  updateStarFadeIn() {
    const now = Date.now();
    const elapsed = now - this.starFadeStartTime;
    const totalFadeTime = 4000; // 4 seconds to fade in stars
    
    if (elapsed >= totalFadeTime) {
      // All stars should be at target opacity now
      if (!this.moonVisible) {
        this.moonVisible = true; // Show moon once stars are visible
        
        // Once stars and moon are visible, we consider the night sky complete
        if (!this.showStarsAndMoon) {
          this.showStarsAndMoon = true;
          
          // Play the finale sound
          if (this.sounds.finale) {
            this.sounds.finale.currentTime = 0;
            this.sounds.finale.volume = 0.5;
            this.sounds.finale.play().catch(err => console.log('Sound play error:', err));
          }
        }
      }
      return;
    }
    
    // Update opacity of each star
    const progress = elapsed / totalFadeTime;
    this.stars.forEach(star => {
      // Different stars fade in at different rates
      const starProgress = Math.min(progress * (1 + Math.random() * 0.5), 1);
      star.opacity = Math.min(star.opacity + star.fadeSpeed, star.targetOpacity * starProgress);
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Create fireworks canvas
  const canvas = document.createElement('canvas');
  canvas.id = 'fireworks-canvas';
  canvas.className = 'fireworks-canvas';
  document.body.appendChild(canvas);
  
  // Create fireworks instance
  window.fireworks = new ASCIIFireworks();
  
  // Create spectacular button with tooltip
  const fireworksContainer = document.createElement('div');
  fireworksContainer.id = 'fireworks-container';
  fireworksContainer.className = 'fireworks-container';
  
  const fireworksBtn = document.createElement('button');
  fireworksBtn.id = 'fireworks-btn';
  fireworksBtn.className = 'fireworks-btn';
  fireworksBtn.innerHTML = '<i class="fas fa-rocket"></i>';
  fireworksBtn.setAttribute('aria-label', 'Launch Fireworks');
  
  const fireworksTooltip = document.createElement('div');
  fireworksTooltip.id = 'fireworks-tooltip';
  fireworksTooltip.className = 'fireworks-tooltip';
  fireworksTooltip.textContent = 'Click for fireworks!';
  
  fireworksContainer.appendChild(fireworksBtn);
  fireworksContainer.appendChild(fireworksTooltip);
  document.querySelector('.mid').appendChild(fireworksContainer);
  
  // Add click event
  fireworksBtn.addEventListener('click', () => {
    if (!window.fireworks.isActive) {
      window.fireworks.start();
    } else {
      window.fireworks.stop();
    }
  });
  
  // Hide tooltip after a few seconds
  setTimeout(() => {
    if (fireworksTooltip) {
      fireworksTooltip.classList.add('fade-out');
      setTimeout(() => {
        fireworksTooltip.style.display = 'none';
      }, 1000);
    }
  }, 5000);
}); 