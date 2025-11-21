document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================================================
    // 1. Base de Datos de los Planes y la Firma de Identidad Digital
    // =========================================================================

    // Datos de la Firma de Identidad Digital (Firma que acompaña a todos los planes)
    const identidadDigitalSignature = [
        "Diagnóstico profundo: propósito, objetivos y público meta.",
        "Estrategia de presencia digital y narrativa visual coherente.",
        "Recomendaciones de arquitectura y tecnología sostenible."
    ];

    // Base de Datos de los Planes
    const planDetails = {
        "PlanIdentidadDigital": {
            title: "Plan Identidad Digital",
            tagline: "El primer paso firme hacia tu presencia online.",
            description: "Dirigido a emprendedores y profesionales que ingresan al mundo digital, buscando una base escalable y profesional.",
            includes: [
                "Diseño visual a medida y UX/UI básica.",
                "1 sección estructurada con narrativa clara (presentación o lead).",
                "Integración de formulario o WhatsApp Business.",
                "Optimización de código y SEO inicial.",
                "Diseño responsive (móvil y escritorio)."
            ],
            value: "Desde $280.000 CLP"
        },
        "PlanPresenciaPyme": {
            title: "Plan Presencia Pyme",
            tagline: "Estructura, confianza y proyección para tu negocio establecido.",
            description: "Ideal para negocios que buscan una imagen profesional completa con múltiples secciones y foco en la confianza.",
            includes: [
                "4 a 6 secciones clave (Inicio, Servicios, Nosotros, Contacto).",
                "Identidad visual avanzada + UX/UI personalizada.",
                "Integración de mapas y formularios inteligentes.",
                "Optimización de carga y estructura SEO avanzada.",
                "Preparado para futuras integraciones (blog, e-commerce)."
            ],
            value: "Desde $550.000 CLP"
        },
        "PlanComercioEvolutivo": {
            title: "Plan Comercio Evolutivo",
            tagline: "Vender online con bases firmes y crecimiento asegurado.",
            description: "Dirigido a empresas o tiendas que necesitan vender productos en línea con una pasarela de pago segura y gestión de pedidos.",
            includes: [
                "Diseño profesional de e-commerce y branding digital.",
                "Catálogo de productos escalable.",
                "Integración de pasarela de pago (WebPay / PayPal / Flow).",
                "Roles de usuario (admin, vendedor, cliente).",
                "Seguridad SSL, validaciones y capacitación en gestión de pedidos."
            ],
            value: "Desde $850.000 – $1.200.000 CLP"
        }
    };

    // =========================================================================
    // 2. Funcionalidad de Smooth Scroll (Desplazamiento Suave)
    // =========================================================================

    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Asegurar que los botones clave apunten a los IDs correctos
    const heroCta = document.querySelector('.btn-cta-hero');
    if (heroCta) heroCta.setAttribute('href', '#servicios');

    const headerCta = document.querySelector('.btn-cta-header');
    if (headerCta) headerCta.setAttribute('href', '#contacto');


    // =========================================================================
    // 3. Funcionalidad del Modal de Planes (Al hacer clic en las tarjetas)
    // =========================================================================

    const modal = document.getElementById('plan-modal');
    const closeBtn = document.querySelector('.close-button');
    const cards = document.querySelectorAll('.plan-card[data-plan]'); // Selecciona solo las tarjetas con data-plan

    const populateList = (elementId, items) => {
        const listElement = document.getElementById(elementId);
        listElement.innerHTML = '';
        items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            listElement.appendChild(li);
        });
    };
    
    const openPlanModal = (planKey) => {
        const data = planDetails[planKey];

        if (data) {
            document.getElementById('modal-title').textContent = data.title;
            document.getElementById('modal-tagline').textContent = data.tagline;
            document.getElementById('modal-value').textContent = `Inversión: ${data.value}`;

            populateList('modal-includes', data.includes);
            populateList('modal-identity-includes', identidadDigitalSignature);

            modal.style.display = 'block'; 
        }
    };
    
    // Asignar el evento click a cada tarjeta
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const planKey = card.getAttribute('data-plan'); 
            if (planKey) {
                openPlanModal(planKey);
            }
        });
    });

    // Cierre del modal
    closeBtn.addEventListener('click', () => { modal.style.display = 'none'; });
    window.addEventListener('click', (event) => { 
        if (event.target === modal) { modal.style.display = 'none'; } 
    });
    document.addEventListener('keydown', (event) => { 
        if (event.key === 'Escape' && modal.style.display === 'block') { modal.style.display = 'none'; } 
    });
    
    // 4. Actualizar Año del Copyright (Movido dentro del DOMContentLoaded)
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
});