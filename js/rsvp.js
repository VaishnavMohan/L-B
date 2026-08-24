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

    // No test blessings by default
    this.defaultBlessings = [];

    this.init();
  }

  init() {
    // Automatically purge any dummy "test" / "das" entry from previous runs
    this.cleanTestEntries();
    this.renderBlessings();

    if (this.blessingsForm) {
      this.blessingsForm.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    if (this.whatsappRsvpBtn) {
      this.whatsappRsvpBtn.addEventListener('click', () => this.sendWhatsAppRSVP());
    }
  }

  cleanTestEntries() {
    try {
      let stored = this.getStoredBlessings();
      // Remove any test or single word dummy messages
      stored = stored.filter(b => {
        const name = (b.name || '').trim().toLowerCase();
        const msg = (b.message || '').trim().toLowerCase();
        return name !== 'test' && msg !== 'das' && msg.length > 2;
      });
      this.saveBlessings(stored);
    } catch (e) {
      // Ignore
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

  deleteBlessing(index) {
    let list = this.getStoredBlessings();
    list.splice(index, 1);
    this.saveBlessings(list);
    this.renderBlessings();
    if (window.showToast) {
      window.showToast("Message removed");
    }
  }

  renderBlessings() {
    if (!this.blessingsWall) return;

    const blessings = this.getStoredBlessings();
    this.blessingsWall.innerHTML = '';

    if (blessings.length === 0) {
      this.blessingsWall.innerHTML = `
        <div style="text-align: center; color: var(--text-light); font-size: 0.82rem; font-style: italic; padding: 6px 10px; margin-top: 4px;">
          Be the first to send your warm blessing to Keerthana &amp; Sarath! 🌸
        </div>
      `;
      return;
    }


    blessings.forEach((b, idx) => {
      const card = document.createElement('div');
      card.className = 'blessing-card';
      card.innerHTML = `
        <div class="blessing-author">
          <span>${b.name}</span>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="blessing-time">${b.time}</span>
            <button type="button" class="btn-delete-blessing" title="Delete Blessing" style="background:none; border:none; color:var(--text-light); font-size:0.8rem; cursor:pointer; opacity:0.6;">✕</button>
          </div>
        </div>
        <p class="blessing-text">“${b.message}”</p>
      `;

      const delBtn = card.querySelector('.btn-delete-blessing');
      if (delBtn) {
        delBtn.addEventListener('click', () => this.deleteBlessing(idx));
      }

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

    // Trigger celebration petal pop
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
