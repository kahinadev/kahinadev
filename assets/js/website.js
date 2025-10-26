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
