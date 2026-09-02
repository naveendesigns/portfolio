document.addEventListener('DOMContentLoaded', () => {
    // 1. Text Reveal Animation
    gsap.from(".reveal-text", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.5
    });

    // 2. Editorial Card Float
    gsap.from("#editorial-card", {
        x: 50,
        opacity: 100,
        duration: 1.5,
        delay: 0.8
    });

    // 3. Subtle Parallax for the Editorial Card based on Mouse
    const card = document.querySelector('#editorial-card');
    document.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
        gsap.to(card, {
            rotationY: xAxis,
            rotationX: yAxis,
            ease: "power2.out"
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
