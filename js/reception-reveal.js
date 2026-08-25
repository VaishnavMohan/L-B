/**
 * ===================================================================
 * RECEPTION VIP GALA PASS - INTERACTIVE CELEBRATION
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  const toastBtn = document.getElementById('ticket-toast-btn');
  const ticketCard = document.getElementById('reception-gala-ticket');

  function triggerReceptionToast() {
    if (window.triggerSparkleCelebration) {
      window.triggerSparkleCelebration();
    }

    if (window.showToast) {
      window.showToast("🥂 Cheering for Sarath & Keerthana! 🥂");
    }
  }

  if (toastBtn) {
    toastBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      triggerReceptionToast();
    });
  }

  if (ticketCard) {
    ticketCard.addEventListener('click', () => {
      triggerReceptionToast();
    });
  }
});
