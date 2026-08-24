/**
 * ===================================================================
 * MAIN APPLICATION CONTROLLER, THEME ENGINE & TIMELINE RENDERER
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Dual Theme Engine (Light / Dark Mode + Auto System Detection)
  initThemeManager();

  // 2. Render Royal Ceremony Timeline & Sacred Rituals (No image banners!)
  renderCeremonyTimeline();

  // 3. Setup Scroll Reveal Animations
  setupScrollReveal();

  // 4. Setup Floating Action Buttons (Theme Toggle, WhatsApp Share, Copy Address, Petals toggle)
  setupActionButtons();
});

/**
 * ===================================================================
 * THEME ENGINE: Auto Device Detection + Instant Smooth Switching
 * ===================================================================
 */
function initThemeManager() {
  const root = document.documentElement;
  const body = document.body;
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeToggleIcon = document.getElementById('theme-toggle-icon');
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');

  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  const savedTheme = localStorage.getItem('wedding_theme_preference');

  function applyTheme(theme, showNotification = false) {
    root.setAttribute('data-theme', theme);
    body.setAttribute('data-theme', theme);

    if (theme === 'dark') {
      if (themeToggleIcon) themeToggleIcon.textContent = '☀️';
      if (metaThemeColor) metaThemeColor.setAttribute('content', '#0F0A0A');
      if (showNotification) showToast("🌙 Switched to Dark Theme");
    } else {
      if (themeToggleIcon) themeToggleIcon.textContent = '🌙';
      if (metaThemeColor) metaThemeColor.setAttribute('content', '#FAF7F2');
      if (showNotification) showToast("☀️ Switched to Light Theme");
    }
  }

  // Determine initial theme
  let activeTheme = savedTheme;
  if (!activeTheme) {
    activeTheme = systemPrefersDark.matches ? 'dark' : 'light';
  }
  applyTheme(activeTheme, false);

  // Listen for system theme change (only if user hasn't chosen manually)
  systemPrefersDark.addEventListener('change', (e) => {
    if (!localStorage.getItem('wedding_theme_preference')) {
      applyTheme(e.matches ? 'dark' : 'light', true);
    }
  });

  // Manual Toggle Button
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') || (systemPrefersDark.matches ? 'dark' : 'light');
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      
      localStorage.setItem('wedding_theme_preference', nextTheme);
      applyTheme(nextTheme, true);
    });
  }
}

/**
 * ===================================================================
 * RENDER PREMIUM CEREMONY CARDS — Beautiful SVG Art + Animated Cards
 * ===================================================================
 */
