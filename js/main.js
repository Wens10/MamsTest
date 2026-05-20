/* ════════════════════════════════════════════
   MAMADOU DIAKITÉ — main.js
   ════════════════════════════════════════════ */

// ─── ANNÉE FOOTER ───
document.getElementById('year').textContent = new Date().getFullYear();

// ─── NAVBAR SCROLL ───
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ─── BURGER MENU ───
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

// Fermer au clic sur un lien
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ─── REVEAL ON SCROLL ───
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger pour les éléments siblings
      const siblings = entry.target.parentElement.querySelectorAll('.reveal:not(.visible)');
      siblings.forEach((el, idx) => {
        if (el === entry.target) {
          setTimeout(() => el.classList.add('visible'), idx * 80);
        }
      });
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ─── COMPTEURS ANIMÉS ───
const counters = document.querySelectorAll('.stat__number[data-target]');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Easing out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);

    if (target >= 1000) {
      el.textContent = current.toLocaleString('fr-FR');
    } else {
      el.textContent = current;
    }

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target >= 1000 ? target.toLocaleString('fr-FR') : target;
    }
  }

  requestAnimationFrame(update);
}

// ─── SMOOTH SCROLL (backup pour anciens navigateurs) ───
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = navbar.offsetHeight + 20;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ─── FORMULAIRE NEWSLETTER ───
const newsletterForm = document.getElementById('newsletterForm');
const formSuccess = document.getElementById('formSuccess');

if (newsletterForm) {
  newsletterForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = newsletterForm.querySelector('button[type="submit"]');
    const originalText = btn.textContent;

    // Validation simple
    const email = newsletterForm.querySelector('#email').value;
    if (!email || !email.includes('@')) {
      shakeInput(newsletterForm.querySelector('#email'));
      return;
    }

    // Simulation d'envoi (remplacer par vraie API)
    btn.textContent = 'Inscription en cours…';
    btn.disabled = true;

    await new Promise(resolve => setTimeout(resolve, 1200));

    // Succès
    newsletterForm.style.display = 'none';
    formSuccess.style.display = 'block';

    // Log des données (à remplacer par intégration API réelle)
    const formData = new FormData(newsletterForm);
    const data = Object.fromEntries(formData.entries());
    console.info('Newsletter signup:', data);
  });
}

function shakeInput(input) {
  input.style.animation = 'shake 0.4s ease';
  input.addEventListener('animationend', () => {
    input.style.animation = '';
  }, { once: true });
}

// ─── STYLE ANIMATION SHAKE ───
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-8px); }
    40% { transform: translateX(8px); }
    60% { transform: translateX(-6px); }
    80% { transform: translateX(6px); }
  }
`;
document.head.appendChild(shakeStyle);

// ─── PORTFOLIO CARDS STAGGER ───
const portfolioCards = document.querySelectorAll('.portfolio-card');
const portfolioObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const cards = entry.target.parentElement.querySelectorAll('.portfolio-card');
      cards.forEach((card, i) => {
        setTimeout(() => card.classList.add('visible'), i * 100);
      });
      portfolioObserver.disconnect();
    }
  });
}, { threshold: 0.1 });

if (portfolioCards.length > 0) {
  portfolioObserver.observe(portfolioCards[0]);
}

// ─── ACTIVE NAV LINK ON SCROLL ───
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav__link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinkEls.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => sectionObserver.observe(section));

// ─── NAV LINK ACTIVE STYLE ───
const activeStyle = document.createElement('style');
activeStyle.textContent = `.nav__link.active { color: var(--gold); } .nav__link.active::after { width: 100%; }`;
document.head.appendChild(activeStyle);
