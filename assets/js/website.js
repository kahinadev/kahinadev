// =======================================
// HEADER
// ======================================= 

window.addEventListener('scroll', () => {
    document.querySelector('.ka-header').classList.toggle('is-sticky', window.scrollY > 0);
});

// =======================================
// SIDEBAR
// ======================================= 

// =========== INITIAL ===========

const burger = document.getElementById('burger');
const sidebar = document.getElementById('ka-sidebar');
const closeBtn = document.getElementById('closeSidebar');
const sidebarLinks = document.querySelectorAll('#ka-sidebar .ka-link');

// =========== OPEN SIDEBAR ===========

const openSidebar = () => {
    sidebar.classList.add('active');
    sidebar.setAttribute('aria-hidden', 'false');
    burger.setAttribute('aria-expanded', 'true');
}

// =========== CLOSE SIDEBAR ===========

const closeSidebar = () => {
    sidebar.classList.remove('active');
    sidebar.setAttribute('aria-hidden', 'true');
    burger.setAttribute('aria-expanded', 'false');
}

// =========== EVENT LISTENERS ===========

burger.addEventListener('click', openSidebar);
closeBtn.addEventListener('click', closeSidebar);

sidebarLinks.forEach(link => {
    link.addEventListener('click', closeSidebar);
});

document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !burger.contains(e.target)) {
        closeSidebar();
    }
});

// =======================================
// SERVICES CARD
// ======================================= 

// =========== INITIAL ===========

const servicesGrid = document.getElementById('servicesCard');
const serviceCards = Array.from(servicesGrid.querySelectorAll('.ka-card'));
const serviceCols = Array.from(servicesGrid.querySelectorAll('[class*="col-"]'));
const btnPrev = document.getElementById('arrowPrev');
const btnNext = document.getElementById('arrowNext');
const CARDS_COUNT = serviceCols.length;
const MOBILE_BREAKPOINT = 767;

let trackIndex = 1, currentIndex = 0, clonedCols = [], isAnimating = false, touchStartX = 0;


const isMobile = () => window.innerWidth <= MOBILE_BREAKPOINT;

const move = (animate) => {
    const colWidth = serviceCols[0].getBoundingClientRect().width + 8; // 8 = gap g-2 Bootstrap
    servicesGrid.style.transition = animate ? 'transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none';
    servicesGrid.style.transform = `translateX(-${trackIndex * colWidth}px)`;
};

const slide = (dir) => {
    if (isAnimating) return;
    isAnimating = true;
    trackIndex += dir;
    currentIndex = ((currentIndex + dir) % CARDS_COUNT + CARDS_COUNT) % CARDS_COUNT;
    move(true);
};

// =========== HOVER DESKTOP / TABLET ===========

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        if (isMobile()) return;
        servicesGrid.classList.add('has-hover');
        card.classList.add('is-hovered');
    });
    card.addEventListener('mouseleave', () => {
        if (isMobile()) return;
        servicesGrid.classList.remove('has-hover');
        card.classList.remove('is-hovered');
    });
});

// =========== SLIDE MOBILE ===========

const initCarousel = () => {
    clonedCols.forEach(c => c.remove());
    const firstClone = serviceCols[0].cloneNode(true);
    const lastClone = serviceCols[CARDS_COUNT - 1].cloneNode(true);
    [firstClone, lastClone].forEach(c => c.setAttribute('aria-hidden', 'true'));
    servicesGrid.insertBefore(lastClone, servicesGrid.firstChild);
    servicesGrid.appendChild(firstClone);
    clonedCols = [firstClone, lastClone];
    trackIndex = currentIndex + 1;
    move(false);
};

const destroyCarousel = () => {
    clonedCols.forEach(c => c.remove());
    clonedCols = [];
    servicesGrid.style.cssText = '';
};

servicesGrid.addEventListener('transitionend', () => {
    if (!isMobile()) return;
    if (trackIndex === 0) { trackIndex = CARDS_COUNT; move(false); }
    if (trackIndex === CARDS_COUNT + 1) { trackIndex = 1; move(false); }
    isAnimating = false;
});

btnPrev.addEventListener('click', () => slide(-1));
btnNext.addEventListener('click', () => slide(+1));

servicesGrid.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
servicesGrid.addEventListener('touchend', e => {
    if (!isMobile()) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) slide(dx < 0 ? 1 : -1);
});

// =========== RESIZE ===========

let wasMobile = false;

window.addEventListener('resize', () => {
    const now = isMobile();
    if (now && !wasMobile) { currentIndex = 0; initCarousel(); }
    if (!now && wasMobile) { destroyCarousel(); }
    if (now) { move(false); }
    wasMobile = now;
});

wasMobile = isMobile();
if (wasMobile) initCarousel();

// =======================================
// TITLES
// ======================================= 

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

// =======================================
// ANIMATIONS
// ======================================= 

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