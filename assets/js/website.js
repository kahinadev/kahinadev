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
// TITLES
// ======================================= 

document.addEventListener('DOMContentLoaded', () => {

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

    const WORDS_1 = translations[lang]?.words1 || translations.fr.words1;
    const WORDS_2 = translations[lang]?.words2 || translations.fr.words2;

    function buildRow(el, words) {
        for (let i = 0; i < 8; i++) {
            words.forEach(w => {
                const span = document.createElement('span');
                span.className = 'ka-marquee__item';
                span.innerHTML = `${w}<span class="ka-marquee__dot"></span>`;
                el.appendChild(span);
            });
        }
    }

    const row1 = document.querySelector('.ka-marquee__row--1');
    const row2 = document.querySelector('.ka-marquee__row--2');

    buildRow(row1, WORDS_1);
    buildRow(row2, WORDS_2);

    const rows = [
        { el: row1, dir: 1, speed: 0.35 },
        { el: row2, dir: -1, speed: 0.5 },
    ];

    const pos = [0, -260];
    let lastY = window.scrollY, delta = 0, raf = null, autoRaf = null;
    const BASE = 0.8;

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

});

// =======================================
// SLIDER SERVICES
// ======================================= 

document.addEventListener('DOMContentLoaded', () => {

    const track = document.querySelector('.ka-slider__track');
    const cards = document.querySelectorAll('.ka-slider__card');
    const dots = document.querySelectorAll('.ka-slider__dot');

    let current = 0;
    let startX = 0;
    let dragX = 0;
    let isDrag = false;

    function goTo(index) {
        current = Math.max(0, Math.min(index, cards.length - 1));

        const card = cards[current];
        const trackRect = track.parentElement.getBoundingClientRect();
        const offset = card.offsetLeft - (trackRect.width / 2 - card.offsetWidth / 2);

        track.style.transform = `translateX(${-offset}px)`;

        cards.forEach((c, i) => c.classList.toggle('is-active', i === current));
        dots.forEach((d, i) => d.classList.toggle('is-active', i === current));
    }

    dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

    track.addEventListener('mousedown', e => {
        isDrag = true;
        startX = e.clientX;
        track.classList.add('is-dragging');
    });

    window.addEventListener('mousemove', e => {
        if (!isDrag) return;
        dragX = e.clientX - startX;
    });

    window.addEventListener('mouseup', () => {
        if (!isDrag) return;
        isDrag = false;
        track.classList.remove('is-dragging');
        if (dragX < -50) goTo(current + 1);
        else if (dragX > 50) goTo(current - 1);
        else goTo(current);
        dragX = 0;
    });

    track.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchend', e => {
        dragX = e.changedTouches[0].clientX - startX;
        if (dragX < -50) goTo(current + 1);
        else if (dragX > 50) goTo(current - 1);
        dragX = 0;
    }, { passive: true });

    goTo(0);

});

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
}, { threshold: 0.25 });

document.querySelectorAll('[class*="ka-reveal-"]')
    .forEach(el => revealObserver.observe(el));