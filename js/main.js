// ─── SCROLL REVEAL ────────────────────────────────────────────
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  (entries) => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  }),
  { threshold: 0.12 }
);
reveals.forEach(el => observer.observe(el));

// ─── LANGUAGE TOGGLE ──────────────────────────────────────────
const langBtns = document.querySelectorAll('.lang-btn');
langBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    langBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const lang = btn.dataset.lang;
    document.querySelectorAll('[data-en]').forEach(el => {
      el.textContent = lang === 'fr' ? el.dataset.fr : el.dataset.en;
    });
  });
});

// ─── NAV ACTIVE STATE ──────────────────────────────────────────
const sections = document.querySelectorAll('section[id], #hero');
const navLinks = document.querySelectorAll('.nav-links a');
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(a => a.style.color = '');
        const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
        if (active) active.style.color = 'var(--ink)';
      }
    });
  },
  { threshold: 0.4 }
);
sections.forEach(s => sectionObserver.observe(s));

// ─── STAGGER GRID REVEALS ──────────────────────────────────────
document.querySelectorAll('.skills-grid .skill-category, .projects-grid .project-card').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.08}s`;
  el.classList.add('reveal');
  observer.observe(el);
});

// ─── MODALS ────────────────────────────────────────────────────
function openModal(id) {
  document.getElementById(id).classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow = '';
}
function closeModalOutside(event, id) {
  if (event.target === document.getElementById(id)) closeModal(id);
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(m => {
      m.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
});