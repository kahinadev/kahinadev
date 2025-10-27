// ===============================================
// WEBSITE
// ===============================================

// =========== THEME ===========

const toggleButton = document.getElementById("theme-toggle");
const body = document.body;
const logo = document.querySelector(".logo");

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
    body.className = savedTheme;

    if (savedTheme === "theme-light") {
        toggleButton.classList.add("is-light");
        logo.classList.add("is-light");
    }
}

const toggleTheme = () => {
    const isDark = body.classList.contains("theme-dark");
    const newTheme = isDark ? "theme-light" : "theme-dark";

    body.className = newTheme;

    toggleButton.classList.toggle("is-light");
    logo.classList.toggle("is-light");

    localStorage.setItem("theme", newTheme);
};

toggleButton.addEventListener('click', toggleTheme);

// =========== MOVING TEXT ===========

const track = document.querySelector('.moving__track');
const content = document.querySelector('.moving__content');

function initMoving() {
    track.querySelectorAll('.clone').forEach(el => el.remove());
    const clone1 = content.cloneNode(true);
    const clone2 = content.cloneNode(true);
    clone1.classList.add('clone');
    clone2.classList.add('clone');
    track.appendChild(clone1);
    track.appendChild(clone2);

    const screenWidth = document.documentElement.clientWidth;
    const minDuration = 12;
    const maxDuration = 20; 
    const duration = Math.min(maxDuration, Math.max(minDuration, (screenWidth / 1440) * maxDuration));

    track.style.animationDuration = `${duration}s`;
}

initMoving();
window.addEventListener('resize', () => {
    clearTimeout(window.movingTimer);
    window.movingTimer = setTimeout(initMoving, 150);
});

