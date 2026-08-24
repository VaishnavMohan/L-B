/**
 * ===================================================================
 * BACKGROUND AUDIO CONTROLLER
 * ===================================================================
 */

class WeddingAudioManager {
  constructor() {
    this.audio = document.getElementById('bg-music');
    this.isPlaying = false;
    this.equalizerElement = document.querySelector('.music-equalizer');
    this.toggleButton = document.getElementById('music-toggle-btn');
    this.config = (window.WEDDING_CONFIG && window.WEDDING_CONFIG.audio) || {};
    
    this.init();
  }

  init() {
    if (!this.audio) {
      this.audio = new Audio();
      this.audio.id = 'bg-music';
      this.audio.loop = true;
      document.body.appendChild(this.audio);
    }
    
    this.audio.src = this.config.src || 'assets/audio/wedding-music.mp3';
    this.audio.loop = true;
    this.audio.volume = this.config.defaultVolume || 0.8;
    this.audio.preload = 'auto';

    if (this.toggleButton) {
      this.toggleButton.addEventListener('click', () => this.togglePlay());
    }

    this.audio.addEventListener('play', () => {
      this.isPlaying = true;
      this.updateUI(true);
    });

    this.audio.addEventListener('pause', () => {
      this.isPlaying = false;
      this.updateUI(false);
    });
  }

  play() {
    if (!this.audio) return;
    const playPromise = this.audio.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          this.isPlaying = true;
          this.updateUI(true);
        })
        .catch((error) => {
          console.log("Audio play caught:", error);
        });
    }
  }

  pause() {
    if (!this.audio) return;
    this.audio.pause();
    this.isPlaying = false;
    this.updateUI(false);
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  updateUI(playing) {
    if (this.equalizerElement) {
      if (playing) {
        this.equalizerElement.classList.add('music-playing');
      } else {
        this.equalizerElement.classList.remove('music-playing');
      }
    }
    if (this.toggleButton) {
      this.toggleButton.setAttribute('aria-label', playing ? 'Pause Music' : 'Play Music');
      this.toggleButton.setAttribute('title', playing ? 'Pause Music' : 'Play Music');
    }
  }

  // Play celebration sparkle / chime sound using Web Audio API (Zero lag, works 100% offline!)
  playChimeSound() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;

      const ctx = new AudioContext();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const notes = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50];
      const now = ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0, now + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.2, now + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.9);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.9);
      });
    } catch (e) {
      console.warn("Chime synth error:", e);
    }
  }
}

// Global instance
window.weddingAudio = null;
document.addEventListener('DOMContentLoaded', () => {
  window.weddingAudio = new WeddingAudioManager();
});
