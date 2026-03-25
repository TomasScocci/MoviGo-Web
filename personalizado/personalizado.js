document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-option-card');
    const budgetSection = document.getElementById('presupuestador');
    const selectedServiceNameSpan = document.getElementById('selected-service-name');
    const goBackBtn = document.querySelector('.go-back-btn');

    // Manejo de Selección de Cards
    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remover la clase active de todas
            serviceCards.forEach(c => c.classList.remove('active-card'));
            
            // Agregar al clickeado
            card.classList.add('active-card');

            // Setear el nombre en el título
            const serviceType = card.dataset.service; // "turismo" | "partybus"
            const prettyName = serviceType === 'partybus' ? 'Party Bus' : 'Turismo';
            selectedServiceNameSpan.textContent = prettyName;

            // Mostrar Presupuestador
            budgetSection.classList.remove('hidden');
            budgetSection.classList.add('visible');

            // Scroll suave hacia la sección presupuestador (esperar a que sea visible)
            setTimeout(() => {
                budgetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        });
    });

    // Botón Cambiar Servicio (vuelve arriba)
    if (goBackBtn) {
        goBackBtn.addEventListener('click', () => {
            document.querySelector('.service-selection-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    // Efectos simples de entrada en las cards usando GSAP (si está disponible desde index)
    if (typeof gsap !== 'undefined') {
        gsap.from('.service-option-card', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
            delay: 0.2
        });
    }
});
