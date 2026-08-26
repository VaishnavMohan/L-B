/**
 * ===================================================================
 * FLOATING BLUSH ROSE & EUCALYPTUS PETALS CELEBRATION SYSTEM
 * Soft, romantic, 3D fluttering petals for Lintu & Basil
 * ===================================================================
 */

class PetalParticleSystem {
  constructor() {
    this.canvas = document.getElementById('petals-canvas');
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.petals = [];
    this.burstParticles = [];
    
    // Smooth particle density
    this.maxPetals = window.innerWidth < 768 ? 20 : 38;
    this.isRunning = true;
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Romantic blush floral palette: Blush rose, peach rose, champagne gold, eucalyptus sage
    this.petalColors = [
      { r: 247, g: 198, b: 204, a: 0.70, type: 'rose' }, // Soft blush rose
      { r: 232, g: 155, b: 168, a: 0.65, type: 'rose' }, // Deep blush rose
      { r: 250, g: 215, b: 195, a: 0.65, type: 'rose' }, // Soft peach rose
      { r: 155, g: 180, b: 155, a: 0.55, type: 'leaf' }, // Eucalyptus sage leaf
      { r: 228, g: 195, b: 115, a: 0.60, type: 'gold' }  // Warm champagne gold shimmer
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
    this.maxPetals = window.innerWidth < 768 ? 20 : 38;
  }

  createPetal(randomY = false) {
    const color = this.petalColors[Math.floor(Math.random() * this.petalColors.length)];
    const isMobile = window.innerWidth < 768;
    return {
      x: Math.random() * this.canvas.width,
      y: randomY ? Math.random() * this.canvas.height : -30,
      size: Math.random() * (isMobile ? 5 : 7) + 6,
      speedY: Math.random() * 0.8 + 0.4,
      speedX: Math.random() * 0.8 - 0.4,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() * 1.0 - 0.5),
      sway: Math.random() * 2.0 + 1.0,
      swaySpeed: Math.random() * 0.02 + 0.01,
      swayAngle: Math.random() * Math.PI * 2,
      flipSpeed: Math.random() * 0.03 + 0.015,
      flipAngle: Math.random() * Math.PI * 2,
      color: color
    };
  }

  // Trigger celebration pop of petals
  burst(originX, originY, count = 35) {
    const x = originX || this.canvas.width / 2;
    const y = originY || this.canvas.height / 2;
    const isMobile = window.innerWidth < 768;
    const actualCount = isMobile ? Math.min(count, 30) : count;

    for (let i = 0; i < actualCount; i++) {
      const angle = (Math.PI * 2 / actualCount) * i + (Math.random() * 0.5 - 0.25);
      const velocity = Math.random() * 6 + 2.5;
      const color = this.petalColors[Math.floor(Math.random() * this.petalColors.length)];

      this.burstParticles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity - 2.0,
        gravity: 0.15,
        size: Math.random() * (isMobile ? 6 : 9) + 5,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() * 8 - 4),
        flipAngle: Math.random() * Math.PI,
        flipSpeed: Math.random() * 0.06 + 0.03,
        opacity: 0.9,
        fadeSpeed: Math.random() * 0.018 + 0.012,
        color: color
      });
    }
  }

  drawPetalShape(ctx, size, color, scaleX = 1) {
    ctx.save();
    ctx.scale(scaleX, 1);

    ctx.beginPath();
    if (color.type === 'leaf') {
      // Slender eucalyptus leaf
      ctx.moveTo(0, -size * 1.2);
      ctx.quadraticCurveTo(size * 0.5, 0, 0, size * 1.2);
      ctx.quadraticCurveTo(-size * 0.5, 0, 0, -size * 1.2);
    } else {
      // Soft curved rose petal
      ctx.moveTo(0, -size);
      ctx.bezierCurveTo(size * 0.8, -size * 0.5, size * 0.85, size * 0.5, 0, size);
      ctx.bezierCurveTo(-size * 0.85, size * 0.5, -size * 0.8, -size * 0.5, 0, -size);
    }
    ctx.closePath();

    ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
    ctx.fill();

    // Subtle central vein
    ctx.beginPath();
    ctx.moveTo(0, -size * 0.7);
    ctx.lineTo(0, size * 0.6);
    ctx.strokeStyle = `rgba(255, 255, 255, ${color.a * 0.4})`;
    ctx.lineWidth = 0.8;
    ctx.stroke();

    ctx.restore();
  }

  animate() {
    if (!this.isRunning) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // 1. Floating ambient petals
    for (let i = 0; i < this.petals.length; i++) {
      const p = this.petals[i];

      p.swayAngle += p.swaySpeed;
      p.flipAngle += p.flipSpeed;
      p.x += Math.sin(p.swayAngle) * p.sway + p.speedX;
      p.y += p.speedY;
      p.rotation += p.rotationSpeed;

      const scaleX = Math.cos(p.flipAngle);

      if (p.y > this.canvas.height + 30) {
        p.y = -30;
        p.x = Math.random() * this.canvas.width;
      }
      if (p.x < -30) p.x = this.canvas.width + 25;
      if (p.x > this.canvas.width + 30) p.x = -25;

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate(p.rotation * Math.PI / 180);
      this.drawPetalShape(this.ctx, p.size, p.color, scaleX);
      this.ctx.restore();
    }

    // 2. Burst celebration particles
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
      this.drawPetalShape(this.ctx, bp.size, bp.color, scaleX);
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
