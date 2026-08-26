/**
 * ===================================================================
 * GUEST BLESSINGS WALL & WHATSAPP WISHES (SIMPLE & CLEAN)
 * Lintu & Basil — September 06, 2026
 * ===================================================================
 */

class WeddingRSVPManager {
  constructor() {
    this.blessingsForm = document.getElementById('blessings-form');
    this.blessingsWall = document.getElementById('blessings-wall');
    this.whatsappWishBtn = document.getElementById('btn-whatsapp-wish');
    
    this.config = window.WEDDING_CONFIG || {};
    this.storageKey = 'wedding_blessings_lintu_basil';

    // Sample initial heartfelt blessing
    this.defaultBlessings = [
      {
        id: "blessing-init-1",
        name: "George & Sani Family",
        message: "May God abundantly bless Lintu & Basil with endless joy, peace, and eternal love on this sacred new beginning!",
        timestamp: Date.now() - 3600000 * 5,
        likes: 12
      }
    ];

    this.init();
  }

  init() {
    this.renderBlessings();

    if (this.blessingsForm) {
      this.blessingsForm.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    if (this.whatsappWishBtn) {
      this.whatsappWishBtn.addEventListener('click', () => this.sendWhatsAppWish());
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

  handleSubmit(e) {
    e.preventDefault();

    const nameInput = document.getElementById('guest-name');
    const messageInput = document.getElementById('guest-message');
    const submitBtn = document.getElementById('btn-post-blessing');

    if (!nameInput || !messageInput) return;

    const name = nameInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !message) {
      if (window.showToast) window.showToast("Please enter your name and blessing message");
      return;
    }

    // Button loading state
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>✨</span> Posting Blessing...`;
    }

    setTimeout(() => {
      const newBlessing = {
        id: 'blessing-' + Date.now(),
        name: name,
        message: message,
        timestamp: Date.now(),
        likes: 1
      };

      const list = this.getStoredBlessings();
      list.unshift(newBlessing);
      this.saveBlessings(list);
      this.renderBlessings();

      // Trigger celebratory heart/petal shower
      this.triggerBlessingCelebration();

      // Reset form
      nameInput.value = '';
      messageInput.value = '';

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span>🌸</span> Post Blessing on Wall`;
      }

      if (window.showToast) {
        window.showToast("✨ Thank you for your warm blessing!");
      }

      // Smooth scroll to top of blessings wall
      if (this.blessingsWall) {
        this.blessingsWall.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 350);
  }

  likeBlessing(id) {
    const list = this.getStoredBlessings();
    const target = list.find(b => b.id === id);
    if (target) {
      target.likes = (target.likes || 0) + 1;
      this.saveBlessings(list);
      this.renderBlessings();
      if (window.magicSparkleTrail) {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        window.magicSparkleTrail.burst(cx, cy, 20);
      }
    }
  }

  deleteBlessing(id) {
    let list = this.getStoredBlessings();
    list = list.filter(b => b.id !== id);
    this.saveBlessings(list);
    this.renderBlessings();
    if (window.showToast) {
      window.showToast("Blessing message removed");
    }
  }

  renderBlessings() {
    if (!this.blessingsWall) return;

    const blessings = this.getStoredBlessings();
    this.blessingsWall.innerHTML = '';

    if (blessings.length === 0) {
      this.blessingsWall.innerHTML = `
        <div class="empty-blessings-state">
          <span>🌸</span>
          <p>Be the first to share your warm love &amp; blessings for Lintu &amp; Basil!</p>
        </div>
      `;
      return;
    }

    blessings.forEach((b) => {
      const card = document.createElement('div');
      card.className = 'blessing-card';
      
      const initials = (b.name || 'G')
        .split(' ')
        .map(w => w[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();

      const timeAgo = this.formatTimeAgo(b.timestamp);

      card.innerHTML = `
        <div class="blessing-card-header">
          <div class="blessing-avatar">${initials}</div>
          <div class="blessing-author-info">
            <h4 class="blessing-author-name">${this.escapeHtml(b.name)}</h4>
            <span class="blessing-time">${timeAgo}</span>
          </div>
        </div>
        <p class="blessing-card-text">“${this.escapeHtml(b.message)}”</p>
        <div class="blessing-card-footer">
          <button class="btn-like-blessing" type="button" data-id="${b.id}" aria-label="Like blessing">
            <span>❤️</span> <span class="like-count">${b.likes || 1}</span>
          </button>
          <button class="btn-delete-blessing" type="button" data-id="${b.id}" aria-label="Delete message" title="Remove">
            ✕
          </button>
        </div>
      `;

      // Bind like & delete actions
      const likeBtn = card.querySelector('.btn-like-blessing');
      if (likeBtn) {
        likeBtn.addEventListener('click', () => this.likeBlessing(b.id));
      }

      const delBtn = card.querySelector('.btn-delete-blessing');
      if (delBtn) {
        delBtn.addEventListener('click', () => this.deleteBlessing(b.id));
      }

      this.blessingsWall.appendChild(card);
    });
  }

  sendWhatsAppWish() {
    const nameInput = document.getElementById('guest-name');
    const msgInput = document.getElementById('guest-message');
    const guestName = nameInput && nameInput.value.trim() ? nameInput.value.trim() : "Well Wisher";
    const guestMsg = msgInput && msgInput.value.trim() 
      ? msgInput.value.trim() 
      : "Wishing you both a lifetime of love, joy and God's abundant blessings!";

    const text = encodeURIComponent(
      `🌸 *Heartfelt Blessings for Lintu & Basil's Engagement* 🌸\n\n` +
      `👤 *From:* ${guestName}\n` +
      `💌 *Blessing:* "${guestMsg}"\n\n` +
      `✨ _"My beloved is mine, and I am His" (Song of Solomon 2:16)_ ✨\n` +
      `📅 *Date:* Sunday, 06 September 2026\n` +
      `⛪ *Venue:* St. Mary's Church Auditorium, Mulavoor`
    );

    const phone = "917907751171"; // Basil T. G. (Ph: 7907751171)
    const url = `https://api.whatsapp.com/send?phone=${phone}&text=${text}`;
    window.open(url, '_blank');
  }

  triggerBlessingCelebration() {
    if (window.petalSystem) {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight * 0.6;
      window.petalSystem.burst(cx, cy, 35);
    }
    if (window.magicSparkleTrail) {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight * 0.6;
      window.magicSparkleTrail.burst(cx, cy, 30);
    }
  }

  formatTimeAgo(timestamp) {
    if (!timestamp) return 'Just now';
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  }

  escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  window.weddingRSVP = new WeddingRSVPManager();
});
