document.addEventListener('DOMContentLoaded', () => {

    // =========================================================================
    // 1. Base de Datos de los Planes y la Firma de Identidad Digital
    // =========================================================================

    const identidadDigitalSignature = [
        "Diagnóstico profundo: propósito, objetivos y público meta.",
        "Estrategia de presencia digital y narrativa visual coherente.",
        "Recomendaciones de arquitectura y tecnología sostenible."
    ];

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
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Cerrar menú móvil si está abierto
                const nav = document.querySelector('.main-nav');
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                }

                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // =========================================================================
    // 3. Funcionalidad del Modal de Planes
    // =========================================================================

    const modal = document.getElementById('plan-modal');
    const closeBtn = document.querySelector('.close-button');
    const cards = document.querySelectorAll('.plan-card[data-plan]');
    const modalCtaButton = document.querySelector('.btn-modal-cta');
    const footerPlanLinks = document.querySelectorAll('.footer-services ul li a[data-plan]');

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
            modal.setAttribute('aria-hidden', 'false');
        }
    };

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const planKey = card.getAttribute('data-plan');
            if (planKey) {
                openPlanModal(planKey);
            }
        });
    });

    footerPlanLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const planKey = link.getAttribute('data-plan');
            if (planKey) {
                openPlanModal(planKey);
            }
        });
    });

    const closeModal = () => {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
    };

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    window.addEventListener('click', (event) => {
        if (event.target === modal) { closeModal(); }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display === 'block') { closeModal(); }
    });

    if (modalCtaButton) {
        modalCtaButton.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            closeModal();

            if (targetElement) {
                setTimeout(() => {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 300); // Pequeño delay para permitir que el modal cierre visualmente
            }
        });
    }

    // =========================================================================
    // 4. Header Flotante
    // =========================================================================

    const floatingWrapper = document.getElementById('floating-header-wrapper');
    const mainHeader = document.getElementById('main-header');

    // Usar IntersectionObserver para mejor rendimiento
    if (mainHeader && floatingWrapper) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    floatingWrapper.style.transform = 'translateY(0)';
                } else {
                    floatingWrapper.style.transform = 'translateY(-100%)';
                }
            });
        }, { threshold: 0 });

        observer.observe(mainHeader);
    }

    // =========================================================================
    // 5. Menú Móvil
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
});