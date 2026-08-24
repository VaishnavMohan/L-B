/**
 * ===================================================================
 * INTERACTIVE PHOTO GALLERY & LIGHTBOX MODAL
 * ===================================================================
 */

class WeddingGallery {
  constructor() {
    this.modal = document.getElementById('gallery-lightbox');
    this.lightboxImg = document.getElementById('lightbox-image');
    this.lightboxCaption = document.getElementById('lightbox-caption');
    this.closeBtn = document.querySelector('.lightbox-close-btn');
    this.prevBtn = document.querySelector('.lightbox-nav-btn.prev');
    this.nextBtn = document.querySelector('.lightbox-nav-btn.next');
    this.galleryGrid = document.querySelector('.gallery-grid');

    this.currentIndex = 0;
    this.photos = (window.WEDDING_CONFIG && window.WEDDING_CONFIG.gallery) || [];

    this.touchStartX = 0;
    this.touchEndX = 0;

    this.init();
  }

  init() {
    this.renderGallery();
    this.bindEvents();
  }

  renderGallery() {
    if (!this.galleryGrid) return;
    this.galleryGrid.innerHTML = '';

    this.photos.forEach((photo, index) => {
      const item = document.createElement('div');
      item.className = 'gallery-item reveal-on-scroll';
      item.setAttribute('data-index', index);

      item.innerHTML = `
        <div class="gallery-thumb-wrapper">
          <img src="${photo.url}" alt="${photo.caption}" loading="lazy" />
          <div class="gallery-overlay">
            <span class="gallery-tag">${photo.tag || 'Forever'}</span>
          </div>
        </div>
        <div class="gallery-caption-preview">${photo.caption}</div>
      `;

      item.addEventListener('click', () => this.open(index));
      this.galleryGrid.appendChild(item);
    });
  }

  bindEvents() {
    if (!this.modal) return;

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.prev();
      });
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.next();
      });
    }

    // Backdrop click
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal || e.target.classList.contains('lightbox-content')) {
        this.close();
      }
    });

    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
      if (!this.modal.classList.contains('active')) return;
      if (e.key === 'Escape') this.close();
      if (e.key === 'ArrowLeft') this.prev();
      if (e.key === 'ArrowRight') this.next();
    });

    // Touch Swipe gestures for mobile
    this.modal.addEventListener('touchstart', (e) => {
      this.touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    this.modal.addEventListener('touchend', (e) => {
      this.touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
    }, { passive: true });
  }

  handleSwipe() {
    const diff = this.touchEndX - this.touchStartX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        this.prev();
      } else {
        this.next();
      }
    }
  }

  open(index) {
    if (!this.modal || !this.photos[index]) return;
    this.currentIndex = index;
    this.updateModalContent();
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  close() {
    if (!this.modal) return;
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.photos.length) % this.photos.length;
    this.updateModalContent();
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.photos.length;
    this.updateModalContent();
  }

  updateModalContent() {
    const photo = this.photos[this.currentIndex];
    if (!photo) return;

    this.lightboxImg.src = photo.url;
    this.lightboxImg.alt = photo.caption;
    this.lightboxCaption.textContent = photo.caption;
  }
}

// Global instance
window.weddingGallery = null;
document.addEventListener('DOMContentLoaded', () => {
  window.weddingGallery = new WeddingGallery();
});
