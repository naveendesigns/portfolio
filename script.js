document.addEventListener('DOMContentLoaded', () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const nav = document.querySelector('.site-nav');
    const menuButton = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const card = document.querySelector('#editorial-card');
    const heroCanvas = document.querySelector('.hero-canvas');
    const heroTitle = document.querySelector('#hero-title');
    const cardEmoji = document.querySelector('.hero-emoji');
    const cardTitle = document.querySelector('.card-title');
    const cardDescription = document.querySelector('.card-description');
    const cardProgress = document.querySelector('.card-progress');
    const prevButton = document.querySelector('.card-prev');
    const nextButton = document.querySelector('.card-next');
    const closeButton = document.querySelector('.card-close');

    const personalCards = [
        {
            emoji: '🧠',
            title: 'I like products with a point.',
            description: 'If it makes someone’s day a little easier, happier, or better, I’m interested.'
        },
        {
            emoji: '📷',
            title: 'I chase good frames.',
            description: 'Street corners, quiet cafés, interesting light, random moments. If it looks beautiful, I probably have a photo of it.'
        },
        {
            emoji: '🏋️',
            title: 'I lift heavy things.',
            description: 'Full-on strength training, enough protein, repeat. I like the discipline of showing up and getting 1% better.'
        },
        {
            emoji: '☕',
            title: 'My office has many addresses.',
            description: 'Find a good café, order a coffee, grab a corner, put on my headphones, and disappear into a design problem.'
        },
        {
            emoji: '✨',
            title: 'I’m probably noticing something.',
            description: 'A weird interaction. A beautiful frame. A great cup of coffee. A tiny detail most people walked past.'
        }
    ];

    let currentCard = 0;
    let cardIsOpen = true;
    let cardAnimating = false;
    let lastScrollY = window.scrollY;
    let ticking = false;

    const setNavState = () => {
        const currentScrollY = window.scrollY;
        nav.classList.add('scrolled');
        lastScrollY = currentScrollY;
        ticking = false;
    };

    setNavState();
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(setNavState);
            ticking = true;
        }
    }, { passive: true });

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

    const renderCard = () => {
        const item = personalCards[currentCard];
        cardEmoji.textContent = item.emoji;
        cardTitle.textContent = item.title;
        cardDescription.textContent = item.description;
        cardProgress.textContent = `${String(currentCard + 1).padStart(2, '0')} / ${String(personalCards.length).padStart(2, '0')}`;
        prevButton.disabled = personalCards.length < 2;
        nextButton.disabled = personalCards.length < 2;
    };

    const showCard = () => {
        if (cardIsOpen || cardAnimating) return;
        cardAnimating = true;
        cardIsOpen = true;
        heroTitle.setAttribute('aria-expanded', 'true');
        card.classList.remove('is-closed');

        if (reduceMotion || typeof gsap === 'undefined') {
            gsap?.set(card, { opacity: 1, scale: 1, x: 0, y: 0, rotate: -2 });
            card.style.opacity = '1';
            cardAnimating = false;
            return;
        }

        gsap.fromTo(card,
            { opacity: 0, scale: 0.9, y: 28, rotate: 4 },
            { opacity: 1, scale: 1, y: 0, rotate: -2, duration: 0.72, ease: 'power4.out', onComplete: () => { cardAnimating = false; } }
        );
    };

    const hideCard = () => {
        if (!cardIsOpen || cardAnimating) return;
        cardAnimating = true;

        if (reduceMotion || typeof gsap === 'undefined') {
            card.style.opacity = '0';
            card.classList.add('is-closed');
            cardIsOpen = false;
            heroTitle.setAttribute('aria-expanded', 'false');
            cardAnimating = false;
            return;
        }

        gsap.to(card, {
            opacity: 0,
            scale: 0.9,
            y: 24,
            rotate: 3,
            duration: 0.52,
            ease: 'power3.inOut',
            onComplete: () => {
                card.classList.add('is-closed');
                cardIsOpen = false;
                heroTitle.setAttribute('aria-expanded', 'false');
                cardAnimating = false;
            }
        });
    };

    const changeCard = (direction) => {
        if (!cardIsOpen || cardAnimating || personalCards.length < 2) return;
        cardAnimating = true;
        currentCard = (currentCard + direction + personalCards.length) % personalCards.length;
        const item = personalCards[currentCard];

        if (reduceMotion || typeof gsap === 'undefined') {
            renderCard();
            cardAnimating = false;
            return;
        }

        const exitX = direction > 0 ? -38 : 38;
        const enterX = direction > 0 ? 38 : -38;
        const content = card.querySelector('.hero-emoji, .hero-card-copy, .hero-card-controls');

        gsap.to(content, {
            x: exitX,
            opacity: 0,
            duration: 0.22,
            ease: 'power2.in',
            stagger: 0.015,
            onComplete: () => {
                renderCard();
                gsap.fromTo(content,
                    { x: enterX, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.48, ease: 'power4.out', stagger: 0.02, onComplete: () => { cardAnimating = false; } }
                );
            }
        });

        gsap.to(card, {
            rotate: direction > 0 ? -3.5 : -0.5,
            duration: 0.28,
            ease: 'power2.out',
            yoyo: true,
            repeat: 1
        });
    };

    renderCard();

    if (heroTitle && card) {
        heroTitle.addEventListener('click', showCard);
        heroTitle.addEventListener('keydown', event => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                showCard();
            }
        });
    }

    closeButton?.addEventListener('click', event => {
        event.stopPropagation();
        hideCard();
    });

    prevButton?.addEventListener('click', event => {
        event.stopPropagation();
        changeCard(-1);
    });

    nextButton?.addEventListener('click', event => {
        event.stopPropagation();
        changeCard(1);
    });

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
        .from('.hero-card', { scale: 0.94, opacity: 0, rotate: 2, duration: 0.8 }, '+=2')
        .from('.hero-corner, .hero-bottom, .scroll-cue', { opacity: 0, duration: 0.5 }, '-=0.55');

    if (card && heroCanvas && window.matchMedia('(pointer: fine)').matches) {
        heroCanvas.addEventListener('mousemove', event => {
            if (!cardIsOpen || cardAnimating) return;
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
            if (!cardIsOpen) return;
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