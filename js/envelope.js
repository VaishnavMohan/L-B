/**
 * ===================================================================
 * LUXURY WAX SEAL ENVELOPE / WEDDING FOLIO
 * Interactive Wax Seal Breaking & Invitation Reveal
 * Lintu & Basil — September 06, 2026
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
  const stage = document.querySelector('.envelope-stage');
  const waxSeal = document.querySelector('.wax-seal-emblem');
  const tapBtn = document.querySelector('.envelope-open-btn');

  if (!overlay) return;

  let hasOpened = false;

  /* ── 1. 3D Perspective Tilt on Mouse / Device Movement ───────── */
  if (stage && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    overlay.addEventListener('mousemove', (e) => {
      if (hasOpened) return;
      const rect = stage.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) / (window.innerWidth / 2);
      const deltaY = (e.clientY - centerY) / (window.innerHeight / 2);

      const rotateY = deltaX * 10;
      const rotateX = -deltaY * 8;

      stage.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });

    overlay.addEventListener('mouseleave', () => {
      if (stage && !hasOpened) {
        stage.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)';
      }
    });
  }

  /* ── 2. Wax Seal Crack & Envelope Opening Sequence ───────────── */
  function openEnvelope(e) {
    if (hasOpened) return;
    hasOpened = true;

    // Force scroll to top immediately upon opening
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    if (stage) {
      stage.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)';
    }

    // A. Add opening state class
    overlay.classList.add('opening');

    // B. Launch Golden Stardust & Fairy Sparkles
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight * 0.45;

    if (window.magicSparkleTrail) {
      window.magicSparkleTrail.burst(cx, cy, 40);
      setTimeout(() => window.magicSparkleTrail.burst(cx, cy, 30), 250);
      setTimeout(() => window.magicSparkleTrail.burst(cx, cy, 25), 500);
    }

    // C. Shower of Fresh Rose & Sage Petals
    if (window.petalSystem) {
      setTimeout(() => window.petalSystem.burst(cx, cy, 45), 180);
      setTimeout(() => window.petalSystem.burst(cx - 80, cy - 30, 30), 380);
      setTimeout(() => window.petalSystem.burst(cx + 80, cy - 30, 30), 380);
      setTimeout(() => window.petalSystem.burst(cx, cy - 50, 35), 650);
    }

    // D. Smooth Dissolve into Digital Invitation
    setTimeout(() => {
      overlay.classList.add('opened');
      document.body.classList.add('envelope-opened');
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      // Reveal all cards instantly
      document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        el.classList.add('is-revealed');
      });

      if (window.revealSections) {
        window.revealSections();
      }
    }, 1100);
  }

  // Bind click & touch triggers
  const triggers = [waxSeal, tapBtn, stage, overlay].filter(Boolean);
  triggers.forEach(elem => {
    elem.addEventListener('click', openEnvelope);
    elem.addEventListener('touchend', openEnvelope, { passive: true });
  });
});
