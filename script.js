document.addEventListener("DOMContentLoaded", () => {
    // Iniciar slider directamente
    if (typeof initSlider === 'function' && document.querySelector('.hero-slider')) {
        initSlider();
    }
    if (typeof initScrollAnimations === 'function') {
        initScrollAnimations();
    }
});


// Lógica del Slider Hero
function initSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    let isAnimating = false;
    const slideDelay = 5000; // 5 segundos
    let autoSlideInterval;

    // Asegurarse de que el primer slide sea visible (inicialización GSAP)
    gsap.set(slides, { opacity: 0, zIndex: 1 });
    gsap.set(slides[currentSlide], { opacity: 1, zIndex: 2 });
    gsap.set(slides[currentSlide].querySelector('.slide-bg'), { scale: 1.05 });
    gsap.to(slides[currentSlide].querySelector('.slide-bg'), { scale: 1, duration: 6, ease: "none" }); // Efecto Ken Burns
    
    // Animar texto inicial
    gsap.fromTo(slides[currentSlide].querySelectorAll('.slide-content > *'), 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out", delay: 0.3 }
    );

    function goToSlide(index) {
        if (isAnimating || index === currentSlide) return;
        isAnimating = true;

        const previousSlide = currentSlide;
        currentSlide = index;

        // Actualizar UI
        if (dots[previousSlide]) dots[previousSlide].classList.remove('active');
        if (dots[currentSlide]) dots[currentSlide].classList.add('active');

        // Animar salida del anterior
        gsap.to(slides[previousSlide], {
            opacity: 0,
            duration: 1,
            zIndex: 1,
            ease: "power2.inOut"
        });

        // Preparar texto del nuevo slide
        gsap.set(slides[currentSlide].querySelectorAll('.slide-content > *'), { y: 30, opacity: 0 });
        // Preparar imagen del nuevo slide (Ken Burns start)
        gsap.set(slides[currentSlide].querySelector('.slide-bg'), { scale: 1.05 });

        // Animar entrada del nuevo
        gsap.to(slides[currentSlide], {
            opacity: 1,
            duration: 1,
            zIndex: 2,
            ease: "power2.inOut",
            onComplete: () => {
                isAnimating = false;
            }
        });

        // Animar Ken Burns (zoom muy sutil) y texto del nuevo slide
        gsap.to(slides[currentSlide].querySelector('.slide-bg'), { scale: 1, duration: 6, ease: "none" });
        gsap.to(slides[currentSlide].querySelectorAll('.slide-content > *'), {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            delay: 0.4
        });
        
        resetAutoSlide();
    }

    function nextSlide() {
        if (slides.length === 0) return;
        const next = (currentSlide + 1) % slides.length;
        goToSlide(next);
    }

    function prevSlide() {
        if (slides.length === 0) return;
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(prev);
    }

    // Event Listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });

    // Autoplay
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, slideDelay);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    startAutoSlide();
}

// Simple script para el menú móvil
const menuBtn = document.querySelector('.mobile-menu-btn');
const mainNav = document.querySelector('.main-nav');
const icon = menuBtn ? menuBtn.querySelector('i') : null;

if (menuBtn && mainNav && icon) {
    menuBtn.addEventListener('click', () => {
        const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
        menuBtn.setAttribute('aria-expanded', !isExpanded);
        mainNav.classList.toggle('nav-open');
        
        if (mainNav.classList.contains('nav-open')) {
            icon.classList.remove('ph-list');
            icon.classList.add('ph-x');
        } else {
            icon.classList.remove('ph-x');
            icon.classList.add('ph-list');
        }
    });
}

// --- SCROLL EXPERIENCE ANIMATIONS ---
function initScrollAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // 1. Features Banner Animation
    const features = gsap.utils.toArray('.feature-item');
    if(features.length > 0) {
        gsap.fromTo(features, 
            { y: 50, opacity: 0 },
            {
                y: 0, 
                opacity: 1, 
                duration: 0.8, 
                stagger: 0.1, 
                ease: "power2.out",
                scrollTrigger: {
                    trigger: '.features-banner',
                    start: "top 85%",
                }
            }
        );
    }

    // 2. Services Cards - Stagger Reveal
    const serviceCards = gsap.utils.toArray('.service-card');
    if (serviceCards.length > 0) {
        gsap.fromTo(serviceCards,
            { y: 80, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: '.services-section',
                    start: "top 80%",
                }
            }
        );
    }



    // 4. Team Section Parallax y Reveal
    const teamSection = document.querySelector('.team-section');
    if (teamSection) {
        // CEO Profile Fade In
        gsap.fromTo('.ceo-profile',
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: '.team-section',
                    start: "top 75%"
                }
            }
        );
        
        // Stats in team section
        const stats = gsap.utils.toArray('.stat-banner');
        if(stats.length > 0) {
            gsap.fromTo(stats,
                { opacity: 0, x: 20 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: '.team-stats',
                        start: "top 80%"
                    }
                }
            );
        }
    }
}
