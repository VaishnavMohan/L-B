/**
 * ===================================================================
 * ROYAL GRAND PALACE GATEWAY (THE ROYAL KAVADAM)
 * Interactive 3D Temple Doors Opening Sequencer & Particle Burst
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
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

    // F. Smooth Dissolve into Digital Wedding Invitation Card
    setTimeout(() => {
      overlay.classList.add('opened');

      // Trigger scroll animations for visible sections
      if (window.revealSections) {
        window.revealSections();
      }
    }, 1500);

    // Save state in sessionStorage
    sessionStorage.setItem('royal_gateway_opened', 'true');
  }

  /* ── 3. Golden Sparks Explosion Generator ────────────────────── */
  function launchGatewaySparks() {
    const sparksContainer = document.createElement('div');
    sparksContainer.className = 'gateway-sparks-container';
    overlay.appendChild(sparksContainer);

    const count = 36;
    for (let i = 0; i < count; i++) {
      const spark = document.createElement('div');
      spark.className = 'gateway-spark';
      const angle = (360 / count) * i + (Math.random() * 15 - 7.5);
      const dist = 140 + Math.random() * 180;
      const size = 5 + Math.random() * 7;

      spark.style.cssText = `
        --angle: ${angle}deg;
        --dist: -${dist}px;
        width: ${size}px;
        height: ${size}px;
      `;
      sparksContainer.appendChild(spark);

      requestAnimationFrame(() => {
        setTimeout(() => spark.classList.add('animate'), i * 8);
      });
    }

    setTimeout(() => sparksContainer.remove(), 2000);
  }

  /* ── 4. Event Listeners (Tap lock, button, or anywhere) ────────── */
  if (lock) lock.addEventListener('click', openRoyalGateway);
  if (tapBtn) tapBtn.addEventListener('click', openRoyalGateway);
  overlay.addEventListener('click', openRoyalGateway);
});
