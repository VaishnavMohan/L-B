/**
 * ===================================================================
 * FLOATING ROSE & MARIGOLD PETALS CELEBRATION SYSTEM
 * Rich, romantic, 3D fluttering petals for royal ambiance
 * ===================================================================
 */

class PetalParticleSystem {
  constructor() {
    this.canvas = document.getElementById('petals-canvas');
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.petals = [];
    this.burstParticles = [];
    
    // Rich, lush particle density
    this.maxPetals = window.innerWidth < 768 ? 22 : 42;
    this.isRunning = true;
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Vibrant romantic Kerala wedding petal colors
    this.petalColors = [
      { r: 255, g: 175, b: 190, a: 0.65 }, // Soft blush rose
      { r: 228, g: 75, b: 105, a: 0.58 },  // Deep royal rose
      { r: 255, g: 190, b: 90, a: 0.62 },  // Auspicious saffron marigold
      { r: 255, g: 215, b: 130, a: 0.60 }, // Fragrant jasmine gold
      { r: 235, g: 198, b: 72, a: 0.68 }   // 24k Champagne gold foil
    ];

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize(), { passive: true });

    // Seed initial drifting petals
    for (let i = 0; i < this.maxPetals; i++) {
      this.petals.push(this.createPetal(true));
    }

    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.maxPetals = window.innerWidth < 768 ? 22 : 42;
  }

  createPetal(randomY = false) {
    const color = this.petalColors[Math.floor(Math.random() * this.petalColors.length)];
    const isMobile = window.innerWidth < 768;
    return {
      x: Math.random() * this.canvas.width,
      y: randomY ? Math.random() * this.canvas.height : -30,
      size: Math.random() * (isMobile ? 5 : 7) + 6,
      speedY: Math.random() * 0.9 + 0.5, // Natural gentle falling speed
      speedX: Math.random() * 0.9 - 0.45,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() * 1.2 - 0.6),
      sway: Math.random() * 2.2 + 1.0,
      swaySpeed: Math.random() * 0.02 + 0.01,
      swayAngle: Math.random() * Math.PI * 2,
      flipSpeed: Math.random() * 0.03 + 0.015,
      flipAngle: Math.random() * Math.PI * 2,
      color: color,
      gold: Math.random() > 0.82
    };
  }

  // Trigger celebration pop of petals
  burst(originX, originY, count = 35) {
    const x = originX || this.canvas.width / 2;
    const y = originY || this.canvas.height / 2;
    const isMobile = window.innerWidth < 768;
    const actualCount = isMobile ? Math.min(count, 35) : count;

    for (let i = 0; i < actualCount; i++) {
      const angle = (Math.PI * 2 / actualCount) * i + (Math.random() * 0.5 - 0.25);
      const velocity = Math.random() * 7 + 3.0;
      const color = this.petalColors[Math.floor(Math.random() * this.petalColors.length)];

      this.burstParticles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity - 2.0,
        gravity: 0.16,
        size: Math.random() * (isMobile ? 7 : 10) + 5,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() * 8 - 4),
        flipAngle: Math.random() * Math.PI,
        flipSpeed: Math.random() * 0.06 + 0.03,
        opacity: 0.85,
        fadeSpeed: Math.random() * 0.018 + 0.012,
        color: color,
        isGold: Math.random() > 0.45
      });
    }
  }

  drawPetalShape(ctx, size, color, isGold, scaleX = 1) {
    ctx.save();
    ctx.scale(scaleX, 1); // 3D flutter effect

    ctx.beginPath();
    ctx.moveTo(0, -size);
    ctx.bezierCurveTo(size * 0.75, -size * 0.5, size * 0.85, size * 0.5, 0, size);
    ctx.bezierCurveTo(-size * 0.85, size * 0.5, -size * 0.75, -size * 0.5, 0, -size);
    ctx.closePath();

    if (isGold) {
      ctx.fillStyle = `rgba(235, 198, 72, ${color.a * 0.9})`;
    } else {
      ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
    }
    ctx.fill();

    // Subtle natural inner petal vein
    ctx.beginPath();
    ctx.moveTo(0, -size * 0.7);
    ctx.lineTo(0, size * 0.6);
    ctx.strokeStyle = `rgba(255, 255, 255, ${color.a * 0.35})`;
    ctx.lineWidth = 0.8;
    ctx.stroke();

    ctx.restore();
  }

  animate() {
    if (!this.isRunning) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // 1. Draw floating ambient petals
    for (let i = 0; i < this.petals.length; i++) {
      const p = this.petals[i];

      p.swayAngle += p.swaySpeed;
      p.flipAngle += p.flipSpeed;
      p.x += Math.sin(p.swayAngle) * p.sway + p.speedX;
      p.y += p.speedY;
      p.rotation += p.rotationSpeed;

      const scaleX = Math.cos(p.flipAngle); // 3D tumble

      // Wrap around
      if (p.y > this.canvas.height + 30) {
        p.y = -30;
        p.x = Math.random() * this.canvas.width;
      }
      if (p.x < -30) p.x = this.canvas.width + 25;
      if (p.x > this.canvas.width + 30) p.x = -25;

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate(p.rotation * Math.PI / 180);
      this.drawPetalShape(this.ctx, p.size, p.color, p.gold, scaleX);
      this.ctx.restore();
    }

    // 2. Draw burst celebration particles
    for (let i = this.burstParticles.length - 1; i >= 0; i--) {
      const bp = this.burstParticles[i];

      bp.x += bp.vx;
      bp.y += bp.vy;
      bp.vy += bp.gravity;
      bp.rotation += bp.rotationSpeed;
      bp.flipAngle += bp.flipSpeed;
      bp.opacity -= bp.fadeSpeed;

      if (bp.opacity <= 0) {
        this.burstParticles.splice(i, 1);
        continue;
      }

      const scaleX = Math.cos(bp.flipAngle);

      this.ctx.save();
      this.ctx.globalAlpha = bp.opacity;
      this.ctx.translate(bp.x, bp.y);
      this.ctx.rotate(bp.rotation * Math.PI / 180);
      this.drawPetalShape(this.ctx, bp.size, bp.color, bp.isGold, scaleX);
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

