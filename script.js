document.addEventListener('DOMContentLoaded', () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const nav = document.querySelector('.site-nav');
    const menuButton = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const card = document.querySelector('#editorial-card');
    const heroCanvas = document.querySelector('.hero-canvas');

    const setScrolledState = () => {
        nav.classList.toggle('scrolled', window.scrollY > 40);
    };

    setScrolledState();
    window.addEventListener('scroll', setScrolledState, { passive: true });

    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.toggle('open');
            menuButton.setAttribute('aria-expanded', String(isOpen));
            mobileMenu.setAttribute('aria-hidden', String(!isOpen));
            document.body.classList.toggle('menu-open', isOpen);
            menuButton.textContent = isOpen ? 'CLOSE' : 'MENU';
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                menuButton.setAttribute('aria-expanded', 'false');
                mobileMenu.setAttribute('aria-hidden', 'true');
                document.body.classList.remove('menu-open');
                menuButton.textContent = 'MENU';
            });
        });
    }

    if (reduceMotion || typeof gsap === 'undefined') {
        document.querySelectorAll('.reveal').forEach(element => {
            element.style.opacity = '1';
            element.style.transform = 'none';
        });
        if (card) card.style.opacity = '1';
        return;
    }

    const heroTimeline = gsap.timeline({ defaults: { ease: 'power4.out' } });

    heroTimeline
        .from('.hero-kicker', { y: 14, opacity: 0, duration: 0.55 })
        .from('.hero h1 span', { y: 35, opacity: 0, stagger: 0.07, duration: 0.75 }, '-=0.25')
        .from('.hero-intro', { y: 14, opacity: 0, duration: 0.55 }, '-=0.4')
        .from('.hero-cta', { y: 10, opacity: 0, duration: 0.45 }, '-=0.3')
        .from('.hero-card', { scale: 0.94, opacity: 0, rotate: 2, duration: 0.8 }, '+=4')
        .from('.hero-corner, .hero-bottom, .scroll-cue', { opacity: 0, duration: 0.5 }, '-=0.55');

    if (card && heroCanvas && window.matchMedia('(pointer: fine)').matches) {
        heroCanvas.addEventListener('mousemove', event => {
            const rect = heroCanvas.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;
            gsap.to(card, {
                x: x * 34,
                y: y * 26,
                rotate: x * 3 - 2,
                duration: 0.7,
                ease: 'power3.out',
                overwrite: true
            });
        });

        heroCanvas.addEventListener('mouseleave', () => {
            gsap.to(card, {
                x: 0,
                y: 0,
                rotate: -2,
                duration: 0.8,
                ease: 'power3.out',
                overwrite: true
            });
        });
    }

    const revealItems = document.querySelectorAll('.section-label, .display-copy, .body-copy, .project-card, .process-grid article, .experience-row, .contact-inner');

    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            gsap.from(entry.target, {
                y: 28,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            });
            revealObserver.unobserve(entry.target);
        });
    }, { threshold: 0.12 });

    revealItems.forEach(item => revealObserver.observe(item));
});
