// ===============================================
// THEME
// ===============================================

const root = document.documentElement;
const themeToggle = document.querySelector("#theme-toggle");

const STORAGE_KEY = "theme";
const DEFAULT_THEME = "dark";

root.dataset.theme = localStorage.getItem(STORAGE_KEY) || DEFAULT_THEME;

themeToggle.addEventListener("click", () => {
    const newTheme = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = newTheme;
    localStorage.setItem(STORAGE_KEY, newTheme);
});

// ===============================================
// GRAVITY PARTICLES
// ===============================================

function initGravityParticles(canvas, options = {}) {
    const settings = {
        count: 210,         
        minSize: 1,         
        maxSize: 3,         
        speed: 0.4,        
        mode: "attract",    
        strength: 0.6,      
        radius: 160,        
        glow: 14,           
        ...options
    };

    const canvasContext = canvas.getContext("2d"); 
    const mousePosition = { x: null, y: null }; 
    const prefersReduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const particleColors = { main: "#FOEEFF", glow: "#F0EEFF"}; 

    let particles = []; 
    let canvasWidth = 0; 
    let canvasHeight = 0; 
    let animationFrameId = null;

    const readThemeColors = () => {
        const rootStyles = getComputedStyle(document.documentElement); 
        particleColors.main = rootStyles.getPropertyValue("--primary").trim();
        particleColors.glow = rootStyles.getPropertyValue("--accent").trim();
    };

    const resizeCanvas = () => {
        const pixelRatio = window.devicePixelRatio || 1; 
        canvasWidth = window.innerWidth;
        canvasHeight = window.innerHeight;
        canvas.width = canvasWidth * pixelRatio;
        canvas.height = canvasHeight * pixelRatio; 
        canvasContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const createParticles = () => {
        particles = Array.from({ length: settings.count }, () => {
            const baseSpeedX = (Math.random() - 0.5) * settings.speed * 2; 
            const baseSpeedY = (Math.random() - 0.5) * settings.speed * 2;

            return {
                x: Math.random() * canvasWidth, 
                y: Math.random() * canvasHeight, 
                baseSpeedX, 
                baseSpeedY, 
                speedX: baseSpeedX, 
                speedY: baseSpeedY, 
                size: settings.minSize + Math.random() * (settings.maxSize - settings.minSize), 
                glowLevel: 0
            };
        });
    };

    const drawFrame = () => {
        canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);
        const pullDirection = settings.mode === "attract" ? 1 : -1; 

        particles.forEach((particle) => {
            if (mousePosition.x !== null) {
                const deltaX = mousePosition.x - particle.x; 
                const deltaY = mousePosition.y - particle.y; 
                const distanceToMouse = Math.hypot(deltaX, deltaY);

                if (distanceToMouse < settings.radius && distanceToMouse > 0) {
                    const pullStrength = (1 - distanceToMouse / settings.radius) * settings.strength;
                    particle.speedX += (deltaX / distanceToMouse) * pullStrength * pullDirection * 0.5;
                    particle.speedY += (deltaY / distanceToMouse) * pullStrength * pullDirection * 0.5; 
                    particle.glowLevel = Math.min(1, particle.glowLevel + 0.1);
                } else {
                    particle.glowLevel = Math.max(0, particle.glowLevel - 0.03);
                }
            } else {
                particle.glowLevel = Math.max(0, particle.glowLevel - 0.03);
            }

            particle.speedX += (particle.baseSpeedX - particle.speedX) * 0.03; 
            particle.speedY += (particle.baseSpeedY - particle.speedY) * 0.03;

            particle.x += particle.speedX; 
            particle.y += particle.speedY; 

            if (particle.x < 0) particle.x = canvasWidth; 
            if (particle.x > canvasWidth) particle.x = 0; 
            if (particle.y < 0) particle.y = canvasHeight;
            if (particle.y > canvasHeight) particle.y = 0; 

            canvasContext.beginPath(); 
            canvasContext.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            canvasContext.globalAlpha = 0.45 + particle.glowLevel * 0.55;
            canvasContext.fillStyle = particleColors.main; 
            canvasContext.shadowBlur = settings.glow * particle.glowLevel; 
            canvasContext.shadowColor = particleColors.glow;
            canvasContext.fill();
        });

        canvasContext.globalAlpha = 1; 
        canvasContext.shadowBlur = 0;
    };

    const runAnimation = () => {
        drawFrame();
        animationFrameId = requestAnimationFrame(runAnimation);
    };

    const startAnimation = () => {
        if (!animationFrameId && !prefersReduceMotion) runAnimation();
    };

    const stopAnimation = () => {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }; 

    window.addEventListener("pointerMove", (event) => {
        mousePosition.x = event.clientX;
        mousePosition.y = event.clientY;
    });

    document.addEventListener("pointerleave", () => {
        mousePosition.x = null;
        mousePosition.y = null;
    });

    new MutationObserver(readThemeColors).observe(document.documentElement, {
        attributes: true, 
        attributeFilter: ["data-theme"]
    });

    document.addEventListener("visibilitychange", () => {
        document.hidden ? stopAnimation() : startAnimation();
    });

    window.addEventListener("resize", () => {
        resizeCanvas(); 
        createParticles();
    });

    readThemeColors();
    resizeCanvas();
    createParticles();
    drawFrame(); 
    startAnimation();
}

