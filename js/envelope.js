/**
 * ===================================================================
 * ROYAL WEDDING PRESENTATION BOX — 3D UNBOXING CONTROLLER
 * Ashin & Vrinda — September 06, 2026
 * ===================================================================
 */

// Ensure browser starts at top of page on reload
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', () => {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;

  const overlay = document.getElementById('envelope-overlay');
  const stage = document.querySelector('.unboxing-stage');
  const waxSeal = document.querySelector('.box-wax-seal');
  const tapBtn = document.querySelector('.unboxing-tap-btn');

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

      const rotateY = deltaX * 8;
      const rotateX = -deltaY * 7;

      stage.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });

    overlay.addEventListener('mouseleave', () => {
      if (stage && !hasOpened) {
        stage.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)';
      }
    });
  }

  /* ── 2. Choreographed 3D Unboxing Sequence ───────────────────── */
  function startUnboxing(e) {
    if (hasOpened) return;
    hasOpened = true;

    // Reset scroll position immediately
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    if (stage) {
      stage.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)';
    }

    // A. Trigger Stage Opening Class (Crack Seal, Untie Ribbon, Swing Doors)
    overlay.classList.add('opening');

    const cx = window.innerWidth / 2;
    const cy = window.innerHeight * 0.48;

    // B. Stage 1: Golden Stardust & Magic Sparkle Flash
    if (window.magicSparkleTrail) {
      window.magicSparkleTrail.burst(cx, cy, 55);
      setTimeout(() => window.magicSparkleTrail.burst(cx, cy, 40), 180);
      setTimeout(() => window.magicSparkleTrail.burst(cx - 50, cy, 30), 380);
      setTimeout(() => window.magicSparkleTrail.burst(cx + 50, cy, 30), 380);
    }

    // C. Stage 2: Celebration Flower Petal Cascade
    if (window.petalSystem) {
      setTimeout(() => window.petalSystem.burst(cx, cy, 55), 250);
      setTimeout(() => window.petalSystem.burst(cx - 80, cy - 30, 35), 450);
      setTimeout(() => window.petalSystem.burst(cx + 80, cy - 30, 35), 450);
      setTimeout(() => window.petalSystem.burst(cx, cy - 60, 40), 650);
    }

    // D. Stage 3: Smooth Dissolve into Digital Invitation & Couple Photo
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
    elem.addEventListener('click', startUnboxing);
    elem.addEventListener('touchend', startUnboxing, { passive: true });
  });
});
