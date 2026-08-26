/**
 * ===================================================================
 * MAIN APPLICATION CONTROLLER, THEME ENGINE & TIMELINE RENDERER
 * Lintu & Basil — September 06, 2026
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Dual Theme Engine (Light / Dark Mode)
  initThemeManager();

  // 2. Setup Scroll Reveal Animations
  setupScrollReveal();

  // 3. Setup Floating Action Buttons & Actions
  setupActionButtons();

  // 4. Setup Copy Address Button
  setupCopyAddress();
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
      if (metaThemeColor) metaThemeColor.setAttribute('content', '#16080B');
      if (showNotification) showToast("🌙 Switched to Velvet Noir Theme");
    } else {
      if (themeToggleIcon) themeToggleIcon.textContent = '🌙';
      if (metaThemeColor) metaThemeColor.setAttribute('content', '#FAF5EE');
      if (showNotification) showToast("☀️ Switched to Romantic Blush Theme");
    }
  }

  // Determine initial theme
  let activeTheme = savedTheme;
  if (!activeTheme) {
    activeTheme = systemPrefersDark.matches ? 'dark' : 'light';
  }
  applyTheme(activeTheme, false);

  // Listen for system theme changes
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
 * SCROLL REVEAL OBSERVER
 * ===================================================================
 */
function setupScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));

  window.revealSections = function() {
    revealElements.forEach(el => el.classList.add('is-revealed'));
  };
}

/**
 * ===================================================================
 * FLOATING ACTION BUTTONS
 * ===================================================================
 */
function setupActionButtons() {
  // 1. WhatsApp Share
  const shareBtn = document.getElementById('share-whatsapp-btn');
  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      const title = "🌸 Wedding Invitation: Lintu & Basil";
      const desc = "“My beloved is mine, and I am His” (Song of Solomon 2:16)\n\nTogether with their families, you are cordially invited to celebrate the engagement of Lintu & Basil on Sunday, 06 September 2026 at St. Mary's Church Auditorium, Mulavoor, Muvattupuzha at 11:30 AM and thereafter for lunch.\n\nTap to view the digital invitation card:";
      const url = window.location.href;
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(title + '\n\n' + desc + '\n' + url)}`;
      window.open(whatsappUrl, '_blank');
    });
  }

  // 2. Petals Shower Toggle
  const petalsToggleBtn = document.getElementById('petals-toggle-btn');
  if (petalsToggleBtn && window.petalSystem) {
    petalsToggleBtn.addEventListener('click', () => {
      const isRunning = window.petalSystem.toggle();
      petalsToggleBtn.style.opacity = isRunning ? '1' : '0.45';
      showToast(isRunning ? "🌸 Petals shower enabled" : "Petals shower paused");
    });
  }

  // 3. Scroll to Top
  const scrollTopBtn = document.getElementById('scroll-top-btn');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/**
 * ===================================================================
 * COPY ADDRESS TO CLIPBOARD
 * ===================================================================
 */
function setupCopyAddress() {
  const copyBtn = document.getElementById('btn-copy-address');
  if (!copyBtn) return;

  copyBtn.addEventListener('click', () => {
    const address = (window.WEDDING_CONFIG && window.WEDDING_CONFIG.venue && window.WEDDING_CONFIG.venue.fullAddress)
      ? window.WEDDING_CONFIG.venue.fullAddress
      : "St. Mary's Church Auditorium, Ponnirikaparamb, Mulavoor, Muvattupuzha, Kerala";

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(address).then(() => {
        showToast("📋 Venue address copied to clipboard!");
      }).catch(() => {
        fallbackCopyText(address);
      });
    } else {
      fallbackCopyText(address);
    }
  });
}

function fallbackCopyText(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-999999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    showToast("📋 Venue address copied!");
  } catch (err) {
    showToast("Unable to copy address");
  }
  document.body.removeChild(textArea);
}

/**
 * ===================================================================
 * TOAST NOTIFICATION UTILITY
 * ===================================================================
 */
window.showToast = function(message) {
  let toast = document.querySelector('.toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notice';
    toast.setAttribute('role', 'alert');
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  if (window._toastTimeout) {
    clearTimeout(window._toastTimeout);
  }

  window._toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
};
