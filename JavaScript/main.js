/**
 * DOJA S.A.S - Main JavaScript File
 * Funciones principales para el sitio web
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== SMOOTH SCROLLING =====
    initSmoothScrolling();
    
    // ===== NAVBAR ACTIVE STATE =====
    initNavbarActiveState();
    
    // ===== TAB NAVIGATION =====
    initTabNavigation();
    
    // ===== ANIMATIONS =====
    initScrollAnimations();
    
    // ===== FORM VALIDATION =====
    initFormValidation();
    
    // ===== MOBILE MENU =====
    initMobileMenu();
    
    // ===== WHATSAPP BUTTON =====
    initWhatsAppButton();
    
    // ===== NAVBAR SCROLL =====
    initNavbarScroll();
    
    // ===== IMAGE ERROR HANDLING =====
    initImageErrorHandling();
});

/**
 * Inicializar smooth scrolling para enlaces internos
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navbar = document.querySelector('.navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 80;
                const targetPosition = target.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Actualizar estado activo del navbar al hacer scroll
 */
function initNavbarActiveState() {
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        const navbar = document.querySelector('.navbar');
        const navbarHeight = navbar ? navbar.offsetHeight : 80;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 100;
            const sectionHeight = section.clientHeight;
            const scrollY = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.navbar-nav a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

/**
 * Mejorar navegación de pestañas
 */
function initTabNavigation() {
    document.querySelectorAll('[data-bs-toggle="pill"]').forEach(tab => {
        tab.addEventListener('shown.bs.tab', function (e) {
            // Scroll suave al contenido de la pestaña activa
            const targetId = e.target.getAttribute('data-bs-target');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbar = document.querySelector('.navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 80;
                const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
            
            // Actualizar URL si estamos en la página de servicios
            if (window.location.pathname.includes('servicios.html')) {
                const tabId = targetId.substring(1);
                if (history.replaceState) {
                    history.replaceState(null, null, '#' + tabId);
                }
            }
        });
    });
    
    // Manejar navegación directa a pestañas desde URL (para página de servicios)
    if (window.location.pathname.includes('servicios.html')) {
        const hash = window.location.hash;
        if (hash) {
            setTimeout(() => {
                const tabId = hash.substring(1);
                const tabButton = document.getElementById(tabId + '-tab');
                const tabContent = document.getElementById(tabId);
                
                if (tabButton && tabContent) {
                    // Remover clase active de todas las pestañas
                    document.querySelectorAll('.nav-link[data-bs-toggle="pill"]').forEach(tab => {
                        tab.classList.remove('active');
                    });
                    document.querySelectorAll('.tab-pane').forEach(pane => {
                        pane.classList.remove('show', 'active');
                    });
                    
                    // Activar la pestaña específica
                    tabButton.classList.add('active');
                    tabContent.classList.add('show', 'active');
                    
                    // Hacer scroll suave a la sección después de un pequeño delay
                    setTimeout(() => {
                        const navbar = document.querySelector('.navbar');
                        const navbarHeight = navbar ? navbar.offsetHeight : 80;
                        const targetPosition = tabContent.offsetTop - navbarHeight - 20;
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }, 200);
                }
            }, 100);
        }
    }
}

/**
 * Inicializar animaciones de scroll
 */
function initScrollAnimations() {
    // Verificar si IntersectionObserver está disponible
    if (!('IntersectionObserver' in window)) {
        // Fallback para navegadores antiguos
        document.querySelectorAll('.service-card').forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
        return;
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Aplicar animación a las tarjetas de servicios
    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Aplicar animación a elementos con clase específica
    document.querySelectorAll('.animate-on-scroll').forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity 0.8s ease ${index * 0.2}s, transform 0.8s ease ${index * 0.2}s`;
        observer.observe(element);
    });
}

/**
 * Validación básica de formularios
 */
function initFormValidation() {
    const forms = document.querySelectorAll('.needs-validation');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    });
}

/**
 * Mejorar funcionalidad del menú móvil
 */
function initMobileMenu() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        // Cerrar menú móvil al hacer clic en un enlace
        document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            });
        });
        
        // Cerrar menú móvil al hacer clic fuera de él
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navbarCollapse.contains(event.target) || 
                                   navbarToggler.contains(event.target);
            
            if (!isClickInsideNav && navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    }
}

/**
 * Función para manejar el botón de WhatsApp flotante
 */
function initWhatsAppButton() {
    const whatsappButton = document.querySelector('.whatsapp-float');
    
    if (whatsappButton) {
        // Agregar efecto de hover mejorado
        whatsappButton.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        whatsappButton.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        // Tracking de clicks para analytics (opcional)
        whatsappButton.addEventListener('click', function() {
            trackEvent('Contact', 'WhatsApp Click', 'Float Button');
        });
    }
}

/**
 * Función para manejar el scroll del navbar
 */
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Agregar/remover clase de scroll
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
}

/**
 * Función para manejar errores de imágenes
 */
function initImageErrorHandling() {
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            // Reemplazar con imagen placeholder si falla la carga
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y4ZjlmYSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM2Yjc4ODQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZW4gbm8gZGlzcG9uaWJsZTwvdGV4dD48L3N2Zz4=';
            this.alt = 'Imagen no disponible';
        });
    });
}

/**
 * Función para validación de email
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Función para validación de teléfono colombiano
 */
function isValidColombianPhone(phone) {
    const phoneRegex = /^(\+57|57)?[0-9]{10}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * Función para formatear números de teléfono
 */
function formatPhoneNumber(phone) {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    
    if (match) {
        return `${match[1]} ${match[2]} ${match[3]}`;
    }
    
    return phone;
}

/**
 * Función para detectar el dispositivo
 */
function getDeviceType() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    
    if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
        return 'tablet';
    }
    
    if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(userAgent)) {
        return 'mobile';
    }
    
    return 'desktop';
}

/**
 * Función para tracking de eventos (para analytics)
 */
function trackEvent(category, action, label) {
    // Integración con Google Analytics o similar
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label || ''
        });
    }
    
    // También registrar en consola para debugging
    console.log(`Event tracked: ${category} - ${action} - ${label || ''}`);
}

/**
 * Función para manejar tooltips de Bootstrap
 */
function initTooltips() {
    // Verificar si Bootstrap está disponible
    if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
}

/**
 * Función para manejar el scroll to top
 */
function initScrollToTop() {
    const scrollTopBtn = document.querySelector('.scroll-to-top');
    
    if (scrollTopBtn) {
        window.addEventListener('scroll', function() {
            const scrollY = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollY > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });
        
        scrollTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Funciones que necesitan que la página esté completamente cargada
window.addEventListener('load', function() {
    // Inicializar tooltips
    initTooltips();
    
    // Inicializar scroll to top
    initScrollToTop();
    
    // Ocultar preloader si existe
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 300);
    }
    
    console.log('DOJA S.A.S website loaded successfully');
});

// Manejar cambios de orientación en dispositivos móviles
window.addEventListener('orientationchange', function() {
    setTimeout(function() {
        // Recalcular posiciones si es necesario
        const currentScrollX = window.scrollX || window.pageXOffset;
        const currentScrollY = window.scrollY || window.pageYOffset;
        window.scrollTo(currentScrollX, currentScrollY);
    }, 100);
});

// Exportar funciones para uso global si es necesario
if (typeof window !== 'undefined') {
    window.DOJAUtils = {
        isValidEmail: isValidEmail,
        isValidColombianPhone: isValidColombianPhone,
        formatPhoneNumber: formatPhoneNumber,
        getDeviceType: getDeviceType,
        trackEvent: trackEvent
    };
}