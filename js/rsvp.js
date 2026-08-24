/**
 * ===================================================================
 * GUEST BLESSINGS WALL & 1-CLICK WHATSAPP RSVP
 * Dr. Keerthana & Dr. Sarath — September 13, 2026
 * ===================================================================
 */

class WeddingRSVPManager {
  constructor() {
    this.blessingsForm = document.getElementById('blessings-form');
    this.blessingsWall = document.getElementById('blessings-wall');
    this.whatsappRsvpBtn = document.getElementById('btn-whatsapp-rsvp');
    
    this.config = window.WEDDING_CONFIG || {};
    this.storageKey = 'wedding_blessings_keerthana_sarath';

    this.defaultBlessings = [
      {
        name: "Dr. Anand & Family",
        message: "Wishing you both a lifetime of happiness, endless love, and joy together! Congratulations Dr. Keerthana & Dr. Sarath!",
        time: "1 hour ago"
      }
    ];

    this.init();
  }

  init() {
    this.renderBlessings();

    if (this.blessingsForm) {
      this.blessingsForm.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    if (this.whatsappRsvpBtn) {
      this.whatsappRsvpBtn.addEventListener('click', () => this.sendWhatsAppRSVP());
    }
  }

  getStoredBlessings() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : this.defaultBlessings;
    } catch (e) {
      return this.defaultBlessings;
    }
  }

  saveBlessings(blessings) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(blessings));
    } catch (e) {
      console.warn("Could not save to localStorage", e);
    }
  }

  renderBlessings() {
    if (!this.blessingsWall) return;

    const blessings = this.getStoredBlessings();
    this.blessingsWall.innerHTML = '';

    blessings.forEach(b => {
      const card = document.createElement('div');
      card.className = 'blessing-card';
      card.innerHTML = `
        <div class="blessing-author">
          <span>${b.name}</span>
          <span class="blessing-time">${b.time}</span>
        </div>
        <p class="blessing-text">“${b.message}”</p>
      `;
      this.blessingsWall.appendChild(card);
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const nameInput = document.getElementById('guest-name');
    const messageInput = document.getElementById('guest-message');

    if (!nameInput || !messageInput) return;

    const name = nameInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !message) {
      alert("Please fill in your name and a sweet blessing message!");
      return;
    }

    const newBlessing = {
      name: name,
      message: message,
      time: "Just now"
    };

    const current = this.getStoredBlessings();
    current.unshift(newBlessing);
    this.saveBlessings(current);
    this.renderBlessings();

    // Trigger celebration petals
    if (window.petalSystem) {
      window.petalSystem.burst(window.innerWidth / 2, window.innerHeight * 0.7, 45);
    }

    if (window.showToast) {
      window.showToast("🌸 Thank you for your heartfelt blessing!");
    }

    // Reset Form
    nameInput.value = '';
    messageInput.value = '';
  }

  sendWhatsAppRSVP() {
    const hostPhone = (this.config.couple?.bride?.formattedPhone) || "9446162155";
    const text = encodeURIComponent(
      `Dear Keerthana & Sarath,\n\nWe are overjoyed to receive your wedding invitation! We will gladly be attending the auspicious wedding on Sunday, 13 September 2026 at Puzhayoram Gardens Convention Centre, Thrissur.\n\nHeartiest congratulations and our warmest blessings! 🌸✨`
    );

    const whatsappUrl = `https://api.whatsapp.com/send?phone=91${hostPhone}&text=${text}`;
    window.open(whatsappUrl, '_blank');
  }
}

// Global instance
window.weddingRSVP = null;
document.addEventListener('DOMContentLoaded', () => {
  window.weddingRSVP = new WeddingRSVPManager();
});
