// ===============================================
// WEBSITE
// ===============================================

// =========== THEME ===========

const toggleButton = document.getElementById("theme-toggle");
const body = document.body;

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
    body.className = savedTheme;
    if (savedTheme === "theme-light") {
        toggleButton.classList.add("is-light");
    }
} else {
    body.classList.add("theme-dark");
}

const toggleTheme = () => {
    const isDark = body.classList.contains("theme-dark");
    const newTheme = isDark ? "theme-light" : "theme-dark";

    body.className = newTheme;
    toggleButton.classList.toggle("is-light", !isDark);
    localStorage.setItem("theme", newTheme);
};

toggleButton.addEventListener("click", toggleTheme);


// =========== MOVING TEXT ===========

// const track = document.querySelector('#movingTrack');
// const content = document.querySelector('#movingContent');

// track.querySelectorAll('.clone').forEach(el => el.remove());

// const clone1 = content.cloneNode(true);
// const clone2 = content.cloneNode(true);
// clone1.classList.add('clone');
// clone2.classList.add('clone');
// track.appendChild(clone1);
// track.appendChild(clone2);

// let pos = 0;
// const speed = 1;

// function animate() {
//     pos -= speed;
//     if (pos <= -content.offsetWidth) pos = 0;
//     track.style.transform = `translateX(${pos}px)`;
//     requestAnimationFrame(animate);
// }

// animate();

// window.addEventListener('resize', () => {
//     pos = 0;
//     track.querySelectorAll('.clone').forEach(el => el.remove());
//     const clone1 = content.cloneNode(true);
//     const clone2 = content.cloneNode(true);
//     clone1.classList.add('clone');
//     clone2.classList.add('clone');
//     track.appendChild(clone1);
//     track.appendChild(clone2);
// });


