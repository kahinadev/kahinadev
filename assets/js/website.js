document.addEventListener("DOMContentLoaded", () => {
    // --- HISTORY ---
    
    const blocks = document.querySelectorAll(
        ".history__content-two, .history__content-three, .history__content-four, .history__content-five"
    );

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        },
        { threshold: 0.2 }
    );

    blocks.forEach((block) => observer.observe(block));

    // --- LOADER ---

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
