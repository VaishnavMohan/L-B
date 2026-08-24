/**
 * ===================================================================
 * MAGICAL GOLDEN STARDUST & AMBIENT FIREFLY AURA
 * Delightful, ultra-lightweight golden sparkle trail & ambient fairy dust
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
    }

    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.ambientFireflies = [];
    this.maxParticles = 100;
    this.maxFireflies = 18; // Subtle, elegant ambient glowing orbs
    this.lastSpawnTime = 0;
    this.spawnThrottle = 18;

    // Royal Gold Palette
    this.colors = [
      '#FFFFFF', // Diamond Starlight
      '#FFF4C2', // Champagne Gold
      '#FFD700', // Royal Gold
      '#FFE082', // Warm Amber
      '#E5BE5E'  // 24k Gold Sheen
    ];

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize(), { passive: true });

    // Initialize ambient fireflies
    this.initAmbientFireflies();

    // Desktop Mouse Events
    window.addEventListener('mousemove', (e) => {
      this.handleMove(e.clientX, e.clientY);
    }, { passive: true });

    window.addEventListener('mousedown', (e) => {
      this.burst(e.clientX, e.clientY, 16);
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
        this.burst(touch.clientX, touch.clientY, 14);
      }
    }, { passive: true });

    // 3D Parallax Tilt for Cards on Mouse Move & Gyro
    this.init3DTilt();

    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = window.innerWidth * dpr;
    this.canvas.height = window.innerHeight * dpr;
    this.ctx.scale(dpr, dpr);
  }

  initAmbientFireflies() {
    this.ambientFireflies = [];
    const w = window.innerWidth;
    const h = window.innerHeight;

    for (let i = 0; i < this.maxFireflies; i++) {
      this.ambientFireflies.push({
        x: Math.random() * w,
        y: Math.random() * h,
        radius: Math.random() * 2.2 + 1,
        alpha: Math.random() * 0.6 + 0.2,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: -Math.random() * 0.4 - 0.2, // Drifts softly upwards
        pulseSpeed: Math.random() * 0.02 + 0.01,
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
    const speed = isBurst ? (Math.random() * 3.5 + 1.5) : (Math.random() * 1.5 + 0.5);

    return {
      x: x + (Math.random() - 0.5) * 8,
      y: y + (Math.random() - 0.5) * 8,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - (isBurst ? 0.5 : 0.8),
      size: Math.random() * (isBurst ? 4.5 : 3.5) + 1.5,
      alpha: 1,
      decay: Math.random() * 0.025 + 0.015,
      color: this.colors[Math.floor(Math.random() * this.colors.length)],
      isStar: Math.random() > 0.4,
      rotation: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.15
    };
  }

  burst(x, y, count = 16) {
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

    // 1. Draw Ambient Fireflies
    this.ambientFireflies.forEach(f => {
      f.x += f.speedX;
      f.y += f.speedY;

      // Wrap around edges
      if (f.y < -20) f.y = h + 10;
      if (f.x < -20) f.x = w + 10;
      if (f.x > w + 20) f.x = -10;

      const currentAlpha = (Math.sin(timestamp * 0.002 + f.pulseOffset) * 0.35 + 0.5) * f.alpha;

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, Math.min(1, currentAlpha));
      this.ctx.fillStyle = f.color;
      this.ctx.shadowColor = f.color;
      this.ctx.shadowBlur = 8;
      this.ctx.beginPath();
      this.ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    });

    // 2. Draw Touch Sparkles & Stardust
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];

      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.vRot;
      p.alpha -= p.decay;
      p.size *= 0.97;

      if (p.alpha <= 0 || p.size <= 0.3) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, p.alpha);
      this.ctx.fillStyle = p.color;
      this.ctx.shadowColor = p.color;
      this.ctx.shadowBlur = 6;
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate(p.rotation);

      if (p.isStar) {
        this.draw4PointStar(this.ctx, 0, 0, 4, p.size, p.size * 0.35);
      } else {
        this.ctx.beginPath();
        this.ctx.arc(0, 0, p.size * 0.6, 0, Math.PI * 2);
        this.ctx.fill();
      }

      this.ctx.restore();
    }

    requestAnimationFrame(this.animate);
  }

  /* 3D Micro-Tilt Interaction for Cards */
  init3DTilt() {
    const cards = document.querySelectorAll('.invitation-card-section');
    if (!cards.length) return;

    window.addEventListener('mousemove', (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx; // -1 to 1
      const dy = (e.clientY - cy) / cy; // -1 to 1

      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        // Only tilt cards currently visible in viewport
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const tiltX = -dy * 2.5;
          const tiltY = dx * 2.5;
          card.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg)`;
        }
      });
    }, { passive: true });
  }
}

// Initialize on DOM load
window.magicSparkleTrail = null;
document.addEventListener('DOMContentLoaded', () => {
  window.magicSparkleTrail = new MagicSparkleTrail();
});
