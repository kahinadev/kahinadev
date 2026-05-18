// =======================================
// SIDEBAR
// ======================================= 

// =========== INITIAL ===========

const burger = document.getElementById('burger');
const sidebar = document.getElementById('ka-sidebar');
const closeBtn = document.getElementById('closeSidebar');
const sidebarLinks = document.querySelectorAll('#ka-sidebar .ka-link');
const isEnglish = document.documentElement.lang === 'en';

const labels = {
    open: isEnglish ? 'Open navigation menu' : 'Ouvrir le menu de navigation',
    close: isEnglish ? 'Close navigation menu' : 'Fermer le menu de navigation'
};


// =========== OPEN SIDEBAR ===========

const openSidebar = () => {
    sidebar.classList.add('active');
    sidebar.setAttribute('aria-hidden', 'false');
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', labels.close);
}

// =========== CLOSE SIDEBAR ===========

const closeSidebar = () => {
    sidebar.classList.remove('active');
    sidebar.setAttribute('aria-hidden', 'true');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', labels.open);
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