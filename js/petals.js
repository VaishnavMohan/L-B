/**
 * ===================================================================
 * FLOATING ROSE PETALS & CELEBRATION BURST SYSTEM
 * ===================================================================
 */

class PetalParticleSystem {
  constructor() {
    this.canvas = document.getElementById('petals-canvas');
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.petals = [];
    this.burstParticles = [];
    this.maxPetals = window.innerWidth < 768 ? 18 : 28;
    this.isRunning = true;
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.petalColors = [
      { r: 247, g: 198, b: 198, a: 0.8 }, // Rose light
      { r: 232, g: 165, b: 152, a: 0.85 }, // Peach rose
      { r: 255, g: 220, b: 220, a: 0.75 }, // Blush soft
      { r: 212, g: 175, b: 55, a: 0.7 }    // Gold dust
    ];

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize(), { passive: true });

    // Seed continuous floating petals
    for (let i = 0; i < this.maxPetals; i++) {
      this.petals.push(this.createPetal(true));
    }

    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createPetal(randomY = false) {
    const color = this.petalColors[Math.floor(Math.random() * this.petalColors.length)];
    return {
      x: Math.random() * this.canvas.width,
      y: randomY ? Math.random() * this.canvas.height : -30,
      size: Math.random() * 9 + 8,
      speedY: Math.random() * 1.2 + 0.8,
      speedX: Math.random() * 1.2 - 0.6,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() * 1.5 - 0.75),
      sway: Math.random() * 2 + 1,
      swaySpeed: Math.random() * 0.02 + 0.01,
      swayAngle: Math.random() * Math.PI * 2,
      color: color,
      gold: Math.random() > 0.85
    };
  }

  // Trigger celebration explosion of petals & sparkles
  burst(originX, originY, count = 45) {
    const x = originX || this.canvas.width / 2;
    const y = originY || this.canvas.height / 2;

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 / count) * i + (Math.random() * 0.4 - 0.2);
      const velocity = Math.random() * 8 + 4;
      const color = this.petalColors[Math.floor(Math.random() * this.petalColors.length)];

      this.burstParticles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity - 2,
        gravity: 0.18,
        size: Math.random() * 12 + 6,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() * 8 - 4),
        opacity: 1,
        fadeSpeed: Math.random() * 0.015 + 0.008,
        color: color,
        isGold: Math.random() > 0.5
      });
    }
  }

  drawPetalShape(ctx, size, color, isGold) {
    ctx.beginPath();
    ctx.moveTo(0, -size);
    ctx.bezierCurveTo(size * 0.8, -size * 0.6, size * 0.9, size * 0.6, 0, size);
    ctx.bezierCurveTo(-size * 0.9, size * 0.6, -size * 0.8, -size * 0.6, 0, -size);
    ctx.closePath();

    if (isGold) {
      const grad = ctx.createLinearGradient(-size, -size, size, size);
      grad.addColorStop(0, '#FFF3B0');
      grad.addColorStop(0.5, '#D4AF37');
      grad.addColorStop(1, '#9A7432');
      ctx.fillStyle = grad;
    } else {
      ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
    }
    ctx.fill();
  }

  animate() {
    if (!this.isRunning) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // 1. Draw floating petals
    for (let i = 0; i < this.petals.length; i++) {
      const p = this.petals[i];

      p.swayAngle += p.swaySpeed;
      p.x += p.speedX + Math.sin(p.swayAngle) * p.sway;
      p.y += p.speedY;
      p.rotation += p.rotationSpeed;

      // Wrap around
      if (p.y > this.canvas.height + 20) {
        this.petals[i] = this.createPetal(false);
      }
      if (p.x < -20) p.x = this.canvas.width + 10;
      if (p.x > this.canvas.width + 20) p.x = -10;

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.drawPetalShape(this.ctx, p.size, p.color, p.gold);
      this.ctx.restore();
    }

    // 2. Draw burst celebration particles
    for (let i = this.burstParticles.length - 1; i >= 0; i--) {
      const bp = this.burstParticles[i];

      bp.x += bp.vx;
      bp.y += bp.vy;
      bp.vy += bp.gravity;
      bp.vx *= 0.98;
      bp.rotation += bp.rotationSpeed;
      bp.opacity -= bp.fadeSpeed;

      if (bp.opacity <= 0 || bp.y > this.canvas.height + 50) {
        this.burstParticles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, bp.opacity);
      this.ctx.translate(bp.x, bp.y);
      this.ctx.rotate((bp.rotation * Math.PI) / 180);
      this.drawPetalShape(this.ctx, bp.size, bp.color, bp.isGold);
      this.ctx.restore();
    }

    requestAnimationFrame(this.animate);
  }

  toggle() {
    this.isRunning = !this.isRunning;
    if (this.isRunning) {
      requestAnimationFrame(this.animate);
    } else {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    return this.isRunning;
  }
}

// Global instance
window.petalSystem = null;
document.addEventListener('DOMContentLoaded', () => {
  window.petalSystem = new PetalParticleSystem();
});
