/**
 * Graffiti Program - Main JavaScript File
 * https://www.graffitiprogram.com
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all existing functionality
    initHeaderScroll();
    initMobileNav();
    initMembersCarousel();
    initNewsletterForm();
    
    // Add new animation triggers
    initAnimations();
    
    // Add new enhancements
    initSmoothReveal();
    initHeroParallax();
    initTeamHover();
    
    // Add intersection observer for member cards
    const memberCards = document.querySelectorAll('.member-card');
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '50px'
    };

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.setProperty('--card-order', entry.target.dataset.order);
                entry.target.classList.add('visible');
                cardObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    memberCards.forEach((card, index) => {
        card.dataset.order = index;
        cardObserver.observe(card);
    });
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
    
    // Remove the dynamic addition of the Spotlight link
    // const navList = document.querySelector('nav ul');
    // const spotlightLink = document.createElement('li');
    // spotlightLink.innerHTML = '<a href="spotlight.html">Spotlight</a>';
    // navList.appendChild(spotlightLink);
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

/**
 * Initialize animations for elements
 */
function initAnimations() {
    // Add fade-in class to elements that should animate
    const animatedElements = [
        '.about-content',
        '.feature-card',
        '.member-card',
        '.testimonial-card',
        '.team-member',
        '.value-card'
    ];
    
    animatedElements.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('fade-in');
        });
    });
    
    // Check for elements in view on load
    checkElementsInView();
    
    // Check for elements in view on scroll
    window.addEventListener('scroll', checkElementsInView);
}

/**
 * Check if elements are in viewport and add visible class
 */
function checkElementsInView() {
    const fadeElements = document.querySelectorAll('.fade-in');
    const triggerBottom = window.innerHeight * 0.8;
    
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < triggerBottom) {
            element.classList.add('visible');
        }
    });
}

/**
 * Handle member card hover effects
 */
function initMemberHoverEffects() {
    const memberCards = document.querySelectorAll('.member-card');
    
    memberCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = 'var(--shadow-lg)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'var(--shadow-sm)';
        });
    });
}

// Initialize member hover effects
document.addEventListener('DOMContentLoaded', initMemberHoverEffects);

/**
 * Smooth reveal animation for sections
 */
function initSmoothReveal() {
    const sections = document.querySelectorAll('section');
    const options = {
        root: null,
        threshold: 0.1,
        rootMargin: '-50px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    sections.forEach(section => {
        section.classList.add('reveal-section');
        observer.observe(section);
    });
}

/**
 * Parallax effect for hero section
 */
function initHeroParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    });
}

/**
 * Enhanced team member hover effects
 */
function initTeamHover() {
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', (e) => {
            const info = member.querySelector('.member-info');
            const img = member.querySelector('img');
            
            gsap.to(info, {
                y: 0,
                opacity: 1,
                duration: 0.4,
                ease: 'power2.out'
            });
            
            gsap.to(img, {
                scale: 1.1,
                duration: 0.6,
                ease: 'power2.out'
            });
        });
        
        member.addEventListener('mouseleave', (e) => {
            const info = member.querySelector('.member-info');
            const img = member.querySelector('img');
            
            gsap.to(info, {
                y: 100,
                opacity: 0,
                duration: 0.4,
                ease: 'power2.in'
            });
            
            gsap.to(img, {
                scale: 1,
                duration: 0.6,
                ease: 'power2.in'
            });
        });
    });
}