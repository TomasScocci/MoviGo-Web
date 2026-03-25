/**
 * MoviGO - Contacto JS
 * Manejo de animaciones y lógica de la página de contacto.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicialización de GSAP (registramos ScrollTrigger)
    gsap.registerPlugin(ScrollTrigger);

    // 2. Animación de Hero Section (Entrada)
    const heroTl = gsap.timeline();

    heroTl.to('.reveal-text', {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.3,
        ease: 'power4.out',
        delay: 0.5
    });

    // 3. Animación de la Card de WhatsApp
    gsap.to('.wa-card', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
            trigger: '.whatsapp-section',
            start: 'top 80%',
            once: true
        }
    });

    // 4. Animación de los métodos de contacto secundarios
    gsap.to('.contact-method', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.secondary-contact',
            start: 'top 85%',
            once: true
        }
    });

    // 5. Animación del ícono de WhatsApp (Pulso persistente adicional en JS)
    // Ya tiene CSS pulse, pero podemos agregar un ligero float recreativo
    gsap.to('.wa-icon-wrapper', {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });

    // 6. Manejo específico del Menú Móvil (Copiado del sistema global para asegurar funcionamiento)
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', () => {
            const isOpen = mainNav.classList.contains('nav-open');
            if (isOpen) {
                mainNav.classList.remove('nav-open');
                mobileMenuBtn.innerHTML = '<i class="ph ph-list"></i>';
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            } else {
                mainNav.classList.add('nav-open');
                mobileMenuBtn.innerHTML = '<i class="ph ph-x"></i>';
                mobileMenuBtn.setAttribute('aria-expanded', 'true');
            }
        });
    }

    // Cerrar menú al hacer click en un link
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('nav-open')) {
                mainNav.classList.remove('nav-open');
                mobileMenuBtn.innerHTML = '<i class="ph ph-list"></i>';
            }
        });
    });
});