const particlesCanvas = document.getElementById("ka-particles");
if (particlesCanvas) {
    initGravityParticles(particlesCanvas, { mode: "attract" });
}

// ===============================================
// SCRAMBLE
// ===============================================

const DURATION = 350;
const STEPS = 10;

function scramble(el) {
    if (!el.dataset.label) el.dataset.label = el.textContent.trim();

    const original = el.dataset.label;
    const chars = original.replace(/ /g, '').split('');
    let frame = 0;

    clearInterval(el.scrambleInterval);

    el.scrambleInterval = setInterval(() => {
        el.textContent = original
            .split('')
            .map((char, i) => {
                if (char === ' ') return ' ';
                if (i < Math.floor((frame / STEPS) * original.length)) return char;
                return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("");

        frame++;

        if (frame > STEPS) {
            clearInterval(el.scrambleInterval);
            el.textContent = original;
        }
    }, DURATION / STEPS);
}

const scrambleTargets = document.querySelectorAll(
    '.ka-link, .ka-btn__label, .ka-sidebar__social a strong'
);

scrambleTargets.forEach(el => {
    const trigger = el.closest('a, button') || el;
    trigger.addEventListener('mouseenter', () => scramble(el));
});

// ===============================================
// SIDEBAR
// ===============================================

const burger = document.getElementById("ka-burger");
const sidebar = document.getElementById("ka-sidebar");
const sidebarClose = document.getElementById("ka-sidebar-close");
const sidebarLinks = sidebar.querySelectorAll(".ka-sidebar__menu a"); 

const isEnglish = root.lang === "en"; 
const labels = {
    open: isEnglish ? "Open navigation menu" : "Ouvrir le menu de navigation", 
    close: isEnglish ? "Close navigation menu" : "Fermer le menu de navigation"
};

const openSidebar = () => {
    sidebar.classList.add("active"); 
    sidebar.removeAttribute("inert"); 
    burger.setAttribute("aria-expanded", "true"); 
    burger.setAttribute("aria-label", labels.close); 
    sidebarClose.focus();
};

const closeSidebar = (returnFocus = false) => {
    sidebar.classList.remove("active"); 
    sidebar.setAttribute("inert", ""); 
    burger.setAttribute("aria-expanded", "false"); 
    burger.setAttribute("aria-label", labels.open); 
    if (returnFocus) burger.focus();
};

burger.addEventListener("click", () => {
    if (sidebar.classList.contains("active")) {
        closeSidebar();
    } else {
        openSidebar();
    }
});

sidebarClose.addEventListener("click", () => closeSidebar(true));
sidebarLinks.forEach((link) => {
    link.addEventListener("click", () => closeSidebar());
});

document.addEventListener("click", (e) => {
    const isOpen = sidebar.classList.contains("active");
    if (isOpen && !sidebar.contains(e.target) && !burger.contains(e.target)) {
        closeSidebar();
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && sidebar.classList.contains("active")) {
        closeSidebar(true);
    }
});

// ===============================================
// REVEAL ANIMATIONS
// ===============================================

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(({target, isIntersecting}) => {
            if (isIntersecting) {
                target.classList.add("is-visible");
                revealObserver.unobserve(target);
            }
        });
    },
    { threshold: 0.25 }
);


document.querySelectorAll('[class*="ka-reveal-"]')
    .forEach(el => revealObserver.observe(el));

// ===============================================
// TERMINAL CLOCK
// ===============================================

const clockTime = document.getElementById("ka-clock-time"); 
if (clockTime) {
    const updateClock = () => {
        clockTime.textContent = new Date().toLocaleTimeString("fr-FR", {
            hour12: false
        });
    };

    updateClock();
    setInterval(updateClock, 1000);
}