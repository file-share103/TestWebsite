/*
   Rahul Srivastava Portfolio - JavaScript
   Handles animations, interactivity, and responsive behavior
*/

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize particles.js with responsive configuration
    if (typeof particlesJS !== 'undefined') {
        // Determine particle density based on screen size
        const getParticleConfig = () => {
            // Base configuration - optimized for performance
            const config = {
                "particles": {
                    "number": {
                        "value": 50, // Reduced from 80
                        "density": {
                            "enable": true,
                            "value_area": 900 // Increased for better distribution
                        }
                    },
                    "color": {
                        "value": "#00e5ff"
                    },
                    "shape": {
                        "type": "circle",
                        "stroke": {
                            "width": 0,
                            "color": "#000000"
                        },
                        "polygon": {
                            "nb_sides": 5
                        }
                    },
                    "opacity": {
                        "value": 0.3,
                        "random": true,
                        "anim": {
                            "enable": true,
                            "speed": 0.8, // Reduced animation speed
                            "opacity_min": 0.1,
                            "sync": false
                        }
                    },
                    "size": {
                        "value": 3,
                        "random": true,
                        "anim": {
                            "enable": true,
                            "speed": 1.5, // Reduced animation speed
                            "size_min": 0.1,
                            "sync": false
                        }
                    },
                    "line_linked": {
                        "enable": true,
                        "distance": 180, // Increased to reduce number of connections
                        "color": "#00e5ff",
                        "opacity": 0.2,
                        "width": 1
                    },
                    "move": {
                        "enable": true,
                        "speed": 0.8, // Reduced speed for better performance
                        "direction": "none",
                        "random": true,
                        "straight": false,
                        "out_mode": "out",
                        "bounce": false,
                        "attract": {
                            "enable": true,
                            "rotateX": 600,
                            "rotateY": 1200
                        }
                    }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                        "onhover": {
                            "enable": true,
                            "mode": "grab"
                        },
                        "onclick": {
                            "enable": true,
                            "mode": "push"
                        },
                        "resize": true
                    },
                    "modes": {
                        "grab": {
                            "distance": 140,
                            "line_linked": {
                                "opacity": 0.5
                            }
                        },
                        "bubble": {
                            "distance": 400,
                            "size": 4,
                            "duration": 2,
                            "opacity": 0.8,
                            "speed": 3
                        },
                        "repulse": {
                            "distance": 200,
                            "duration": 0.4
                        },
                        "push": {
                            "particles_nb": 3 // Reduced from 4
                        },
                        "remove": {
                            "particles_nb": 2
                        }
                    }
                },
                "retina_detect": false // Disabled for better performance
            };
            
            // Adjust for mobile devices
            if (window.innerWidth < 768) {
                config.particles.number.value = 30; // Reduced from 40
                config.particles.move.speed = 0.6;
                config.interactivity.events.onhover.enable = false;
                config.particles.line_linked.distance = 150;
            }
            
            // Further reduce for very small screens
            if (window.innerWidth < 480) {
                config.particles.number.value = 15; // Reduced from 25
                config.particles.line_linked.distance = 120;
                config.particles.move.speed = 0.5;
                config.interactivity.events.onclick.enable = false;
                // Disable animations on very small screens for better performance
                config.particles.opacity.anim.enable = false;
                config.particles.size.anim.enable = false;
            }
            
            return config;
        };
        
        // Initialize with responsive config
        particlesJS('particles-js', getParticleConfig());
        
        // Update configuration on window resize (with debounce)
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                particlesJS('particles-js', getParticleConfig());
            }, 250);
        });
    }
    
    // Create dynamic tech elements
    createDynamicElements();
    
    // Preloader - optimized for faster display
    const preloader = document.querySelector('.preloader');
    
    // Start hiding preloader as soon as DOM is ready
    document.addEventListener('readystatechange', () => {
        if (document.readyState === 'interactive') {
            // Begin fade out earlier
            setTimeout(() => {
                preloader.style.opacity = '0.5';
            }, 300);
        }
    });
    
    // Complete hiding when everything is loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hide');
            // Start animations after preloader is hidden
            startAnimations();
        }, 300); // Reduced from 500ms
    });
    
    // Function to create dynamic tech elements
    function createDynamicElements() {
        // Create random circuit lines in the background
        const circuitLines = document.querySelector('.circuit-lines');
        if (circuitLines) {
            for (let i = 0; i < 5; i++) {
                const line = document.createElement('div');
                line.classList.add('circuit-path');
                line.style.top = `${Math.random() * 100}%`;
                line.style.left = `${Math.random() * 100}%`;
                line.style.width = `${Math.random() * 200 + 50}px`;
                line.style.height = `${Math.random() * 200 + 50}px`;
                line.style.animationDelay = `${Math.random() * 5}s`;
                circuitLines.appendChild(line);
            }
        }
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        mobileNav.classList.toggle('show');
        
        // Toggle hamburger animation
        const spans = mobileMenuBtn.querySelectorAll('span');
        if (mobileMenuBtn.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close mobile menu when clicking on a link
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            mobileNav.classList.remove('show');
            
            // Reset hamburger
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // Header scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Active navigation link based on scroll position - optimized
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('header nav ul li a');
    const mobileNavLinks2 = document.querySelectorAll('.mobile-nav ul li a');
    
    // Throttle for better performance
    let navTicking = false;
    let lastKnownScrollPosition = 0;
    let currentActive = '';
    
    function updateActiveLink() {
        lastKnownScrollPosition = window.scrollY;
        let current = '';
        
        // Find the current section
        for (let i = 0; i < sections.length; i++) {
            const section = sections[i];
            const sectionTop = section.offsetTop;
            
            if (lastKnownScrollPosition >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        }
        
        // Only update DOM if the active section changed
        if (current !== currentActive) {
            currentActive = current;
            
            // Update desktop nav
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
            
            // Update mobile nav
            mobileNavLinks2.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }
        
        navTicking = false;
    }
    
    // Throttle scroll events
    window.addEventListener('scroll', () => {
        if (!navTicking) {
            window.requestAnimationFrame(updateActiveLink);
            navTicking = true;
        }
    });
    
    window.addEventListener('load', updateActiveLink);

    // Scroll animations with performance optimization
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    // Use requestAnimationFrame for better performance
    let scrollTicking = false;
    
    function checkScroll() {
        const triggerBottom = window.innerHeight * 0.8;
        
        animateElements.forEach(element => {
            // Only check elements that haven't been animated yet
            if (!element.classList.contains('show')) {
                const elementTop = element.getBoundingClientRect().top;
                
                if (elementTop < triggerBottom) {
                    element.classList.add('show');
                }
            }
        });
        
        scrollTicking = false;
    }
    
    // Throttle scroll events for better performance
    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            window.requestAnimationFrame(checkScroll);
            scrollTicking = true;
        }
    });

    // Back to top button - optimized
    const backToTopBtn = document.querySelector('.back-to-top');
    let backToTopTicking = false;
    let backToTopVisible = false;
    
    function updateBackToTopButton() {
        const shouldBeVisible = window.scrollY > 500;
        
        // Only update DOM if visibility changed
        if (shouldBeVisible !== backToTopVisible) {
            backToTopVisible = shouldBeVisible;
            
            if (shouldBeVisible) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }
        
        backToTopTicking = false;
    }
    
    // Throttle scroll events
    window.addEventListener('scroll', () => {
        if (!backToTopTicking) {
            window.requestAnimationFrame(updateBackToTopButton);
            backToTopTicking = true;
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth scrolling for anchor links - optimized
    const headerHeight = document.querySelector('header').offsetHeight;
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Pre-calculate position only when needed
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add hover effect to clickable contact items
    const clickableItems = document.querySelectorAll('.contact-item.clickable');
    clickableItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });

    // Function to start animations after preloader
    function startAnimations() {
        // Check initial scroll position for animations
        checkScroll();
        
        // Trigger scroll event to update active links
        window.dispatchEvent(new Event('scroll'));
    }

    // Handle browser resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Recalculate any position-dependent elements
            checkScroll();
            updateActiveLink();
        }, 250);
    });

    // Prevent FOUC (Flash of Unstyled Content)
    document.body.classList.add('loaded');
});

// Fallback for browsers that don't support IntersectionObserver
if (!('IntersectionObserver' in window)) {
    // Load a polyfill or use alternative animation method
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(element => {
        element.classList.add('show');
    });
}