/**
 * Graffiti Program - Main JavaScript File
 * https://www.graffitiprogram.com
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize header scroll effect
    initHeaderScroll();
    
    // Initialize mobile navigation
    initMobileNav();
    
    // Initialize members carousel
    initMembersCarousel();
    
    // Initialize newsletter form
    initNewsletterForm();
});

/**
 * Handle header scroll effect
 */
function initHeaderScroll() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/**
 * Handle mobile navigation
 */
function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    hamburger.addEventListener('click', () => {
        nav.classList.toggle('active');
        
        // Change hamburger to X
        const spans = hamburger.querySelectorAll('span');
        spans.forEach(span => span.classList.toggle('active'));
    });
    
    // Close menu when clicking a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                
                // Revert X to hamburger
                const spans = hamburger.querySelectorAll('span');
                spans.forEach(span => span.classList.remove('active'));
            }
        });
    });
    
    // Add active class to current page link
    const currentLocation = location.href;
    navLinks.forEach(link => {
        if (link.href === currentLocation) {
            link.classList.add('active');
        }
    });
}

/**
 * Handle members carousel
 */
function initMembersCarousel() {
    const carousel = document.querySelector('.members-carousel');
    const prevBtn = document.querySelector('.carousel-controls .prev');
    const nextBtn = document.querySelector('.carousel-controls .next');
    
    if (!carousel || !prevBtn || !nextBtn) return;
    
    let scrollAmount = 0;
    const cardWidth = 270; // Card width + gap
    
    nextBtn.addEventListener('click', () => {
        scrollAmount += cardWidth;
        if (scrollAmount > carousel.scrollWidth - carousel.clientWidth) {
            scrollAmount = carousel.scrollWidth - carousel.clientWidth;
        }
        carousel.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
    
    prevBtn.addEventListener('click', () => {
        scrollAmount -= cardWidth;
        if (scrollAmount < 0) {
            scrollAmount = 0;
        }
        carousel.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
    
    // Update carousel on window resize
    window.addEventListener('resize', () => {
        scrollAmount = carousel.scrollLeft;
    });
}

/**
 * Handle newsletter form submission
 */
function initNewsletterForm() {
    const form = document.querySelector('.newsletter-form');
    
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]').value;
        
        // Simulate form submission
        if (email) {
            // Replace with actual API call
            console.log('Newsletter subscription for:', email);
            
            // Show success message
            const formParent = form.parentElement;
            form.style.display = 'none';
            
            const successMsg = document.createElement('p');
            successMsg.textContent = 'Thanks for subscribing!';
            successMsg.style.color = '#4cd137';
            formParent.appendChild(successMsg);
            
            // Reset form
            setTimeout(() => {
                form.reset();
                form.style.display = 'flex';
                formParent.removeChild(successMsg);
            }, 3000);
        }
    });
}

/**
 * Add animation on scroll
 */
window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.fade-in');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('visible');
        }
    });
});

// Add testimonial slider if needed in the future
// This is a placeholder for potential expansion
function initTestimonialSlider() {
    // Implementation would go here
}

/**
 * Helper function for smooth scrolling to anchors
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href') !== '#') {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        }
    });
});