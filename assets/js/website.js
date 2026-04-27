// =========== SIDEBAR MENU ===========

const burger = document.getElementById("burger");
const closeSidebarBtn = document.getElementById("closeSidebar");
const sidebar = document.getElementById("sidebar");

function openSidebar() {
    sidebar.classList.add("active");
    burger.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
}

function closeSidebar() {
    sidebar.classList.remove("active");
    burger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
}

burger.addEventListener("click", openSidebar);
closeSidebarBtn.addEventListener("click", closeSidebar);

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeSidebar();
});

// =========== TITLES ===========

const lang = document.documentElement.lang || 'fr';

const translations = {
    fr: {
        words1: ['Créer', 'Concevoir', 'Construire', 'Imaginer'],
        words2: ['Identité', 'Interface', 'Expérience', 'Résultat'],
    },
    en: {
        words1: ['Create', 'Design', 'Build', 'Imagine'],
        words2: ['Identity', 'Interface', 'Experience', 'Result'],
    }
};

const WORDS_1 = translations[lang].words1;
const WORDS_2 = translations[lang].words2;

function buildRow(id, words) {
    const row = document.getElementById(id);
    if (!row) return;
    for (let i = 0; i < 8; i++) {
        words.forEach(w => {
            const span = document.createElement('span');
            span.className = 'ka-marquee__item';
            span.innerHTML = `${w}<span class="ka-marquee__dot"></span>`;
            row.appendChild(span);
        });
    }
}

buildRow('row1', WORDS_1);
buildRow('row2', WORDS_2);

const rows = [
    { el: document.getElementById('row1'), dir: 1, speed: 0.35 },
    { el: document.getElementById('row2'), dir: -1, speed: 0.5 },
];

const pos = [0, -260];
let lastY = window.scrollY, delta = 0, raf = null, autoRaf = null;
const BASE = 0.28;

function half(el) { return el.scrollWidth / 2; }

function applyPos(i) {
    const h = half(rows[i].el);
    if (pos[i] > 0) pos[i] -= h;
    if (pos[i] < -h) pos[i] += h;
    rows[i].el.style.transform = `translateX(${pos[i]}px)`;
}

function tick() {
    rows.forEach((r, i) => { pos[i] += delta * r.dir * r.speed; applyPos(i); });
    delta *= 0.88;
    if (Math.abs(delta) > 0.05) raf = requestAnimationFrame(tick);
    else { raf = null; startAuto(); }
}

function autoTick() {
    rows.forEach((r, i) => { pos[i] -= BASE * (i === 0 ? 1 : -1); applyPos(i); });
    autoRaf = requestAnimationFrame(autoTick);
}

function startAuto() { if (!autoRaf) autoRaf = requestAnimationFrame(autoTick); }
function stopAuto() { if (autoRaf) { cancelAnimationFrame(autoRaf); autoRaf = null; } }

startAuto();

window.addEventListener('scroll', () => {
    const y = window.scrollY;
    delta += (y - lastY) * 1.5;
    lastY = y;
    stopAuto();
    if (!raf) raf = requestAnimationFrame(tick);
}, { passive: true });

// =========== ANIMATIONS ===========

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(({ target, isIntersecting }) => {
    if (isIntersecting) {
      target.classList.add('is-visible');
      revealObserver.unobserve(target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('[class*="ka-reveal-"]')
  .forEach(el => revealObserver.observe(el));