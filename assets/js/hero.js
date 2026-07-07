// ===============================================
// HERO 
// ===============================================

const hero = document.getElementById('introduction');
const heroImage = document.getElementById('heroImg');

hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    const moveX = x * 60;
    const moveY = x * 60;

    heroImage.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

hero.addEventListener('mouseleave', () => {
    heroImage.style.transform = 'translate(0, 0)';
});