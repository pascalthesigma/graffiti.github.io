/**
 * Graffiti Program - Main JavaScript File
 * https://www.graffitiprogram.com
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize header scroll effect
    initHeaderScroll();
    // Initialize mobile navigation
    initMobileNav();
    // Initialize FAQ items
    initFaqItems();
    // Initialize animation effects
    initAnimations();
    // Fix missing team images
    fixMissingTeamImages();
    // Initialize Discord count animations
    initDiscordCountAnimation();
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
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            nav.classList.toggle('active');
            
            // Change hamburger to X
            const spans = hamburger.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
        });
    }
    
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
 * Initialize FAQ toggle functionality
 */
function initFaqItems() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                // Toggle active class
                item.classList.toggle('active');
                
                // Update toggle icon
                const icon = item.querySelector('.faq-toggle i');
                if (icon) {
                    if (item.classList.contains('active')) {
                        icon.classList.remove('fa-plus');
                        icon.classList.add('fa-minus');
                    } else {
                        icon.classList.remove('fa-minus');
                        icon.classList.add('fa-plus');
                    }
                }
                
                // Toggle visibility of answer
                const answer = item.querySelector('.faq-answer');
                if (answer) {
                    if (item.classList.contains('active')) {
                        answer.style.maxHeight = answer.scrollHeight + "px";
                    } else {
                        answer.style.maxHeight = "0";
                    }
                }
            });
        }
    });
}

/**
 * Initialize animations for elements
 */
function initAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    const triggerBottom = window.innerHeight * 0.8;
    
    fadeElements.forEach(element => {
        element.classList.add('visible');
    });
    
    // Ensure proper team layout
    const teamMembers = document.querySelectorAll('.team-member');
    if (teamMembers.length > 0) {
        teamMembers.forEach(member => {
            member.style.minHeight = '250px'; // Set minimum height
        });
    }
    
    // Fix any spacing issues by adding a slight margin-bottom to the last section
    const sections = document.querySelectorAll('section');
    if (sections.length > 0) {
        const lastSection = sections[sections.length - 1];
        lastSection.style.marginBottom = '20px';
    }
}

/**
 * Fix missing team images by using a placeholder
 */
function fixMissingTeamImages() {
    const teamImages = document.querySelectorAll('.team-img img');
    const placeholderSrc = 'images/team/placeholder-person.png';
    
    teamImages.forEach(img => {
        img.onerror = function() {
            this.src = placeholderSrc;
            this.onerror = null; // Prevent infinite loop if placeholder also fails
        };
    });
}

/**
 * Initialize Discord count animation based on scroll position
 */
function initDiscordCountAnimation() {
    const discordSection = document.querySelector('.discord-members');
    const discordCount = document.getElementById('discord-count');
    const countNumber = discordCount?.querySelector('.count-number');
    
    if (!discordCount || !discordSection || !countNumber) return;
    
    let lastScrollTop = 0;
    let animationFrame;
    
    // Check on scroll
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const rect = discordSection.getBoundingClientRect();
        
        // Only animate when the discord section is in view
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            // Determine scroll direction
            const scrollingDown = scrollTop > lastScrollTop;
            
            // Cancel any existing animation frame
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
            
            // Schedule the animation
            animationFrame = requestAnimationFrame(() => {
                if (scrollingDown) {
                    // Scrolling down - expand and rotate more
                    countNumber.style.transform = 'scale(1.15) rotate(2deg)';
                    countNumber.style.textShadow = '4px 4px 15px rgba(0, 0, 0, 0.5)';
                } else {
                    // Scrolling up - return to normal
                    countNumber.style.transform = 'scale(1) rotate(0deg)';
                    countNumber.style.textShadow = '2px 2px 8px rgba(0, 0, 0, 0.3)';
                }
            });
        }
        
        // Save current scroll position for next comparison
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, { passive: true });
}
