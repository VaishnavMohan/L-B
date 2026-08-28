/**
 * ===================================================================
 * LIVE WEDDING COUNTDOWN & CALENDAR INTEGRATION
 * Ashin & Vrinda — Sunday, September 06, 2026 (1202 Chingam 21)
 * ===================================================================
 */

class WeddingCountdown {
  constructor() {
    this.daysEl = document.getElementById('cd-days');
    this.hoursEl = document.getElementById('cd-hours');
    this.minutesEl = document.getElementById('cd-minutes');
    this.secondsEl = document.getElementById('cd-seconds');

    this.googleCalBtn = document.getElementById('add-google-cal');
    this.icalBtn = document.getElementById('add-ical');

    this.config = (window.WEDDING_CONFIG && window.WEDDING_CONFIG.event) ? window.WEDDING_CONFIG.event : {
      targetDate: "2026-09-06T11:59:00"
    };

    this.targetTime = new Date(this.config.targetDate).getTime();
    this.timerInterval = null;

    this.init();
  }

  init() {
    this.update();
    this.timerInterval = setInterval(() => this.update(), 1000);

    if (this.googleCalBtn) {
      this.googleCalBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openGoogleCalendar();
      });
    }

    if (this.icalBtn) {
      this.icalBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.downloadICal();
      });
    }
  }

  update() {
    const now = new Date().getTime();
    const distance = this.targetTime - now;

    if (distance < 0) {
      if (this.daysEl) this.daysEl.textContent = "00";
      if (this.hoursEl) this.hoursEl.textContent = "00";
      if (this.minutesEl) this.minutesEl.textContent = "00";
      if (this.secondsEl) this.secondsEl.textContent = "00";
      clearInterval(this.timerInterval);
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (this.daysEl) this.daysEl.textContent = String(days).padStart(2, '0');
    if (this.hoursEl) this.hoursEl.textContent = String(hours).padStart(2, '0');
    if (this.minutesEl) this.minutesEl.textContent = String(minutes).padStart(2, '0');
    if (this.secondsEl) this.secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  openGoogleCalendar() {
    const cal = this.config.calendar || {};
    const title = encodeURIComponent(cal.title || "Wedding of Ashin & Vrinda");
    const details = encodeURIComponent(cal.description || "Marriage of Ashin & Vrinda on Sunday, 06 September 2026 (1202 Chingam 21) at Pet Rose Event Centre Pathammile, Puthencruz. Muhurtham: Between 11.59 a.m. and 12.20 p.m. and for Lunch thereafter.");
    const location = encodeURIComponent(cal.location || "Pet Rose Event Centre, Pathammile, Puthencruz, Kerala");
    const dates = `${cal.startIso || '20260906T115900'}/${cal.endIso || '20260906T153000'}`;

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}&ctz=Asia/Kolkata`;
    window.open(url, '_blank');
  }

  downloadICal() {
    const cal = this.config.calendar || {};
    const title = cal.title || "Wedding of Ashin & Vrinda";
    const details = cal.description || "Marriage of Ashin & Vrinda on Sunday, 06 September 2026 (1202 Chingam 21) at Pet Rose Event Centre Pathammile, Puthencruz. Muhurtham: Between 11.59 a.m. and 12.20 p.m. and for Lunch thereafter.";
    const location = cal.location || "Pet Rose Event Centre, Pathammile, Puthencruz, Kerala";

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Ashin and Vrinda Wedding//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'SUMMARY:' + title,
      'DESCRIPTION:' + details,
      'LOCATION:' + location,
      'DTSTART;TZID=Asia/Kolkata:20260906T115900',
      'DTEND;TZID=Asia/Kolkata:20260906T153000',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Ashin_Vrinda_Wedding.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

// Global instance
window.weddingCountdown = null;
document.addEventListener('DOMContentLoaded', () => {
  window.weddingCountdown = new WeddingCountdown();
});
