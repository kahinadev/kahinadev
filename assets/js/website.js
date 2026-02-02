// =========== LOADER ===========

document.addEventListener("DOMContentLoaded", () => {
    const loader = document.getElementById("loader");
    const greetingsEl = loader.querySelector(".subtitle-greetings");
    const progressEl = loader.querySelector(".progress-number");
    const mainContent = document.getElementById("main");

    const greetings = ["Bienvenue", "Welcome", "Bienvenida", "환영합니다"];
    let currentGreeting = 0;
    let progress = 0;

    const interval = setInterval(() => {
        progress++;

        if (progress % 25 === 0 && currentGreeting < greetings.length - 1) {
            currentGreeting++;
            greetingsEl.style.opacity = 0;
            setTimeout(() => {
                greetingsEl.textContent = greetings[currentGreeting];
                greetingsEl.style.opacity = 1;
            }, 250);
        }

        progressEl.textContent = `${progress}%`;

        if (progress >= 100) {
            clearInterval(interval);
            loader.classList.add("hidden");
            setTimeout(() => {
                loader.style.display = "none";
                mainContent.style.display = "block";
            }, 800);
        }
    }, 50);
});

// =========== SIDEBAR ===========

const openMenu = document.getElementById("openMenu");
const closeMenu = document.getElementById("closeSidebar");
const sidebar = document.getElementById("sidebar");

openMenu.addEventListener("click", () => {
    sidebar.classList.add("active");
    openMenu.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
});

closeMenu.addEventListener("click", () => {
    sidebar.classList.remove("active");
    openMenu.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
});
