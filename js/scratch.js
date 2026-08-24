/**
 * ===================================================================
 * SCRATCH-TO-REVEAL DATE CANVAS & PETAL POP TRIGGER
 * ===================================================================
 */

class ScratchCardReveal {
  constructor() {
    this.canvas = document.getElementById('scratch-canvas');
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.container = this.canvas.parentElement;
    this.progressBar = document.querySelector('.scratch-progress-bar');
    this.autoRevealBtn = document.querySelector('.btn-auto-reveal');
    
    this.config = window.WEDDING_CONFIG ? window.WEDDING_CONFIG.scratchCard : {
      scratchPercentToUnlock: 40
    };

    this.isDrawing = false;
    this.isRevealed = false;
    this.brushRadius = 24;
    this.lastPoint = null;

    this.init();
  }

  init() {
    this.setupCanvas();
    this.bindEvents();

    if (this.autoRevealBtn) {
      this.autoRevealBtn.addEventListener('click', () => this.revealAll(true));
    }

    window.addEventListener('resize', () => {
      if (!this.isRevealed) {
        this.setupCanvas();
      }
    }, { passive: true });
  }

  setupCanvas() {
    const rect = this.container.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;

    // Create luxurious gold foil gradient
    const grad = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
    grad.addColorStop(0, '#C5A059');
    grad.addColorStop(0.2, '#EEDB9E');
    grad.addColorStop(0.5, '#D4AF37');
    grad.addColorStop(0.8, '#AA771C');
    grad.addColorStop(1, '#8A6016');

    this.ctx.fillStyle = grad;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Add gold glitter/sparkle pattern
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * this.canvas.width;
      const y = Math.random() * this.canvas.height;
      const r = Math.random() * 2;
      this.ctx.beginPath();
      this.ctx.arc(x, y, r, 0, Math.PI * 2);
      this.ctx.fill();
    }

    // Draw gold foil border & text
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(10, 10, this.canvas.width - 20, this.canvas.height - 20);

    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillStyle = '#2B211B';
    this.ctx.font = '600 13px Montserrat, sans-serif';
    this.ctx.fillText("✨ SCRATCH TO REVEAL DATE ✨", this.canvas.width / 2, this.canvas.height / 2 - 10);
    
    this.ctx.font = 'italic 12px "Cormorant Garamond", serif';
    this.ctx.fillStyle = '#4A3B2C';
    this.ctx.fillText("Touch & drag here", this.canvas.width / 2, this.canvas.height / 2 + 12);
  }

  getPointerPos(e) {
    const rect = this.canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  }

  scratch(x, y) {
    if (this.isRevealed) return;

    this.ctx.globalCompositeOperation = 'destination-out';
    this.ctx.beginPath();

    if (this.lastPoint) {
      // Connect line between previous and current touch point for smooth scratching
      this.ctx.lineWidth = this.brushRadius * 2;
      this.ctx.lineCap = 'round';
      this.ctx.lineJoin = 'round';
      this.ctx.moveTo(this.lastPoint.x, this.lastPoint.y);
      this.ctx.lineTo(x, y);
      this.ctx.stroke();
    } else {
      this.ctx.arc(x, y, this.brushRadius, 0, Math.PI * 2);
      this.ctx.fill();
    }

    this.lastPoint = { x, y };

    // Check scratched percentage throttled
    this.checkScratchedPercentage();
  }

  bindEvents() {
    // Touch Events
    this.canvas.addEventListener('touchstart', (e) => {
      if (this.isRevealed) return;
      e.preventDefault();
      this.isDrawing = true;
      this.lastPoint = this.getPointerPos(e);
      this.scratch(this.lastPoint.x, this.lastPoint.y);
    }, { passive: false });

    this.canvas.addEventListener('touchmove', (e) => {
      if (!this.isDrawing || this.isRevealed) return;
      e.preventDefault();
      const pos = this.getPointerPos(e);
      this.scratch(pos.x, pos.y);
    }, { passive: false });

    const endTouch = () => {
      this.isDrawing = false;
      this.lastPoint = null;
    };
    this.canvas.addEventListener('touchend', endTouch);
    this.canvas.addEventListener('touchcancel', endTouch);

    // Mouse Events
    this.canvas.addEventListener('mousedown', (e) => {
      if (this.isRevealed) return;
      this.isDrawing = true;
      this.lastPoint = this.getPointerPos(e);
      this.scratch(this.lastPoint.x, this.lastPoint.y);
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.isDrawing || this.isRevealed) return;
      const pos = this.getPointerPos(e);
      this.scratch(pos.x, pos.y);
    });

    window.addEventListener('mouseup', () => {
      this.isDrawing = false;
      this.lastPoint = null;
    });
  }

  checkScratchedPercentage() {
    if (this.isRevealed) return;

    // Sample pixels for fast performance
    const sampleStep = 16;
    const imgData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const pixels = imgData.data;
    let transparentCount = 0;
    let totalSamples = 0;

    for (let i = 3; i < pixels.length; i += 4 * sampleStep) {
      totalSamples++;
      if (pixels[i] === 0) {
        transparentCount++;
      }
    }

    const percentage = Math.round((transparentCount / totalSamples) * 100);

    if (this.progressBar) {
      this.progressBar.style.width = `${Math.min(100, percentage * 2.5)}%`;
    }

    if (percentage >= this.config.scratchPercentToUnlock) {
      this.revealAll(false);
    }
  }

  revealAll(immediate = false) {
    if (this.isRevealed) return;
    this.isRevealed = true;

    this.canvas.classList.add('fade-out');

    if (this.progressBar) {
      this.progressBar.style.width = '100%';
    }

    if (this.autoRevealBtn) {
      this.autoRevealBtn.style.display = 'none';
    }

    // Play celebration audio & chime
    if (window.weddingAudio) {
      window.weddingAudio.playChimeSound();
    }

    // Trigger Flower Petal & Gold Sparkle Explosion!
    if (window.petalSystem) {
      const rect = this.canvas.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      window.petalSystem.burst(centerX, centerY, 60);
      setTimeout(() => {
        window.petalSystem.burst(centerX - 60, centerY - 20, 30);
        window.petalSystem.burst(centerX + 60, centerY - 20, 30);
      }, 250);
    }
  }
}

// Global instance
window.scratchCard = null;
document.addEventListener('DOMContentLoaded', () => {
  window.scratchCard = new ScratchCardReveal();
});
