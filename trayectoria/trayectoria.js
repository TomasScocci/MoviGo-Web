/**
 * trayectoria.js
 * Script para manejar el renderizado dinámico e interactivo de la historia de la marca
 */

document.addEventListener("DOMContentLoaded", () => {
    // Array de datos - Fácilmente editable para agregar nuevos puntos
    const trayectoriaData = [
        {
            title: "El comienzo del viaje",
            date: "Septiembre 2018",
            image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800",
            description: "Nuestra fundadora identificó una necesidad insatisfecha en el transporte corporativo y de eventos, lanzando la primera flota con tan solo dos vehículos pero con una visión inquebrantable de calidad y puntualidad.",
            link: "#"
        },
        {
            title: "Expansión Regional",
            date: "Marzo 2020",
            image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800",
            description: "A pesar de los desafíos globales, logramos expandir nuestra cobertura a todo el nivel regional. Nos reinventamos adaptando nuestros protocolos estandarizados e implementando rutas universitarias esenciales.",
            link: "#"
        },
        {
            title: "Party Bus y Nuevas Experiencias",
            date: "Mayo 2022",
            image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800",
            description: "Con el objetivo de innovar, se incorpora la exitosa línea Party Bus. Transformamos por completo el concepto de traslados al introducir experiencias premium y entretenimiento interactivo directamente a bordo.",
            link: "#"
        },
        {
            title: "MoviGO Tech & Futuro",
            date: "Enero 2024",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
            description: "Empezamos nuestro proceso de transformación digital. Creamos plataformas enfocadas 100% en el usuario para brindar cotizaciones en tiempo real y gestión inteligente de todas nuestras unidades. Hacia el futuro, sin detenernos.",
            link: "#"
        }
    ];

    const timelineContainer = document.getElementById("timeline-container");

    // Función para renderizar el array en HTML
    if (timelineContainer && trayectoriaData.length > 0) {
        trayectoriaData.forEach((item, index) => {
            const article = document.createElement("article");
            article.className = "timeline-item";
            // Añadir un retardo al cargar basado en el index de la data para stagger si ya estan en pantalla
            article.style.transitionDelay = `${index * 0.15}s`;

            article.innerHTML = `
                <div class="timeline-dot"></div>
                <div class="timeline-card">
                    <div class="timeline-image-container">
                        <img src="${item.image}" alt="${item.title}" class="timeline-image" loading="lazy">
                    </div>
                    <div class="timeline-content">
                        <div class="timeline-header">
                            <span class="timeline-date">${item.date}</span>
                            <h3>${item.title}</h3>
                        </div>
                        <p>${item.description}</p>
                        <a href="${item.link}" class="timeline-link" aria-label="Leer más sobre ${item.title}">
                            Saber más <i class="ph ph-arrow-right"></i>
                        </a>
                    </div>
                </div>
            `;
            timelineContainer.appendChild(article);
        });
    }

    /**
     * Lógica de Intersección (Scroll Reveal)
     * Añade la clase 'visible' cuando el elemento entra en el viewport
     */
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.15 // El 15% del elemento debe ser visible para disparar la animacion
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Removemos el delay seteado dinamicamente para que los hovers fluyan rápido
                setTimeout(() => {
                    entry.target.style.transitionDelay = "0s";
                }, 1000);
                
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // Dejamos de observarlo para que quede fijo
            }
        });
    }, observerOptions);

    // Seleccionamos todos los items creados para observarlos
    const items = document.querySelectorAll(".timeline-item");
    items.forEach(item => {
        scrollObserver.observe(item);
    });
});
