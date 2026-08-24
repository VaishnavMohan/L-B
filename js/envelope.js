/**
 * ===================================================================
 * ROYAL GRAND PALACE GATEWAY (THE ROYAL KAVADAM)
 * Interactive 3D Temple Doors Opening Sequencer & Particle Burst
 * ===================================================================
 */

// Ensure browser does not restore previous scroll position on refresh
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', () => {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;

  const overlay = document.getElementById('envelope-overlay');
  const stage = document.querySelector('.gateway-stage');
  const frame = document.querySelector('.gateway-frame');
  const lock = document.querySelector('.central-monogram-lock');
  const tapBtn = document.querySelector('.gateway-tap-btn');

  if (!overlay) return;

  let hasOpened = false;

  /* ── 1. 3D Perspective Tilt on Mouse Movement ────────────────── */
  if (stage && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    overlay.addEventListener('mousemove', (e) => {
      if (hasOpened) return;
      const rect = stage.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) / (window.innerWidth / 2);
      const deltaY = (e.clientY - centerY) / (window.innerHeight / 2);

      const rotateY = deltaX * 12; // Max 12 deg
      const rotateX = -deltaY * 10; // Max 10 deg

      if (frame) {
        frame.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
      }
    });

    overlay.addEventListener('mouseleave', () => {
      if (frame && !hasOpened) {
        frame.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)';
      }
    });
  }

  /* ── 2. Grand Gateway Unlock & Opening Sequence ───────────────── */
  function openRoyalGateway(e) {
    if (hasOpened) return;
    hasOpened = true;

    // Force scroll to top immediately upon opening
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Reset frame tilt transform for clean 3D door swing
    if (frame) {
      frame.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)';
    }

    // A. Add opening state class to trigger door swing & god-rays
    overlay.classList.add('opening');

    // B. Trigger Golden Shockwave Wave
    const shockwave = document.createElement('div');
    shockwave.className = 'gateway-shockwave fire';
    overlay.appendChild(shockwave);

    // C. Launch Radial Golden Sparks Explosion
    launchGatewaySparks();

    // D. Start Background Music ("O Rangrez") & Chime
    if (window.weddingAudio) {
      window.weddingAudio.play();
    }

    // E. Shower of Fresh Rose & Marigold Petals from Sanctum Doorway
    if (window.petalSystem) {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight * 0.45;

      // Multi-wave petal burst
      setTimeout(() => window.petalSystem.burst(cx, cy, 50), 250);
      setTimeout(() => window.petalSystem.burst(cx - 70, cy - 40, 35), 500);
      setTimeout(() => window.petalSystem.burst(cx + 70, cy - 40, 35), 500);
      setTimeout(() => window.petalSystem.burst(cx, cy - 80, 40), 850);
    }

    // F. Smooth Dissolve into Digital Wedding Invitation Card (Always Top)
    setTimeout(() => {
      overlay.classList.add('opened');
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      // Trigger scroll animations for visible sections
      if (window.revealSections) {
        window.revealSections();
      }
    }, 1400);
  }

  /* ── 3. Golden Sparks Explosion Generator ────────────────────── */
  function launchGatewaySparks() {
    const sparksContainer = document.createElement('div');
    sparksContainer.className = 'gateway-sparks-container';
    overlay.appendChild(sparksContainer);

    const colors = ['#FFF3B0', '#FFD700', '#FF8F1F', '#FFFFFF', '#FFA726'];
    const sparkCount = 38;

    for (let i = 0; i < sparkCount; i++) {
      const spark = document.createElement('div');
      spark.className = 'gateway-spark-particle';

      const angle = (Math.PI * 2 * i) / sparkCount + (Math.random() - 0.5) * 0.4;
      const distance = 80 + Math.random() * 240;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;
      const size = 3 + Math.random() * 5;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const delay = Math.random() * 0.2;

      spark.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        box-shadow: 0 0 10px ${color}, 0 0 20px ${color};
        --tx: ${tx}px;
        --ty: ${ty}px;
        animation-delay: ${delay}s;
      `;

      sparksContainer.appendChild(spark);
    }

    // Remove particles from DOM after animation finishes
    setTimeout(() => sparksContainer.remove(), 1600);
  }

  // Bind click & touch triggers
  if (lock) {
    lock.addEventListener('click', openRoyalGateway);
  }
  if (tapBtn) {
    tapBtn.addEventListener('click', openRoyalGateway);
  }
  if (stage) {
    stage.addEventListener('click', openRoyalGateway);
  }
});
