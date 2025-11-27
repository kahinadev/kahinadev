// ===============================================
// WEBSITE
// ===============================================

// =========== THEME ===========

document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("theme-toggle");
    const body = document.body;
    const logoDark = document.getElementById("logo-dark");
    const logoLight = document.getElementById("logo-light");
    const loader = document.getElementById("loader");

    if (!toggleButton) return;

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
        body.classList.add(savedTheme);
        toggleButton.classList.toggle("is-light", savedTheme === "theme-light");
        logoDark.style.display = savedTheme === "theme-dark" ? "block" : "none";
        logoLight.style.display = savedTheme === "theme-light" ? "block" : "none";
    } else {
        body.classList.add("theme-dark");
        logoDark.style.display = "block";
        logoLight.style.display = "none";
    }

    const toggleTheme = () => {
        const isDark = body.classList.contains("theme-dark");
        const newTheme = isDark ? "theme-light" : "theme-dark";

        body.classList.remove("theme-dark", "theme-light");
        body.classList.add(newTheme);

        toggleButton.classList.toggle("is-light", newTheme === "theme-light");

        logoDark.style.display = newTheme === "theme-dark" ? "block" : "none";
        logoLight.style.display = newTheme === "theme-light" ? "block" : "none";

        localStorage.setItem("theme", newTheme);
    };

    toggleButton.addEventListener("click", toggleTheme);
});