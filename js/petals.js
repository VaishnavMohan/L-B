/**
 * ===================================================================
 * FLOATING ROSE PETALS & CELEBRATION BURST SYSTEM (LIGHT & SUBTLE)
 * Ultra-lightweight, translucent, and non-intrusive for mobile & desktop
 * ===================================================================
 */

class PetalParticleSystem {
  constructor() {
    this.canvas = document.getElementById('petals-canvas');
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.petals = [];
    this.burstParticles = [];
    
    // Very gentle count: 7 on mobile, 12 on desktop
    this.maxPetals = window.innerWidth < 768 ? 7 : 12;
    this.isRunning = true;
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Translucent, soft pastel petals that never obscure text
    this.petalColors = [
      { r: 247, g: 198, b: 198, a: 0.38 }, // Soft rose (translucent)
      { r: 232, g: 175, b: 165, a: 0.35 }, // Gentle peach
      { r: 255, g: 230, b: 230, a: 0.32 }, // Subtle blush
      { r: 212, g: 175, b: 55, a: 0.35 }   // Champagne gold
    ];

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize(), { passive: true });

    // Seed gentle floating petals
    for (let i = 0; i < this.maxPetals; i++) {
      this.petals.push(this.createPetal(true));
    }

    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.maxPetals = window.innerWidth < 768 ? 7 : 12;
  }

  createPetal(randomY = false) {
    const color = this.petalColors[Math.floor(Math.random() * this.petalColors.length)];
    const isMobile = window.innerWidth < 768;
    return {
      x: Math.random() * this.canvas.width,
      y: randomY ? Math.random() * this.canvas.height : -25,
      size: Math.random() * (isMobile ? 4 : 5) + 4.5, // Petite petals
      speedY: Math.random() * 0.7 + 0.4, // Gentle slow drift
      speedX: Math.random() * 0.8 - 0.4,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() * 0.8 - 0.4),
      sway: Math.random() * 1.5 + 0.8,
      swaySpeed: Math.random() * 0.015 + 0.008,
      swayAngle: Math.random() * Math.PI * 2,
      color: color,
      gold: Math.random() > 0.88
    };
  }

  // Trigger celebration pop of petals
  burst(originX, originY, count = 22) {
    const x = originX || this.canvas.width / 2;
    const y = originY || this.canvas.height / 2;
    const isMobile = window.innerWidth < 768;
    const actualCount = isMobile ? Math.min(count, 18) : count;

    for (let i = 0; i < actualCount; i++) {
      const angle = (Math.PI * 2 / actualCount) * i + (Math.random() * 0.4 - 0.2);
      const velocity = Math.random() * 6 + 2.5;
      const color = this.petalColors[Math.floor(Math.random() * this.petalColors.length)];

      this.burstParticles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity - 1.5,
        gravity: 0.15,
        size: Math.random() * (isMobile ? 6 : 8) + 4,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() * 6 - 3),
        opacity: 0.75,
        fadeSpeed: Math.random() * 0.02 + 0.015,
        color: color,
        isGold: Math.random() > 0.5
      });
    }
  }

  drawPetalShape(ctx, size, color, isGold) {
    ctx.beginPath();
    ctx.moveTo(0, -size);
    ctx.bezierCurveTo(size * 0.75, -size * 0.5, size * 0.85, size * 0.5, 0, size);
    ctx.bezierCurveTo(-size * 0.85, size * 0.5, -size * 0.75, -size * 0.5, 0, -size);
    ctx.closePath();

    if (isGold) {
      ctx.fillStyle = `rgba(212, 175, 55, ${color.a * 0.8})`;
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
      p.x += Math.sin(p.swayAngle) * p.sway + p.speedX;
      p.y += p.speedY;
      p.rotation += p.rotationSpeed;

      // Wrap around
      if (p.y > this.canvas.height + 25) {
        p.y = -25;
        p.x = Math.random() * this.canvas.width;
      }
      if (p.x < -25) p.x = this.canvas.width + 20;
      if (p.x > this.canvas.width + 25) p.x = -20;

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate(p.rotation * Math.PI / 180);
      this.drawPetalShape(this.ctx, p.size, p.color, p.gold);
      this.ctx.restore();
    }

    // 2. Draw burst celebration particles
    for (let i = this.burstParticles.length - 1; i >= 0; i--) {
      const bp = this.burstParticles[i];

      bp.x += bp.vx;
      bp.y += bp.vy;
      bp.vy += bp.gravity;
      bp.rotation += bp.rotationSpeed;
      bp.opacity -= bp.fadeSpeed;

      if (bp.opacity <= 0) {
        this.burstParticles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = bp.opacity;
      this.ctx.translate(bp.x, bp.y);
      this.ctx.rotate(bp.rotation * Math.PI / 180);
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
