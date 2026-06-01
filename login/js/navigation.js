/**
 * Navigation Enhancements
 * Adds smooth scrolling and scroll effects to the navigation
 */

document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navLinks = document.querySelectorAll('.nav-link:not(.dropdown-toggle)');
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    // Add scroll effect to navbar
    function handleScroll() {
        if (!navbar) return;
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    }

    // Initialize scroll effect
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run once on load

    // Close mobile menu when clicking a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 991.98) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, {toggle: false});
                bsCollapse.hide();
            }
        });
    });

    // Add active class to current page in navigation
    const currentPath = window.location.pathname;
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
            // Also mark parent dropdown item as active if exists
            const parentDropdown = link.closest('.dropdown');
            if (parentDropdown) {
                parentDropdown.querySelector('.dropdown-toggle').classList.add('active');
            }
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') {
                e.preventDefault();
                return;
            }
            
            try {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault(); // Apenas previne o comportamento padrão se o alvo existir
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            } catch (error) {
                // Se o targetId for um seletor inválido (ex: uma URL), ignora o erro e permite que o link funcione normalmente.
                console.warn(`Smooth scroll failed for selector: ${targetId}. Allowing default link behavior.`);
            }
        });
    });

    // Add animation to dropdown menus
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('shown.bs.dropdown', function() {
            const dropdownMenu = this.nextElementSibling;
            dropdownMenu.style.animation = 'fadeIn 0.2s ease-out forwards';
        });
    });

    // Initialize dropdowns to work on click for all screen sizes
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        // Add animation when dropdown is shown
        toggle.addEventListener('shown.bs.dropdown', function() {
            menu.style.animation = 'fadeIn 0.2s ease-out forwards';
        });
    });
});

// Add resize event to handle mobile/desktop transitions
let isMobile = window.innerWidth <= 991.98;
window.addEventListener('resize', function() {
    const newIsMobile = window.innerWidth <= 991.98;
    if (isMobile !== newIsMobile) {
        isMobile = newIsMobile;
        // Reload the page when crossing the mobile/desktop threshold
        // This ensures proper initialization of hover effects
        window.location.reload();
    }
});