document.addEventListener("DOMContentLoaded", () => {
    // 1. Manejo del Filtro de Rutas
    const form = document.getElementById("route-form");
    const routesContainer = document.getElementById("routes-container");
    const routeCards = document.querySelectorAll(".route-card");
    const originSelect = document.getElementById("origin-select");
    const destSelect = document.getElementById("dest-select");
    const activeRoutesSection = document.getElementById("active-routes-section");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const origin = originSelect.value;
        const dest = destSelect.value;
        
        if (!origin && !dest) {
            // No selection: Hide section and return to default
            activeRoutesSection.style.display = "none";
            return;
        }

        activeRoutesSection.style.display = "block";
        let found = false;

        routeCards.forEach(card => {
            const cardOrigin = card.getAttribute("data-origin");
            const cardDest = card.getAttribute("data-dest");
            const isDetailed = card.classList.contains("detailed-route-card");

            let shouldShow = false;

            if (origin === cardOrigin && dest === cardDest) {
                // Exact match: prefer detailed card if it exists for this route
                if (isDetailed) {
                    shouldShow = true;
                } else {
                    const hasDetailed = Array.from(routeCards).some(c => 
                        c.classList.contains("detailed-route-card") && 
                        c.getAttribute("data-origin") === cardOrigin && 
                        c.getAttribute("data-dest") === cardDest
                    );
                    shouldShow = !hasDetailed;
                }
            } else {
                // Partial match or no match
                const matchOrigin = !origin || origin === cardOrigin;
                const matchDest = !dest || dest === cardDest;
                // Never show detailed card on partial match (it's too big)
                shouldShow = matchOrigin && matchDest && !isDetailed;
            }

            if (shouldShow) {
                card.style.display = isDetailed ? "flex" : "block";
                found = true;
                // Pequeña animación de reaparición
                card.style.opacity = '0';
                card.style.transform = 'translateY(10px)';
                setTimeout(() => {
                    card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.display = "none";
            }
        });

        // Scroll suave hasta la sección de rutas si encontramos algo
        if (found) {
            activeRoutesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        // Mostrar un mensaje si no se encuentra ruta
        const existingMsg = document.getElementById("no-route-msg");
        if(existingMsg) existingMsg.remove();

        if (!found) {
            const msg = document.createElement("p");
            msg.id = "no-route-msg";
            msg.textContent = "No hay rutas activas para esta combinación en este momento. Por favor, realiza una consulta personalizada.";
            msg.style.textAlign = "center";
            msg.style.padding = "2rem";
            msg.style.color = "var(--color-text-mutted)";
            msg.style.gridColumn = "1 / -1";
            routesContainer.appendChild(msg);
        }
    });

    // Event listener para los Tabs de la tarjeta detallada
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const container = btn.closest('.detailed-schedule-container');
            const allBtns = container.querySelectorAll('.tab-btn');
            const allContent = container.querySelectorAll('.tab-content');
            
            allBtns.forEach(b => b.classList.remove('active'));
            allContent.forEach(content => {
                content.style.display = 'none';
                content.classList.remove('active');
            });

            btn.classList.add('active');

            const tabId = btn.getAttribute('data-tab');
            const targetContent = container.querySelector('#tab-' + tabId);
            const mainAvailability = container.querySelector('.main-availability');

            if (targetContent) {
                targetContent.style.display = 'block';
                // Si es el tab de tarde, ocultamos el bloque general de reserva porque el tab tiene su propia info (Lista de espera)
                if (tabId === 'vuelta' && mainAvailability) {
                    mainAvailability.style.display = 'none';
                } else if (mainAvailability) {
                    mainAvailability.style.display = 'block';
                }
                
                setTimeout(() => {
                    targetContent.classList.add('active');
                    // Refrescar el cálculo al abrir otro tab
                    const timeline = targetContent.querySelector('.scrollable-timeline');
                    if(timeline) timeline.dispatchEvent(new Event('scroll'));
                }, 10);
            }
        });
    });

    // 3. Experiencia de Scroll Dinámico (Línea Mágica de Puntos)
    const scrollableTimelines = document.querySelectorAll('.scrollable-timeline');
    
    scrollableTimelines.forEach(timeline => {
        // Función analítica que actualiza punto a punto
        const updateScrollProgress = () => {
            const scrollTop = timeline.scrollTop;
            const scrollHeight = timeline.scrollHeight;
            const clientHeight = timeline.clientHeight;
            const maxScroll = scrollHeight - clientHeight;
            
            // Llenar línea de progreso CSS
            // Si llegamos al final, forzamos el 100%
            let scrollFraction = maxScroll > 0 ? scrollTop / maxScroll : 0;
            const isAtBottom = maxScroll > 0 && (scrollTop + clientHeight >= scrollHeight - 5);
            
            timeline.style.setProperty('--scroll-active', isAtBottom ? 1 : scrollFraction);

            // Encender nodos al hacer scroll
            const items = timeline.querySelectorAll('li');
            const focusLine = scrollTop + (clientHeight * 0.6); // Línea focal al 60% para mejorar visibilidad
            
            items.forEach((item, index) => {
                const itemTop = item.offsetTop;
                const isReturn = item.classList.contains('return-stop');
                
                // Activamos si: es el primero, pasamos la línea focal, o llegamos al final del scroll
                // EXCEPTO: si es la parada de "Vuelta" (no se debe animar)
                if ((index === 0 || itemTop <= focusLine || isAtBottom) && !isReturn) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        };

        timeline.addEventListener('scroll', updateScrollProgress);
        window.addEventListener('resize', updateScrollProgress); // Actualizar si gira la pantalla
        // Disparo inicial
        updateScrollProgress();
    });

    // Pequeñas animaciones al cargar
    gsap.from(".uni-hero-content h1", { y: 30, opacity: 0, duration: 0.8, ease: "power3.out", delay: 0.2 });
    gsap.from(".uni-hero-content p", { y: 30, opacity: 0, duration: 0.8, ease: "power3.out", delay: 0.4 });
    gsap.from(".route-selector-container", { y: 40, opacity: 0, duration: 0.8, ease: "power3.out", delay: 0.6 });
});
