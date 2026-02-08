// Smooth Scroll Animations for Liverpool FC Dashboard

class ScrollAnimations {
  constructor() {
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    this.init();
  }

  init() {
    this.addAnimationClasses();
    this.setupObserver();
    this.setupSmoothScroll();
  }

  addAnimationClasses() {
    // Add animation classes to elements
    const cards = document.querySelectorAll('.card, .stat-card');
    cards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
      card.setAttribute('data-animate', 'true');
    });

    const hero = document.querySelector('.hero');
    if (hero) {
      hero.style.opacity = '0';
      hero.style.transform = 'translateY(20px)';
      hero.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      hero.setAttribute('data-animate', 'true');
    }

    const tabs = document.querySelector('.tabs');
    if (tabs) {
      tabs.style.opacity = '0';
      tabs.style.transform = 'translateY(30px)';
      tabs.style.transition = 'opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s';
      tabs.setAttribute('data-animate', 'true');
    }
  }

  setupObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, this.observerOptions);

    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach(element => observer.observe(element));
  }

  setupSmoothScroll() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }
}

// Initialize animations when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new ScrollAnimations());
} else {
  new ScrollAnimations();
}
