document.addEventListener("DOMContentLoaded", () => {
    const stickyElement = document.querySelector('.sticky-col');
    const lastSection = document.querySelector('#career').lastElementChild;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                stickyElement.classList.add('is-hidden');
            } else {
                stickyElement.classList.remove('is-hidden');
            }
        });
    }, {
        root: null,
        threshold: 0,
        rootMargin: '0px 0px -100% 0px'
    });

    if (lastSection) {
        observer.observe(lastSection);
    }
});

