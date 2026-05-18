// =======================================
// SLIDER SERVICES
// ======================================= 

document.addEventListener('DOMContentLoaded', () => {

    const track = document.querySelector('.ka-slider__track');
    const cards = document.querySelectorAll('.ka-slider__card');
    const dots = document.querySelectorAll('.ka-slider__dot');

    let current = 0;
    let startX = 0;
    let dragX = 0;
    let isDrag = false;

    function goTo(index) {
        current = Math.max(0, Math.min(index, cards.length - 1));

        const card = cards[current];
        const trackRect = track.parentElement.getBoundingClientRect();
        const offset = card.offsetLeft - (trackRect.width / 2 - card.offsetWidth / 2);

        track.style.transform = `translateX(${-offset}px)`;

        cards.forEach((c, i) => c.classList.toggle('is-active', i === current));
        dots.forEach((d, i) => d.classList.toggle('is-active', i === current));
    }

    dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

    track.addEventListener('mousedown', e => {
        isDrag = true;
        startX = e.clientX;
        track.classList.add('is-dragging');
    });

    window.addEventListener('mousemove', e => {
        if (!isDrag) return;
        dragX = e.clientX - startX;
    });

    window.addEventListener('mouseup', () => {
        if (!isDrag) return;
        isDrag = false;
        track.classList.remove('is-dragging');
        if (dragX < -50) goTo(current + 1);
        else if (dragX > 50) goTo(current - 1);
        else goTo(current);
        dragX = 0;
    });

    track.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchend', e => {
        dragX = e.changedTouches[0].clientX - startX;
        if (dragX < -50) goTo(current + 1);
        else if (dragX > 50) goTo(current - 1);
        dragX = 0;
    }, { passive: true });

    goTo(0);

});
