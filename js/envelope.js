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

    // C. Launch Canvas Golden Stardust & Fairy Sparkles in 360 degrees
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight * 0.45;

    if (window.magicSparkleTrail) {
      window.magicSparkleTrail.burst(cx, cy, 40);
      setTimeout(() => window.magicSparkleTrail.burst(cx, cy, 30), 300);
      setTimeout(() => window.magicSparkleTrail.burst(cx, cy, 25), 600);
    }

    // D. Start Background Music ("O Rangrez") & Chime
    if (window.weddingAudio) {
      window.weddingAudio.play();
    }

    // E. Shower of Fresh Rose & Marigold Petals from Sanctum Doorway
    if (window.petalSystem) {
      setTimeout(() => window.petalSystem.burst(cx, cy, 45), 200);
      setTimeout(() => window.petalSystem.burst(cx - 70, cy - 30, 30), 450);
      setTimeout(() => window.petalSystem.burst(cx + 70, cy - 30, 30), 450);
      setTimeout(() => window.petalSystem.burst(cx, cy - 60, 35), 750);
    }

    // F. Smooth Dissolve into Digital Wedding Invitation Card (Always Top)
    setTimeout(() => {
      overlay.classList.add('opened');
      document.body.classList.add('doors-opened');
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      // Reveal all cards instantly with zero delay
      document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        el.classList.add('is-revealed');
      });

      if (window.revealSections) {
        window.revealSections();
      }
    }, 1400);

  }


  // Bind click & touch triggers everywhere on the gateway
  const triggers = [lock, tapBtn, stage, overlay].filter(Boolean);
  triggers.forEach(elem => {
    elem.addEventListener('click', openRoyalGateway);
    elem.addEventListener('touchend', openRoyalGateway, { passive: true });
  });
});

