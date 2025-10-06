// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header background change on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!data.name || !data.phone || !data.service || !data.date || !data.guests) {
            showNotification('Пожалуйста, заполните все обязательные поля', 'error');
            return;
        }
        
        // Simulate form submission (replace with actual backend integration)
        showNotification('Заявка отправлена! Мы свяжемся с вами в ближайшее время.', 'success');
        
        // Reset form
        this.reset();
        
        // Log form data to console (for development)
        console.log('Form submitted:', data);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .notification-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 1rem;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            line-height: 1;
        }
        
        .notification-close:hover {
            opacity: 0.8;
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Portfolio image lightbox (placeholder for future enhancement)
document.querySelectorAll('.portfolio-image').forEach(imageContainer => {
    imageContainer.addEventListener('click', function() {
        // This is a placeholder for a lightbox feature
        // You can integrate libraries like PhotoSwipe or create a custom lightbox
        console.log('Portfolio image clicked - lightbox feature can be added here');
    });
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.portfolio-item, .service-card, .about-content, .contact-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add loading animation for form submission
function showLoadingState(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Отправка...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';
    
    // Reset button after 2 seconds (simulate API call)
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
    }, 2000);
}

// Enhanced form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            input.style.borderColor = '#e9ecef';
        }
    });
    
    // Phone validation
    const phoneInput = form.querySelector('input[type="tel"]');
    if (phoneInput && phoneInput.value) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(phoneInput.value)) {
            phoneInput.style.borderColor = '#e74c3c';
            isValid = false;
        }
    }
    
    // Email validation
    const emailInput = form.querySelector('input[type="email"]');
    if (emailInput && emailInput.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            emailInput.style.borderColor = '#e74c3c';
            isValid = false;
        }
    }
    
    return isValid;
}

// Update form submission to use enhanced validation
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateForm(this)) {
            showNotification('Пожалуйста, исправьте ошибки в форме', 'error');
            return;
        }
        
        showLoadingState(this);
        
        // Simulate API call
        setTimeout(() => {
            showNotification('Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.', 'success');
            this.reset();
        }, 2000);
    });
}

// Add some interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to service cards
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effects to portfolio items
    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Initialize sliders and lightbox
    initSliders();
    initLightbox();
});

// Add CSS for mobile menu
const mobileMenuStyles = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            padding: 2rem;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .nav-menu.active {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }
        
        .nav-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
`;

// Inject mobile menu styles
const styleSheet = document.createElement('style');
styleSheet.textContent = mobileMenuStyles;
document.head.appendChild(styleSheet);

// Simple slider implementation
function initSliders() {
    const sliders = document.querySelectorAll('[data-slider]');
    sliders.forEach(slider => setupSlider(slider));
}

// Lightbox open/close and focus trapping
function initLightbox() {
    document.querySelectorAll('.portfolio-open').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetSel = btn.getAttribute('data-lightbox-target');
            const lb = document.querySelector(targetSel);
            if (!lb) return;
            lb.setAttribute('aria-hidden', 'false');
            // focus first control
            const close = lb.querySelector('[data-lightbox-close]');
            if (close) close.focus();
            // re-init slider inside (in case images loaded later)
            const slider = lb.querySelector('[data-slider]');
            if (slider && !slider.dataset.inited) {
                setupSlider(slider);
                slider.dataset.inited = 'true';
            }
        });
    });
    
    document.querySelectorAll('[data-lightbox-close]').forEach(el => {
        el.addEventListener('click', () => {
            const lb = el.closest('.lightbox');
            if (lb) lb.setAttribute('aria-hidden', 'true');
        });
    });
    
    document.querySelectorAll('.lightbox').forEach(lb => {
        lb.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') lb.setAttribute('aria-hidden', 'true');
        });
    });
}
// Lightbox functionality
class Lightbox {
    constructor() {
        this.lightbox = null;
        this.slider = null;
        this.slides = null;
        this.currentSlide = 0;
        this.totalSlides = 0;
        this.init();
    }

    init() {
        // Create lightbox event listeners
        document.querySelectorAll('[data-lightbox-target]').forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const target = trigger.getAttribute('data-lightbox-target');
                this.openLightbox(target);
            });
        });

        // Close lightbox events
        document.querySelectorAll('[data-lightbox-close]').forEach(closeBtn => {
            closeBtn.addEventListener('click', () => {
                this.closeLightbox();
            });
        });

        // Close on backdrop click
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('lightbox-backdrop')) {
                this.closeLightbox();
            }
        });

        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.lightbox && this.lightbox.style.display === 'flex') {
                this.closeLightbox();
            }
        });
    }

    openLightbox(target) {
        this.lightbox = document.querySelector(target);
        if (!this.lightbox) return;

        this.lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';

        // Initialize slider
        this.initSlider();
    }

    closeLightbox() {
        if (this.lightbox) {
            this.lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
            this.currentSlide = 0;
        }
    }

    initSlider() {
        this.slider = this.lightbox.querySelector('[data-slider]');
        if (!this.slider) return;

        this.slides = this.slider.querySelectorAll('.slides img');
        this.totalSlides = this.slides.length;

        if (this.totalSlides === 0) return;

        // Hide all slides except first
        this.slides.forEach((slide, index) => {
            slide.style.display = index === 0 ? 'block' : 'none';
        });

        // Add event listeners for navigation
        const prevBtn = this.slider.querySelector('.slider-btn.prev');
        const nextBtn = this.slider.querySelector('.slider-btn.next');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.prevSlide();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.nextSlide();
            });
        }

        // Initialize dots if they exist
        this.initDots();
    }

    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateSlider();
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateSlider();
    }

    updateSlider() {
        // Hide all slides
        this.slides.forEach(slide => {
            slide.style.display = 'none';
        });

        // Show current slide
        if (this.slides[this.currentSlide]) {
            this.slides[this.currentSlide].style.display = 'block';
        }

        // Update dots
        this.updateDots();
    }

    initDots() {
        const dotsContainer = this.slider.querySelector('.slider-dots');
        if (!dotsContainer) return;

        // Clear existing dots
        dotsContainer.innerHTML = '';

        // Create dots
        for (let i = 0; i < this.totalSlides; i++) {
            const dot = document.createElement('button');
            dot.classList.add('slider-dot');
            dot.setAttribute('aria-label', `Перейти к слайду ${i + 1}`);
            dot.addEventListener('click', () => {
                this.goToSlide(i);
            });
            dotsContainer.appendChild(dot);
        }

        this.updateDots();
    }

    updateDots() {
        const dots = this.slider.querySelectorAll('.slider-dot');
        dots.forEach((dot, index) => {
            if (index === this.currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    goToSlide(index) {
        this.currentSlide = index;
        this.updateSlider();
    }
}

// Initialize lightbox when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Lightbox();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
