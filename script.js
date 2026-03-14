class Typewriter {
  constructor(el, phrases, period) {
    this.el = el;
    this.phrases = phrases;
    this.period = period || 2000;
    
    this.currentText = '';
    this.phraseIndex = 0;
    this.isDeleting = false;
    
    this.tick(); 
  }

  tick() {
    const fullText = this.phrases[this.phraseIndex % this.phrases.length];

    if (this.isDeleting) {
      this.currentText = fullText.substring(0, this.currentText.length - 1);
    } else {
      this.currentText = fullText.substring(0, this.currentText.length + 1);
    }

    this.el.innerHTML = `<span class="wrap">${this.currentText}</span>`;

    let delta = 130 - Math.random() * 75;
    if (this.isDeleting) delta /= 2;

    if (!this.isDeleting && this.currentText === fullText) {
      delta = this.period;  
      this.isDeleting = true;
    } else if (this.isDeleting && this.currentText === '') {
      this.isDeleting = false;
      this.phraseIndex++;
      delta = 500;
    }

    setTimeout(() => this.tick(), delta);
  }
}

// Event Listener
document.addEventListener('DOMContentLoaded', () => {
  const el = document.querySelector('.typewrite');
  const phrases = JSON.parse(el.getAttribute('data-type'));
  new Typewriter(el, phrases, 2000);
});