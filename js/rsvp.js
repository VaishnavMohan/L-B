/**
 * ===================================================================
 * GUEST BLESSINGS WALL & TRANSPORTATION RSVP
 * Dr. Keerthana & Dr. Sarath — September 13, 2026
 * ===================================================================
 */

class WeddingTravelRSVPManager {
  constructor() {
    this.form = document.getElementById('travel-rsvp-form');
    this.blessingsWall = document.getElementById('blessings-wall');
    this.whatsappBtn = document.getElementById('btn-whatsapp-travel-rsvp');

    // Manifest Modal Elements
    this.btnOpenManifest = document.getElementById('btn-open-travel-manifest');
    this.btnCloseManifest = document.getElementById('btn-close-travel-modal');
    this.manifestModal = document.getElementById('travel-manifest-modal');
    this.btnDownloadCsv = document.getElementById('btn-download-travel-csv');
    this.btnClearData = document.getElementById('btn-clear-travel-data');

    this.statTotal = document.getElementById('stat-total-guests');
    this.statAttending = document.getElementById('stat-attending-count');
    this.statTransport = document.getElementById('stat-transport-needed');
    this.tableBody = document.getElementById('travel-table-body');

    this.config = window.WEDDING_CONFIG || {};
    this.travelStorageKey = 'wedding_travel_manifest_keerthana_sarath';
    this.blessingsStorageKey = 'wedding_blessings_keerthana_sarath';

    this.init();
  }

  init() {
    this.renderBlessings();
    this.bindFormSubmit();
    this.bindWhatsAppDispatch();
    this.bindManifestModal();
  }

