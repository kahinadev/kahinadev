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