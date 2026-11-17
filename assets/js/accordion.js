// ===============================================
// ACCORDION
// ===============================================
const accordion = document.querySelector(".ka-accordion");

if (accordion) {
    const panels = [...accordion.querySelectorAll(".ka-accordion__panel")];
    const LG = 1024;

    const canHover = () =>
        window.matchMedia(`(hover: hover) and (pointer: fine) and (min-width: ${LG}px)`).matches;

    function openPanel(panel) {
        panels.forEach((p) => {
            const isOpen = p === panel;
            p.classList.toggle("is-active", isOpen);
            p.querySelector(".ka-accordion__trigger").setAttribute("aria-expanded", isOpen);
            p.querySelector(".ka-accordion__body").inert = !isOpen;
        });
    }

    panels.forEach((panel) => {
        panel
            .querySelector(".ka-accordion__trigger")
            .addEventListener("click", () => openPanel(panel));

        panel.addEventListener("mouseenter", () => {
            if (canHover()) openPanel(panel);
        });
    });

    openPanel(panels.find((p) => p.classList.contains("is-active")) || panels[0]);
}