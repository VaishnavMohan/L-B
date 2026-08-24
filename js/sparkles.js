/**
 * ===================================================================
 * MAGICAL GOLDEN TOUCH & FINGER SPARKLE TRAIL
 * Vivid, glowing stardust and 4-point golden sparkle trail for mobile & desktop
 * ===================================================================
 */

class MagicSparkleTrail {
  constructor() {
    this.canvas = document.getElementById('sparkle-trail-canvas');
    if (!this.canvas) {
      this.canvas = document.createElement('canvas');
      this.canvas.id = 'sparkle-trail-canvas';
      this.canvas.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:99999;';
      document.body.appendChild(this.canvas);
    } else {
      this.canvas.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:99999;';
    }

    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.maxParticles = 120;
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.lastSpawnTime = 0;
    this.spawnThrottle = 16; // 60fps spawn rate

    // Vivid Gold & Starlight Palette
    this.colors = [
      '#FFFFFF', // Diamond Core
      '#FFF4C2', // Champagne Light
      '#FFD700', // Royal Vivid Gold
      '#FFA726', // Warm Amber Spark
      '#FFE082'  // Golden Glow
    ];

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize(), { passive: true });

    // Desktop Mouse Events
    window.addEventListener('mousemove', (e) => {
      this.handleMove(e.clientX, e.clientY);
    }, { passive: true });

    window.addEventListener('mousedown', (e) => {
      this.burst(e.clientX, e.clientY, 18);
    }, { passive: true });

    // Mobile Multi-Touch Events
    window.addEventListener('touchmove', (e) => {
      for (let i = 0; i < e.touches.length; i++) {
        const touch = e.touches[i];
        this.handleMove(touch.clientX, touch.clientY);
      }
    }, { passive: true });

    window.addEventListener('touchstart', (e) => {
      for (let i = 0; i < e.touches.length; i++) {
        const touch = e.touches[i];
        this.burst(touch.clientX, touch.clientY, 16);
      }
    }, { passive: true });

    // Initial Welcome Sparkle Shower from top center
    setTimeout(() => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight * 0.3;
      this.burst(cx, cy, 20);
    }, 400);

    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = window.innerWidth * dpr;
    this.canvas.height = window.innerHeight * dpr;
    this.ctx.scale(dpr, dpr);
  }

  handleMove(x, y) {
    const now = performance.now();
    if (now - this.lastSpawnTime < this.spawnThrottle) return;
    this.lastSpawnTime = now;

    // Spawn 2 to 3 sparkling particles per stroke
    const count = 3;
    for (let i = 0; i < count; i++) {
      if (this.particles.length < this.maxParticles) {
        this.particles.push(this.createParticle(x, y, false));
      }
    }
  }

  createParticle(x, y, isBurst = false) {
    const angle = Math.random() * Math.PI * 2;
    const speed = isBurst ? (Math.random() * 3.5 + 1.5) : (Math.random() * 1.4 + 0.4);
    const isStar = Math.random() > 0.35; // 65% chance to be a sparkling 4-point star

    return {
      x: x + (Math.random() * 10 - 5),
      y: y + (Math.random() * 10 - 5),
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - (isBurst ? 1.0 : 0.4), // float gently upward
      size: Math.random() * 5 + 4,
      alpha: 1,
      decay: Math.random() * 0.022 + 0.016, // lasts ~0.8s - 1.2s
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() * 0.12 - 0.06),
      color: this.colors[Math.floor(Math.random() * this.colors.length)],
      isStar: isStar
    };
  }

  burst(x, y, count = 16) {
    for (let i = 0; i < count; i++) {
      if (this.particles.length < this.maxParticles + 40) {
        this.particles.push(this.createParticle(x, y, true));
      }
    }
  }

  drawStar(ctx, x, y, size, rotation, alpha, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = alpha;

    // Outer Glow
    ctx.shadowColor = '#FFD700';
    ctx.shadowBlur = size * 2.5;

    // Draw 4-point Star Diamond
    ctx.fillStyle = color;
    ctx.beginPath();
    const spikes = 4;
    const outerRadius = size * 2.0;
    const innerRadius = size * 0.4;
    let rot = Math.PI / 2 * 3;
    let step = Math.PI / spikes;

    ctx.moveTo(0, -outerRadius);
    for (let i = 0; i < spikes; i++) {
      ctx.lineTo(Math.cos(rot) * outerRadius, Math.sin(rot) * outerRadius);
      rot += step;
      ctx.lineTo(Math.cos(rot) * innerRadius, Math.sin(rot) * innerRadius);
      rot += step;
    }
    ctx.lineTo(0, -outerRadius);
    ctx.closePath();
    ctx.fill();

    // Pure White Brilliant Center Core
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.45, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();

    ctx.restore();
  }

  animate() {
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];

      // Physics
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.035; // Gentle gravity
      p.vx *= 0.985;
      p.rotation += p.rotationSpeed;
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      if (p.isStar) {
        this.drawStar(this.ctx, p.x, p.y, p.size, p.rotation, p.alpha, p.color);
      } else {
        // Glowing circular dust ember
        this.ctx.save();
        this.ctx.globalAlpha = p.alpha;
        this.ctx.fillStyle = p.color;
        this.ctx.shadowColor = '#FFD700';
        this.ctx.shadowBlur = p.size * 2;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size * 0.8, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();
      }
    }

    requestAnimationFrame(this.animate);
  }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.magicSparkles = new MagicSparkleTrail();
  });
} else {
  window.magicSparkles = new MagicSparkleTrail();
}
