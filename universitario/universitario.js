document.addEventListener("DOMContentLoaded", () => {
    // 1. Manejo del Filtro de Rutas
    const form = document.getElementById("route-form");
    const routesContainer = document.getElementById("routes-container");
    const routeCards = document.querySelectorAll(".route-card");
    const originSelect = document.getElementById("origin-select");
    const destSelect = document.getElementById("dest-select");
    const activeRoutesSection = document.getElementById("active-routes-section");

    // 1. DATA CENTRALIZADA (Inspirado en React State/Props)
    const ROUTES_DATA = {
        "nordelta": {
            "uade": {
                name: "Nordelta - UADE",
                map: "./mapas/mapa_nordelta_uade.jpg",
                shifts: [
                    { id: "ida", label: "Turno Mañana" },
                    { id: "vuelta", label: "Turno Tarde" }
                ],
                destTime: "07:30",
                returnTime: "12:20",
                stops: [
                    "Santa Barbara", "La Isla", "Cabos del Lago", "La Alameda",
                    "Alisos", "Castores", "Centro Comercial", "Altamira",
                    "Kansas", "Rincon de la Costa", "Punto Tigre", "Tomkinson y Ramal Tigre"
                ],
                times: ["06:05", "06:09", "06:11", "06:13", "06:15", "06:18", "06:20", "06:23", "06:26", "06:30", "06:39", "06:49"]
            },
            "uca": {
                name: "Nordelta - UCA",
                map: "./mapas/mapa_nordelta_uca.jpg",
                shifts: [
                    { id: "ida", label: "Turno Mañana" }
                ],
                destTime: "07:30",
                returnTime: "13:10",
                stops: [
                    "Santa Barbara", "La Isla", "Cabos del Lago", "La Alameda",
                    "Alisos", "Centro Comercial", "Altamira", "Kansas",
                    "Rincon de la Costa", "Punto Tigre", "Tomkinson y Ramal Tigre"
                ],
                times: ["06:00", "06:04", "06:06", "06:08", "06:10", "06:13", "06:18", "06:21", "06:21", "06:34", "06:44", "06:30", "06:39"]
            },
            "ub": {
                name: "Nordelta - UB",
                map: "./mapas/mapa_nordelta_ub.jpg",
                shifts: [
                    { id: "ida", label: "Turno Mañana" }
                ],
                destTime: "07:30",
                returnTime: "13:10",
                stops: [
                    "Santa Barbara", "La Isla", "Cabos del Lago", "La Alameda",
                    "Alisos", "Castores", "Centro Comercial", "Altamira",
                    "Kansas", "Rincon de la Costa", "Punto Tigre", "Tomkinson y Ramal Tigre"
                ],
                times: ["06:15", "06:17", "06:19", "06:21", "06:23", "06:25", "06:27", "06:29", "06:32", "06:35", "06:40", "06:50"]
            },
            "up": {
                name: "Nordelta - UP",
                map: "./mapas/mapa_nordelta_up.jpg",
                shifts: [
                    { id: "ida", label: "Turno Mañana" }
                ],
                destTime: "Consulta por tu sede",
                returnTime: "Acorde a cada sede",
                stops: [
                    "Santa Barbara", "La Isla", "Cabos del Lago", "La Alameda",
                    "Alisos", "Castores", "Centro Comercial", "Altamira",
                    "Kansas", "Rincon de la Costa", "Punto Tigre", "Tomkinson y Ramal Tigre"
                ],
                times: ["07:00", "07:02", "07:04", "07:06", "07:08", "07:11", "07:13", "07:16", "07:19", "07:23", "07:32", "07:38", "07:30", "07:39"]
            },
            "ditella": {

            }
        },
        "canning": {
            "uade": {
                name: "Canning - UADE",
                map: "./mapas/mapa_canning_uade.jpg",
                shifts: [
                    { id: "ida", label: "Turno Mañana" }
                ],
                destTime: "07:40",
                returnTime: "12:30",
                stops: [
                    "El Solar", "Don Joaquin", "El Lauquen", "Shell ruta 58 y 16",
                    "Malibu", "El Rebenque", "Terralagos", "Saint Thomas 2",
                    "Saint Thomas 1", "Rotonda grilli y ruta 58", "Las Toscas"
                ],
                times: ["05:45", "05:50", "05:55", "06:00", "06:05", "06:10", "06:20", "06:25", "06:27", "06:30", "06:35"]
            },
            "uca": {
                name: "Canning - UCA",
                map: "./mapas/mapa_canning_uca.jpg",
                shifts: [
                    { id: "ida", label: "Turno Mañana" }
                ],
                destTime: "07:20",
                returnTime: "13:20",
                stops: [
                    "El Solar", "Don Joaquin", "El Lauquen", "Shell ruta 58 y 16",
                    "Malibu", "El Rebenque", "Terralagos", "Saint Thomas 2",
                    "Saint Thomas 1", "Rotonda grilli y ruta 58", "Las Toscas"
                ],
                times: ["05:45", "05:50", "05:55", "06:00", "06:05", "06:10", "06:20", "06:25", "06:27", "06:30", "06:35"]
            }
        }
    };

    // 2. FUNCIÓN DE RENDERIZADO (Componente dinámico)
    const renderDetailedCard = (origin, dest) => {
        const data = ROUTES_DATA[origin]?.[dest];
        if (!data) return null;

        const container = document.getElementById('detailed-routes-container');
        const template = document.getElementById('detailed-route-template');

        // Evitar duplicados
        const existingCard = container.querySelector(`.detailed-route-card[data-origin="${origin}"][data-dest="${dest}"]`);
        if (existingCard) return existingCard;

        const clone = template.content.cloneNode(true);
        const card = clone.querySelector('.detailed-route-card');

        card.setAttribute('data-origin', origin);
        card.setAttribute('data-dest', dest);
        card.querySelector('.route-title-text').textContent = data.name;
        card.querySelector('.stops-count').textContent = data.stops.length + 1;
        card.querySelector('.actual-map-img').src = data.map;
        card.querySelector('.actual-map-img').alt = `Mapa de la ruta ${data.name}`;

        // Renderizar Tabs
        const tabsWrapper = card.querySelector('.schedule-tabs');
        const contentsWrapper = card.querySelector('.tabs-content-wrapper');

        data.shifts.forEach((shift, index) => {
            const btn = document.createElement('button');
            btn.className = `tab-btn ${index === 0 ? 'active' : ''}`;
            btn.setAttribute('data-tab', shift.id);
            btn.textContent = shift.label;
            tabsWrapper.appendChild(btn);

            const contentDiv = document.createElement('div');
            contentDiv.className = `tab-content ${index === 0 ? 'active' : ''}`;
            contentDiv.setAttribute('data-tab', shift.id);
            if (index !== 0) contentDiv.style.display = 'none';

            const timeline = document.createElement('ul');
            timeline.className = 'timeline scrollable-timeline';

            // Agregar Paradas
            data.stops.forEach((stop, i) => {
                const li = document.createElement('li');
                li.innerHTML = `<div class="time">${data.times[i]}</div><div class="stop">${stop}</div>`;
                timeline.appendChild(li);
            });

            // Agregar Destino Final
            const finalLi = document.createElement('li');
            finalLi.innerHTML = `<div class="time">${data.destTime}</div><div class="stop">${dest.toUpperCase()}</div>`;
            timeline.appendChild(finalLi);

            // Agregar Vuelta
            const returnLi = document.createElement('li');
            returnLi.className = 'return-stop';
            returnLi.innerHTML = `<div class="time">${data.returnTime}</div><div class="stop">Vuelta</div>`;
            timeline.appendChild(returnLi);

            contentDiv.appendChild(timeline);
            contentsWrapper.appendChild(contentDiv);

            // Re-vincular eventos a los nuevos botones
            btn.addEventListener('click', (e) => handleTabClick(e, card));
        });

        container.appendChild(clone);
        return container.querySelector(`.detailed-route-card[data-origin="${origin}"][data-dest="${dest}"]`);
    };

    const handleTabClick = (e, card) => {
        const btn = e.currentTarget;
        const container = card.querySelector('.detailed-schedule-container');
        const allBtns = container.querySelectorAll('.tab-btn');
        const allContent = container.querySelectorAll('.tab-content');

        allBtns.forEach(b => b.classList.remove('active'));
        allContent.forEach(content => {
            content.style.display = 'none';
            content.classList.remove('active');
        });

        btn.classList.add('active');
        const tabId = btn.getAttribute('data-tab');
        const targetContent = container.querySelector(`.tab-content[data-tab="${tabId}"]`);

        if (targetContent) {
            targetContent.style.display = 'block';
            setTimeout(() => {
                targetContent.classList.add('active');
                const timeline = targetContent.querySelector('.scrollable-timeline');
                if (timeline) {
                    initTimelineScroll(timeline);
                    timeline.dispatchEvent(new Event('scroll'));
                }
            }, 10);
        }
        updateReserveLink(card, btn.textContent.trim());
    };

    const updateReserveLink = (card, shiftName) => {
        const reserveBtn = card.querySelector('.reserve-btn');
        if (reserveBtn) {
            const routeTitle = card.querySelector('.route-title-text').textContent.trim();
            const message = `Hola! Quiero más información sobre la ruta ${routeTitle} (${shiftName})`;
            reserveBtn.href = `https://wa.me/541162639058?text=${encodeURIComponent(message)}`;
        }
    };

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const origin = originSelect.value;
        const dest = destSelect.value;

        if (!origin && !dest) {
            activeRoutesSection.style.display = "none";
            return;
        }

        activeRoutesSection.style.display = "block";

        // Limpiar tarjetas dinámicas anteriores o decidir si se mantienen
        document.getElementById('detailed-routes-container').innerHTML = '';

        let found = false;

        // 1. Intentar renderizar tarjeta detallada si existe en el DATA
        const detailedCard = renderDetailedCard(origin, dest);
        if (detailedCard) {
            detailedCard.style.display = 'flex';
            found = true;

            // Inicializar link y scroll inicial
            const activeTab = detailedCard.querySelector('.tab-btn.active');
            updateReserveLink(detailedCard, activeTab.textContent.trim());
            const activeTimeline = detailedCard.querySelector('.tab-content.active .scrollable-timeline');
            if (activeTimeline) initTimelineScroll(activeTimeline);
        }

        // 2. Gestionar tarjetas estáticas (si hubiera mas generales)
        routeCards.forEach(card => {
            if (card.classList.contains('detailed-route-card')) return; // Saltar ya que las manejamos dinámicamente

            const cardOrigin = card.getAttribute("data-origin");
            const cardDest = card.getAttribute("data-dest");

            const matchOrigin = !origin || origin === cardOrigin;
            const matchDest = !dest || dest === cardDest;

            if (matchOrigin && matchDest) {
                card.style.display = "block";
                found = true;
            } else {
                card.style.display = "none";
            }
        });

        if (found) {
            activeRoutesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        const existingMsg = document.getElementById("no-route-msg");
        if (existingMsg) existingMsg.remove();

        if (!found) {
            const msg = document.createElement("p");
            msg.id = "no-route-msg";
            msg.textContent = "No hay rutas activas para esta combinación. Por favor, realiza una consulta personalizada.";
            msg.style.textAlign = "center";
            msg.style.padding = "2rem";
            msg.style.color = "var(--color-text-mutted)";
            msg.style.gridColumn = "1 / -1";
            routesContainer.appendChild(msg);
        }
    });

    // 3. Lógica de Scroll Progress (Ahora como función reutilizable)
    const initTimelineScroll = (timeline) => {
        const updateScrollProgress = () => {
            const scrollTop = timeline.scrollTop;
            const scrollHeight = timeline.scrollHeight;
            const clientHeight = timeline.clientHeight;
            const maxScroll = scrollHeight - clientHeight;

            let scrollFraction = maxScroll > 0 ? scrollTop / maxScroll : 0;
            const isAtBottom = maxScroll > 0 && (scrollTop + clientHeight >= scrollHeight - 5);
            timeline.style.setProperty('--scroll-active', isAtBottom ? 1 : scrollFraction);

            const items = timeline.querySelectorAll('li');
            const focusLine = scrollTop + (clientHeight * 0.6);

            items.forEach((item, index) => {
                const itemTop = item.offsetTop;
                const isReturn = item.classList.contains('return-stop');
                if ((index === 0 || itemTop <= focusLine || isAtBottom) && !isReturn) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        };

        timeline.addEventListener('scroll', updateScrollProgress);
        window.addEventListener('resize', updateScrollProgress);
        updateScrollProgress();
    };

    // Animaciones iniciales
    gsap.from(".uni-hero-content h1", { y: 30, opacity: 0, duration: 0.8, ease: "power3.out", delay: 0.2 });
    gsap.from(".uni-hero-content p", { y: 30, opacity: 0, duration: 0.8, ease: "power3.out", delay: 0.4 });
    gsap.from(".route-selector-container", { y: 40, opacity: 0, duration: 0.8, ease: "power3.out", delay: 0.6 });

    // 4. Acordeón FAQ
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const btn = item.querySelector('.faq-question');
        btn.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');

            // Cerrar todos los items abiertos
            faqItems.forEach(i => {
                i.classList.remove('open');
                i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });

            // Abrir el actual (si no estaba ya abierto)
            if (!isOpen) {
                item.classList.add('open');
                btn.setAttribute('aria-expanded', 'true');
            }
        });
    });
});

