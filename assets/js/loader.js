const greetings = [
    { text: "Salut", bgColor: "#C5B7AA", direction: "right" },
    { text: "Hello", bgColor: "#C8D1C7", direction: "left" },
    { text: "Hola", bgColor: "#9B6A5D", direction: "right" },
    { text: "안녕하세요", bgColor: "#957e68", direction: "left" },
];

const greetingEl = document.getElementById("greeting");
const counterEl = document.getElementById("counter");
const bgAnimationEl = document.getElementById("background-animation");
const loaderEl = document.getElementById("loader");
const siteContentEl = document.getElementById("#site-content");

let greetingIndex = 0;
let counter = 0;

function nextGreeting() {
    const current = greetings[greetingIndex];

    bgAnimationEl.style.backgroundColor = current.bgColor;
    bgAnimationEl.style.transition = "none";
    bgAnimationEl.style.left = current.direction === "right" ? "100%" : "-100%";

    setTimeout(() => {
        bgAnimationEl.style.transition = "all 1s ease";
        bgAnimationEl.style.left = "0";
    }, 50);

    greetingEl.style.opacity = 0;
    setTimeout(() => {
        greetingEl.innerText = current.text;
        greetingEl.style.opacity = 1;
    }, 500);

    greetingIndex++;

    if (greetingIndex < greetings.length) {
        setTimeout(nextGreeting, 2000);
    }
}

function startCounter() {
    const interval = setInterval(() => {
        if (counter < 100) {
            counter++;
            counterEl.innerText = counter + "%";
        } else {
            clearInterval(interval);
            endLoader();
        }
    }, 75);
}

function endLoader() {
    loaderEl.style.opacity = 0;
    loaderEl.style.transition = "opacity 1s ease";
    setTimeout(() => {
        loaderEl.style.display = "none";
        siteContentEl.style.display = "block";
    }, 1000);
}

startCounter();
nextGreeting();