  /* ── 1. Form Submission & Storage ─────────────────────────────── */
  bindFormSubmit() {
    if (!this.form) return;

    this.form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = (document.getElementById('guest-name')?.value || '').trim();
      const phone = (document.getElementById('guest-phone')?.value || '').trim();
      const message = (document.getElementById('guest-message')?.value || '').trim();
      const attendance = document.querySelector('input[name="attendance"]:checked')?.value || 'yes';
      const transportation = document.querySelector('input[name="transportation"]:checked')?.value || 'no';

      if (!name || !message) {
        alert("Please enter your name and heartfelt blessing!");
        return;
      }

      // Save Entry
      const entry = {
        id: Date.now(),
        name,
        phone,
        attendance: attendance === 'yes' ? 'Attending 🎉' : 'Declined 💌',
        transportation: attendance === 'yes' ? (transportation === 'yes' ? 'Yes, Needed 🚌' : 'No (Self) 🚗') : 'N/A',
        message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      this.saveTravelEntry(entry);
      this.saveBlessing({ name, message, time: 'Just now' });
      this.renderBlessings();

      // Celebration Petals
      if (window.petalSystem) {
        window.petalSystem.burst(window.innerWidth / 2, window.innerHeight * 0.7, 45);
      }

      if (window.showToast) {
        window.showToast("🌸 Thank you! Your RSVP has been confirmed.");
      }

      // Reset form fields
      this.form.reset();
      const attYes = document.getElementById('att-yes');
      const transNo = document.getElementById('trans-no');
      if (attYes) attYes.checked = true;
      if (transNo) transNo.checked = true;
    });
  }

  /* ── 2. WhatsApp Direct Dispatch ──────────────────────────────── */
  bindWhatsAppDispatch() {
    if (!this.whatsappBtn) return;

    this.whatsappBtn.addEventListener('click', () => {
      const name = (document.getElementById('guest-name')?.value || 'Guest').trim();
      const phone = (document.getElementById('guest-phone')?.value || 'Not provided').trim();
      const attendance = document.querySelector('input[name="attendance"]:checked')?.value || 'yes';
      const transportation = document.querySelector('input[name="transportation"]:checked')?.value || 'no';
      const message = (document.getElementById('guest-message')?.value || 'Heartiest congratulations!').trim();

      const hostPhone = (this.config.couple?.bride?.formattedPhone) || "9446162155";

      let text = `🌸 *WEDDING RSVP & TRANSPORTATION* 🌸\n\n`;
      text += `*Couple:* Dr. Keerthana & Dr. Sarath\n`;
      text += `*Wedding Date:* Sunday, 13 September 2026\n`;
      text += `*Guest / Family:* ${name}\n`;
      text += `*Contact Phone:* ${phone}\n`;
      text += `*Attendance:* ${attendance === 'yes' ? 'Joyfully Attending 🎉' : 'Regretfully Declining 💌'}\n`;
      
      if (attendance === 'yes') {
        text += `*Transportation Needed:* ${transportation === 'yes' ? 'Yes, Need Transportation 🚌' : 'No, Traveling by Self 🚗'}\n\n`;
      } else {
        text += `\n`;
      }

      text += `*Blessing Message:* "${message}"\n\n`;
      text += `_Sent from Keerthana & Sarath Wedding Portal_ ✨`;

      const url = `https://api.whatsapp.com/send?phone=91${hostPhone}&text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');
    });
  }

  /* ── 3. Storage Helpers ───────────────────────────────────────── */
  getStoredTravelEntries() {
    try {
      const data = localStorage.getItem(this.travelStorageKey);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  saveTravelEntry(entry) {
    const list = this.getStoredTravelEntries();
    list.unshift(entry);
    try {
      localStorage.setItem(this.travelStorageKey, JSON.stringify(list));
    } catch (e) {
      console.warn("Could not save travel manifest", e);
    }
  }

  getStoredBlessings() {
    try {
      const data = localStorage.getItem(this.blessingsStorageKey);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  saveBlessing(blessing) {
    const list = this.getStoredBlessings();
    list.unshift(blessing);
    try {
      localStorage.setItem(this.blessingsStorageKey, JSON.stringify(list));
    } catch (e) {
      console.warn("Could not save blessing", e);
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

  /* ── 4. Travel Manifest Admin Modal & CSV Export ──────────────── */
  bindManifestModal() {
    if (!this.btnOpenManifest || !this.manifestModal) return;

    this.btnOpenManifest.addEventListener('click', () => {
      this.renderManifestModal();
      this.manifestModal.classList.add('show');
    });

    if (this.btnCloseManifest) {
      this.btnCloseManifest.addEventListener('click', () => {
        this.manifestModal.classList.remove('show');
      });
    }

    this.manifestModal.addEventListener('click', (e) => {
      if (e.target === this.manifestModal) {
        this.manifestModal.classList.remove('show');
      }
    });

    if (this.btnDownloadCsv) {
      this.btnDownloadCsv.addEventListener('click', () => this.downloadCSV());
    }

    if (this.btnClearData) {
      this.btnClearData.addEventListener('click', () => {
        if (confirm("Clear local guest RSVP list?")) {
          localStorage.removeItem(this.travelStorageKey);
          this.renderManifestModal();
        }
      });
    }
  }

  renderManifestModal() {
    const entries = this.getStoredTravelEntries();
    
    // Stats calculation
    let totalGuests = entries.length;
    let attending = 0;
    let transportNeeded = 0;

    entries.forEach(e => {
      if (e.attendance.includes('Attending')) attending++;
      if (e.transportation && e.transportation.includes('Yes')) transportNeeded++;
    });

    if (this.statTotal) this.statTotal.textContent = totalGuests;
    if (this.statAttending) this.statAttending.textContent = attending;
    if (this.statTransport) this.statTransport.textContent = transportNeeded;

    if (!this.tableBody) return;
    this.tableBody.innerHTML = '';

    if (entries.length === 0) {
      this.tableBody.innerHTML = `
        <tr>
          <td colspan="5" style="text-align: center; color: var(--text-light); padding: 24px;">
            No RSVP responses submitted yet.
          </td>
        </tr>
      `;
      return;
    }

    entries.forEach(e => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td style="font-weight: 600; color: var(--text-cream);">${e.name}</td>
        <td><a href="tel:${e.phone}" style="color: var(--gold-dark); text-decoration: underline;">${e.phone}</a></td>
        <td>${e.attendance}</td>
        <td style="font-weight: 700; color: ${e.transportation.includes('Yes') ? 'var(--gold-primary)' : 'var(--text-light)'};">${e.transportation}</td>
        <td style="font-size: 0.76rem; font-style: italic;">“${e.message}”</td>
      `;
      this.tableBody.appendChild(row);
    });
  }

  downloadCSV() {
    const entries = this.getStoredTravelEntries();
    if (entries.length === 0) {
      alert("No RSVP responses to export yet!");
      return;
    }

    const headers = ['Guest Name', 'Contact Phone', 'Attendance', 'Transportation Needed', 'Blessing Message'];
    
    const rows = entries.map(e => [
      `"${(e.name || '').replace(/"/g, '""')}"`,
      `"${(e.phone || '').replace(/"/g, '""')}"`,
      `"${(e.attendance || '').replace(/"/g, '""')}"`,
      `"${(e.transportation || '').replace(/"/g, '""')}"`,
      `"${(e.message || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Wedding_Guest_RSVP_List_Keerthana_Sarath_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

// Global initialization
window.weddingTravelRSVP = null;
document.addEventListener('DOMContentLoaded', () => {
  window.weddingTravelRSVP = new WeddingTravelRSVPManager();
});
