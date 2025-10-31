// ===============================================
// WEBSITE
// ===============================================

// =========== THEME ===========

document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("theme-toggle");
    const body = document.body;

    if (!toggleButton) return;

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
        body.classList.add(savedTheme);
        toggleButton.classList.toggle("is-light", savedTheme === "theme-light");
    } else {
        body.classList.add("theme-dark");
    }

    const toggleTheme = () => {
        const isDark = body.classList.contains("theme-dark");
        const newTheme = isDark ? "theme-light" : "theme-dark";

        body.classList.remove("theme-dark", "theme-light");
        body.classList.add(newTheme);

        toggleButton.classList.toggle("is-light", newTheme === "theme-light");

        localStorage.setItem("theme", newTheme);
    };

    toggleButton.addEventListener("click", toggleTheme);
});