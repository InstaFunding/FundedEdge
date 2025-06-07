// Mobile Menu Toggle
function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileOverlay = document.getElementById('mobileOverlay');
    
    navLinks.classList.toggle('active');
    mobileToggle.classList.toggle('active');
    mobileOverlay.classList.toggle('active');
}

function closeMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileOverlay = document.getElementById('mobileOverlay');
    
    navLinks.classList.remove('active');
    mobileToggle.classList.remove('active');
    mobileOverlay.classList.remove('active');
    
    // Close all dropdowns
    document.querySelectorAll('.dropdown').forEach(dropdown => {
        dropdown.classList.remove('active');
    });
}

function toggleDropdown(element) {
    if (window.innerWidth <= 768) {
        element.classList.toggle('active');
    }
}

function toggleTheme() {
    // Theme toggle functionality
    console.log('Theme toggle clicked');
}

// Close mobile menu when clicking on nav links
document.querySelectorAll('.nav-link, .cdf-button, .dropdown-item').forEach(link => {
    link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && !e.target.closest('.dropdown')) {
            closeMobileMenu();
        }
    });
});

// Close mobile menu on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
});