function renderCeremonyTimeline() {
  const container = document.getElementById('events-cards-container');
  if (!container || !window.WEDDING_CONFIG || !window.WEDDING_CONFIG.events) return;
  if (container.children.length > 0) return; // Keep high-speed static HTML

  container.className = 'ceremony-timeline';
  container.innerHTML = '';


  // Beautiful inline SVG art illustrations for each ceremony type
  const ceremonyArt = {
    lamp: `
      <svg viewBox="0 0 120 90" xmlns="http://www.w3.org/2000/svg" class="ceremony-art-svg">
        <defs>
          <radialGradient id="flameGlow" cx="50%" cy="30%" r="50%">
            <stop offset="0%" stop-color="#FFF8C8" stop-opacity="0.9"/>
            <stop offset="50%" stop-color="#FFB347" stop-opacity="0.6"/>
            <stop offset="100%" stop-color="#FF6B35" stop-opacity="0"/>
          </radialGradient>
          <linearGradient id="lampBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFF3B0"/>
            <stop offset="50%" stop-color="#D4AF37"/>
            <stop offset="100%" stop-color="#9A7432"/>
          </linearGradient>
          <radialGradient id="thaliGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#FFF8E1"/>
            <stop offset="70%" stop-color="#D4AF37"/>
            <stop offset="100%" stop-color="#8B6914"/>
          </radialGradient>
        </defs>
        <!-- Glow behind flame -->
        <ellipse cx="60" cy="35" rx="22" ry="22" fill="url(#flameGlow)"/>
        <!-- Flame -->
        <path d="M60 12 C55 20 52 28 54 34 C57 40 63 40 66 34 C68 28 65 20 60 12Z" fill="#FFE066"/>
        <path d="M60 16 C57 22 55 29 57 33 C59 37 62 36 63 32 C65 27 63 21 60 16Z" fill="#FF9A3C"/>
        <path d="M60 20 C58 25 58 30 60 32 C62 34 63 31 63 28 C63 24 62 21 60 20Z" fill="#FFF5C0"/>
        <!-- Diya body -->
        <ellipse cx="60" cy="44" rx="16" ry="5" fill="url(#lampBodyGrad)"/>
        <path d="M44 44 Q44 56 60 57 Q76 56 76 44Z" fill="#C5903A"/>
        <path d="M44 44 Q44 50 60 51 Q76 50 76 44Z" fill="#E8B955"/>
        <!-- Wick dot -->
        <circle cx="60" cy="40" r="2" fill="#5D3A1A"/>
        <!-- Thali plate below -->
        <ellipse cx="60" cy="70" rx="26" ry="8" fill="none" stroke="url(#thaliGrad)" stroke-width="2"/>
        <ellipse cx="60" cy="70" rx="22" ry="6" fill="rgba(212,175,55,0.08)"/>
        <!-- Flower petals on thali -->
        <circle cx="46" cy="70" r="3" fill="#FF9CAF" opacity="0.8"/>
        <circle cx="53" cy="67" r="2.5" fill="#FFB347" opacity="0.8"/>
        <circle cx="60" cy="66" r="3" fill="#FF9CAF" opacity="0.9"/>
        <circle cx="67" cy="67" r="2.5" fill="#FFD700" opacity="0.8"/>
        <circle cx="74" cy="70" r="3" fill="#FF9CAF" opacity="0.8"/>
        <!-- Rangoli dots -->
        <circle cx="60" cy="82" r="1.5" fill="rgba(212,175,55,0.4)"/>
        <circle cx="51" cy="80" r="1" fill="rgba(212,175,55,0.3)"/>
        <circle cx="69" cy="80" r="1" fill="rgba(212,175,55,0.3)"/>
      </svg>`,

    feast: `
      <svg viewBox="0 0 120 90" xmlns="http://www.w3.org/2000/svg" class="ceremony-art-svg">
        <defs>
          <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#52A855"/>
            <stop offset="50%" stop-color="#2D8B30"/>
            <stop offset="100%" stop-color="#1A6B1D"/>
          </linearGradient>
          <linearGradient id="riceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFFFF0"/>
            <stop offset="100%" stop-color="#F5EBB5"/>
          </linearGradient>
          <radialGradient id="payasamGrad" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stop-color="#FFF8D0"/>
            <stop offset="100%" stop-color="#E8C97A"/>
          </radialGradient>
        </defs>
        <!-- Banana leaf -->
        <ellipse cx="60" cy="60" rx="48" ry="24" fill="url(#leafGrad)" rx="48" ry="24"/>
        <path d="M12 60 Q60 35 108 60" stroke="#1A5C1D" stroke-width="1.5" fill="none"/>
        <!-- Leaf veins -->
        <path d="M30 60 Q35 50 42 48" stroke="#1A5C1D" stroke-width="0.8" fill="none" opacity="0.6"/>
        <path d="M50 60 Q52 46 58 44" stroke="#1A5C1D" stroke-width="0.8" fill="none" opacity="0.6"/>
        <path d="M70 60 Q72 46 78 48" stroke="#1A5C1D" stroke-width="0.8" fill="none" opacity="0.6"/>
        <path d="M90 60 Q88 50 82 48" stroke="#1A5C1D" stroke-width="0.8" fill="none" opacity="0.6"/>
        <!-- Rice mound -->
        <ellipse cx="42" cy="54" rx="14" ry="8" fill="url(#riceGrad)"/>
        <!-- Payasam bowl -->
        <ellipse cx="80" cy="53" rx="12" ry="5" fill="#8B6914"/>
        <ellipse cx="80" cy="50" rx="12" ry="5" fill="#B8902A"/>
        <ellipse cx="80" cy="49" rx="11" ry="4" fill="url(#payasamGrad)"/>
        <!-- Papadom circle -->
        <circle cx="60" cy="54" r="6" fill="none" stroke="#D4AF37" stroke-width="1.5" stroke-dasharray="2 1"/>
        <circle cx="60" cy="54" r="4" fill="rgba(212,175,55,0.3)"/>
        <!-- Small curry bowls -->
        <ellipse cx="28" cy="52" rx="6" ry="3" fill="#FF6B35" opacity="0.85"/>
        <ellipse cx="92" cy="52" rx="5" ry="2.5" fill="#FFB347" opacity="0.85"/>
        <!-- Banana fruit -->
        <path d="M55 75 Q60 70 65 73 Q63 80 58 80 Q54 79 55 75Z" fill="#FFE142"/>
        <!-- Gold rim detail -->
        <ellipse cx="60" cy="60" rx="49" ry="25" fill="none" stroke="rgba(212,175,55,0.4)" stroke-width="1"/>
      </svg>`
  };

  window.WEDDING_CONFIG.events.forEach((ev, index) => {
    const card = document.createElement('div');
    card.className = 'ceremony-event-card reveal-on-scroll';

    const artSvg = ceremonyArt[ev.iconSvg] || ceremonyArt.lamp;
    const ritualPillsHtml = (ev.rituals || []).map(r => `<span class="ritual-pill">✦ ${r}</span>`).join('');

    card.innerHTML = `
      <div class="ceremony-art-banner">${artSvg}</div>

      <div class="ceremony-card-body">
        <div class="ceremony-card-header">
          <div class="ceremony-icon-badge-group">
            <div class="ceremony-step-num">${String(index + 1).padStart(2, '0')}</div>
            <div>
              <h3 class="ceremony-main-title">${ev.title}</h3>
              <p class="ceremony-subtitle">${ev.subtitle}</p>
            </div>
          </div>
          <span class="ceremony-time-badge">⏱ ${ev.time}</span>
        </div>

        <div class="ceremony-sanskrit-verse">${ev.sanskritQuote}</div>

        <p class="ceremony-desc-text">${ev.description}</p>

        <div class="ceremony-rituals-list">
          ${ritualPillsHtml}
        </div>

        <div class="ceremony-action-bar">
          <span class="ceremony-location-tag">📍 ${ev.locationName}</span>
          <a href="${ev.mapsUrl}" target="_blank" rel="noopener" class="btn-luxury btn-outline-gold" style="padding: 8px 18px; font-size: 0.78rem;">
            <span>🗺️</span> View on Map
          </a>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

/**
 * ===================================================================
 * SCROLL REVEAL OBSERVER
 * ===================================================================
 */
function setupScrollReveal() {
  const observerOptions = {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  window.revealSections = () => {
    document.querySelectorAll('.reveal-on-scroll:not(.is-revealed)').forEach(el => {
      observer.observe(el);
    });
  };

  window.revealSections();
}

/**
 * ===================================================================
 * ACTION BUTTONS SETUP
 * ===================================================================
 */
function setupActionButtons() {
  // 1. Copy Address button
  const copyBtn = document.getElementById('btn-copy-address');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const address = (window.WEDDING_CONFIG && window.WEDDING_CONFIG.venue && window.WEDDING_CONFIG.venue.fullAddress) || 
        "Puzhayoram Gardens Convention Centre, Eravimangalam, Nadathara, Thrissur, Kerala - 680751";
      
      navigator.clipboard.writeText(address).then(() => {
        showToast("📍 Venue address copied to clipboard!");
      }).catch(() => {
        const tempInput = document.createElement('input');
        tempInput.value = address;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showToast("📍 Venue address copied to clipboard!");
      });
    });
  }

  // 2. WhatsApp Share Button
  const shareBtn = document.getElementById('share-whatsapp-btn');
  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      const url = window.location.href;
      const text = encodeURIComponent(
        `🌸 *Royal Wedding Invitation*\n*Dr. Keerthana & Dr. Sarath*\n\nTogether with our families, we joyfully invite you to celebrate our wedding on *Sunday, 13 September 2026* at *Puzhayoram Gardens Convention Centre, Thrissur*.\n\n✨ *Tap the link below to open our royal invitation:*\n${url}`
      );
      window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
    });
  }


  // 3. Petals Toggle Button
  const petalsToggleBtn = document.getElementById('petals-toggle-btn');
  if (petalsToggleBtn) {
    petalsToggleBtn.addEventListener('click', () => {
      if (window.petalSystem) {
        const isRunning = window.petalSystem.toggle();
        showToast(isRunning ? "🌸 Petals animation resumed" : "🌸 Petals animation paused");
      }
    });
  }

  // 4. Scroll to Top
  const scrollTopBtn = document.getElementById('scroll-top-btn');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}


}

/**
 * ===================================================================
 * TOAST NOTIFICATION UTILITY
 * ===================================================================
 */
function showToast(message) {
  let toast = document.querySelector('.toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}
window.showToast = showToast;
