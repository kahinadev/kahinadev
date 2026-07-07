// ===============================================
// SIDEBAR
// ===============================================

const burger = document.getElementById('burger');
const sidebar = document.getElementById('ka-sidebar');
const closeBtn = document.getElementById('closeSidebar');
const sidebarLinks = document.querySelectorAll('#ka-sidebar .ka-link');
const isEnglish = document.documentElement.lang === 'en';

const labels = {
    open: isEnglish ? 'Open navigation menu' : 'Ouvrir le menu de navigation',
    close: isEnglish ? 'Close navigation menu' : 'Fermer le menu de navigation'
};

// -----------------------------------------------
// Open
// -----------------------------------------------

const openSidebar = () => {
    sidebar.classList.add('active');
    sidebar.setAttribute('aria-hidden', 'false');
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', labels.close);
}

// -----------------------------------------------
// Close
// -----------------------------------------------

const closeSidebar = () => {
    sidebar.classList.remove('active');
    sidebar.setAttribute('aria-hidden', 'true');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', labels.open);
}

// -----------------------------------------------
// Event listeners
// -----------------------------------------------

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

// -----------------------------------------------
// Scramble
// -----------------------------------------------

const DURATION = 350;
const STEPS = 10;

function scramble(el) {
    const original = el.dataset.label || el.textContent.trim();
    const chars = original.replace(/ /g, '').split('');
    let frame = 0;

    if (!el.dataset.label) el.dataset.label = original;

    const interval = setInterval(() => {
        el.textContent = original
            .split('')
            .map((char, i) => {
                if (char === ' ') return ' ';
                if (i < Math.floor((frame / STEPS) * original.length)) return char;
                return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');

        frame++;

        if (frame > STEPS) {
            clearInterval(interval);
            el.textContent = original;
        }
    }, DURATION / STEPS);
}

sidebarLinks.forEach(link => {
    link.addEventListener('mouseenter', () => scramble(link));
});

const btns = document.querySelectorAll('.ka-btn');
btns.forEach(btn => {
    const label = btn.querySelector('.ka-btn__label') || btn;
    btn.addEventListener('mouseenter', () => scramble(label));
});

// ===============================================
// ANIMATIONS
// ===============================================

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

// =============================================================================
// HEADER CLOCK
// =============================================================================

document.addEventListener('DOMContentLoaded', () => {
    const clockTime = document.getElementById('ka-clock-time');
    if (clockTime) {
        const updateClock = () => {
            const now = new Date();
            clockTime.textContent = now.toLocaleTimeString('fr-FR', { hour12: false });
        };
        updateClock();
        setInterval(updateClock, 1000);
    }

    // -----------------------------------------------
    // Nav & status background on scroll
    // -----------------------------------------------

    const nav = document.querySelector('.ka-nav');
    const status = document.querySelector('.ka-header__status');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY > 0;
        nav.classList.toggle('is-scrolled', scrolled);
        status.classList.toggle('is-scrolled', scrolled);
    });
});