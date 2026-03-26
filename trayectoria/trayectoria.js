/**
 * trayectoria.js
 * Script para manejar el renderizado dinámico e interactivo de la historia de la marca
 */

document.addEventListener("DOMContentLoaded", () => {
    // Array de datos - Fácilmente editable para agregar nuevos puntos
    const trayectoriaData = [
        {
            title: "La creación de MoviGO",
            date: "Marzo 2023",
            image: "imagenes/infobae.jpg",
            description: "MoviGO nace con el objetivo de ofrecer un servicio de transporte seguro, cómodo y confiable para estudiantes. Viendo que muchos estudiantes tenian problemas para llegar a las universidades de capital desde provincia, teniendo que hacer combinaciones de trenes, subtes y colectivos o haciendo pool.",
        },
        {
            title: "Primer Año",
            date: "Marzo 2024",
            image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800",
            description: "A pesar de los desafíos y las imperfecciones propias de un emprendimiento nuevo, MoviGO logró crecer y expandirse a nuevas rutas y universidades. Logró corregir los problemas iniciales y los inconvenientes que surgian dia a dia, garantizando el servicio de calidad.",
        },
        {
            title: "Endeavor Sub-20",
            date: "Abril 2025",
            image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800",
            description: "Junto a Nicki Nicole y Colapinto,Melina es seleccionada para participar en el programa Endeavor Sub-20, una iniciativa que busca fomentar el emprendimiento en jóvenes, hablando en el Movistar Arena frente a +1000 personas, contando su historia y la de MoviGO.",
            link: "https://youtu.be/cRmOawt0YJs?si=CWOim3QPCC1YCOkb"
        },
        {
            title: "Nota en iProUp",
            date: "Mayo 2025",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
            description: "IproUp, un medio especializado en startups, se interesa en la historia de MoviGO y Melina, publicando una nota sobre su historia y la de MoviGO.",
            link: "https://www.iproup.com/startups/55732-nicki-nicole-y-colapinto-juntos-en-evento-de-startups-el-mensaje-a-los-jovenes"
        },
        {
            title: "Nota en Infobae",
            date: "Mayo 2025",
            image: "imagenes/infobae.jpg",
            description: "Infobae, después del speach de Melina en Endeavor, se interesa en la historia de MoviGO y Melina, publicando una nota sobre su historia y la de MoviGO.",
            link: "https://www.infobae.com/economia/2025/05/04/la-historia-de-3-emprendedores-sub-20-como-detectar-oportunidades-en-la-adversidad/"
        },
        {
            title: "Entrevista en F5",
            date: "Mayo 2025",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
            description: "Melina es invitada a F5, de LovestTV, un programa de radio, para contar su historia y la de MoviGO.",
            link: "https://www.youtube.com/watch?v=eW-Fx5OBCvE"
        },
        {
            title: "Talento Argentino",
            date: "Mayo 2025",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
            description: "Melina en Talento Argetino! ¨Melina Caporalettii empezó su camino como emprendedora con solo 14 años y, tras varias experiencias en el camino, hoy es la fundadora de MoviGO; un servicio de transporte para alumnos que da trabajo a 12 personas¨ .",
            link: "https://www.instagram.com/reel/DJuq5w7JfDR/"
        },


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
                        ${item.link ? `
                        <a href="${item.link}" class="timeline-link" aria-label="Leer más sobre ${item.title}">
                            Saber más <i class="ph ph-arrow-right"></i>
                        </a>` : ''}
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
