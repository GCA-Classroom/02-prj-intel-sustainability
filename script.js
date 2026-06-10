// Small script to reveal hero and cards with a staggered animation
document.addEventListener('DOMContentLoaded', function () {
  // hero intro
  const hero = document.querySelector('.hero-inner');
  if (hero) {
    setTimeout(() => hero.classList.add('is-visible'), 120);
  }

  // cards reveal with IntersectionObserver and stagger using CSS var --i
  const cards = Array.from(document.querySelectorAll('.card'));
  cards.forEach((c, i) => c.style.setProperty('--i', i));

  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    cards.forEach(c => obs.observe(c));
  } else {
    // fallback: reveal all
    cards.forEach((c, i) => setTimeout(() => c.classList.add('is-visible'), i * 80));
  }
});
