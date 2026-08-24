/**
 * ===================================================================
 * MAGICAL GOLDEN STARDUST (MOBILE-OPTIMIZED & SUBTLE)
 * Delicate, battery-friendly touch sparkles & soft ambient starlight
 * ===================================================================
 */

class MagicSparkleTrail {
  constructor() {
    this.canvas = document.getElementById('sparkle-trail-canvas');
    if (!this.canvas) {
      this.canvas = document.createElement('canvas');
      this.canvas.id = 'sparkle-trail-canvas';
      this.canvas.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:9998;';
      document.body.appendChild(this.canvas);
    }

    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.ambientFireflies = [];
    
    // Light particle caps
    const isMobile = window.innerWidth < 768;
    this.maxParticles = isMobile ? 25 : 45;
    this.maxFireflies = isMobile ? 5 : 8; // Very subtle starlight
    this.lastSpawnTime = 0;
    this.spawnThrottle = isMobile ? 32 : 20;

    // Champagne & Soft Gold Palette
    this.colors = [
      '#FFFFFF', // Starlight
      '#FFF4C2', // Champagne
      '#FFD700', // Gold
      '#E5BE5E'  // Soft Sheen
    ];

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize(), { passive: true });

    // Initialize subtle ambient fireflies
    this.initAmbientFireflies();

    // Desktop Mouse Events
    window.addEventListener('mousemove', (e) => {
      this.handleMove(e.clientX, e.clientY);
    }, { passive: true });

    window.addEventListener('mousedown', (e) => {
      this.burst(e.clientX, e.clientY, 8);
    }, { passive: true });

    // Mobile Touch Events
    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        this.handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    window.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) {
        this.burst(e.touches[0].clientX, e.touches[0].clientY, 8);
      }
    }, { passive: true });

    // 3D Parallax Tilt for Desktop Cards
    if (window.innerWidth >= 768) {
      this.init3DTilt();
    }

    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    this.canvas.width = window.innerWidth * dpr;
    this.canvas.height = window.innerHeight * dpr;
    this.ctx.scale(dpr, dpr);
    const isMobile = window.innerWidth < 768;
    this.maxParticles = isMobile ? 25 : 45;
  }

  initAmbientFireflies() {
    this.ambientFireflies = [];
    const w = window.innerWidth;
    const h = window.innerHeight;

    for (let i = 0; i < this.maxFireflies; i++) {
      this.ambientFireflies.push({
        x: Math.random() * w,
        y: Math.random() * h,
        radius: Math.random() * 1.5 + 0.8,
        alpha: Math.random() * 0.35 + 0.15, // Soft & subtle
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: -Math.random() * 0.3 - 0.1,
        pulseOffset: Math.random() * Math.PI * 2,
        color: this.colors[Math.floor(Math.random() * this.colors.length)]
      });
    }
  }

  handleMove(x, y) {
    const now = performance.now();
    if (now - this.lastSpawnTime < this.spawnThrottle) return;
    this.lastSpawnTime = now;

    if (this.particles.length < this.maxParticles) {
      this.particles.push(this.createParticle(x, y, false));
    }
  }

  createParticle(x, y, isBurst = false) {
    const angle = Math.random() * Math.PI * 2;
    const speed = isBurst ? (Math.random() * 2.5 + 1) : (Math.random() * 1 + 0.4);

    return {
      x: x + (Math.random() - 0.5) * 6,
      y: y + (Math.random() - 0.5) * 6,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - (isBurst ? 0.3 : 0.5),
      size: Math.random() * 2.5 + 1.2,
      alpha: 0.8,
      decay: Math.random() * 0.035 + 0.025, // Quick clean fade
      color: this.colors[Math.floor(Math.random() * this.colors.length)],
      isStar: Math.random() > 0.6,
      rotation: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.1
    };
  }

  burst(x, y, count = 8) {
    for (let i = 0; i < count; i++) {
      if (this.particles.length < this.maxParticles) {
        this.particles.push(this.createParticle(x, y, true));
      }
    }
  }

  draw4PointStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    let step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fill();
  }

  animate(timestamp) {
    const w = window.innerWidth;
    const h = window.innerHeight;

    this.ctx.clearRect(0, 0, w, h);

    // 1. Draw subtle ambient fireflies
    this.ambientFireflies.forEach(f => {
      f.x += f.speedX;
      f.y += f.speedY;

      if (f.y < -10) f.y = h + 10;
      if (f.x < -10) f.x = w + 10;
      if (f.x > w + 10) f.x = -10;

      const currentAlpha = (Math.sin(timestamp * 0.0015 + f.pulseOffset) * 0.2 + 0.3) * f.alpha;

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, Math.min(1, currentAlpha));
      this.ctx.fillStyle = f.color;
      this.ctx.beginPath();
      this.ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    });

    // 2. Draw touch sparkles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];

      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.vRot;
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, p.alpha);
      this.ctx.fillStyle = p.color;
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate(p.rotation);

      if (p.isStar) {
        this.draw4PointStar(this.ctx, 0, 0, 4, p.size, p.size * 0.3);
      } else {
        this.ctx.beginPath();
        this.ctx.arc(0, 0, p.size * 0.5, 0, Math.PI * 2);
        this.ctx.fill();
      }

      this.ctx.restore();
    }

    requestAnimationFrame(this.animate);
  }

  init3DTilt() {
    const cards = document.querySelectorAll('.invitation-card-section');
    if (!cards.length) return;

    window.addEventListener('mousemove', (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;

      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const tiltX = -dy * 2;
          const tiltY = dx * 2;
          card.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(1)}deg) rotateY(${tiltY.toFixed(1)}deg)`;
        }
      });
    }, { passive: true });
  }
}

// Global instance
window.magicSparkleTrail = null;
document.addEventListener('DOMContentLoaded', () => {
  window.magicSparkleTrail = new MagicSparkleTrail();
});
