document.addEventListener('DOMContentLoaded', () => {
    
    // Create a timeline for the Hero entrance
    const tl = gsap.timeline();

    // 1. Fade in the main Typography first
    tl.from(".reveal-text", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.4
    });

    // 2. Fade in the NK Card and let it "stay"
    tl.to(".nk-card", {
        autoAlpha: 1,      // This handles both opacity and visibility:visible
        y: -20,            // Moves it up slightly into place
        duration: 1.5,
        ease: "expo.out",  // High-end editorial feel
    }, "-=0.8");           // Starts slightly before the text finishes

    // 3. Subtle Hover Interaction (Optional)
    // This keeps the card feeling "alive" without moving it away
    const card = document.querySelector('.nk-card');
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            scale: 1.02,
            rotate: 0,
            duration: 0.4,
            ease: "power2.out"
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            scale: 1,
            rotate: -2,
            duration: 0.4,
            ease: "power2.out"
        });
    });
});

    // 4. Scroll Reveal for Project Cards
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                gsap.from(entry.target, {
                    y: 60,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out"
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.project-card').forEach(p => observer.observe(p));
});
