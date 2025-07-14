document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    menuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        
        // Change icon based on menu state
        if (mobileMenu.classList.contains('active')) {
            this.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            this.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });
    
    // Search functionality (placeholder)
    const searchIcon = document.querySelector('.search-icon');
    searchIcon.addEventListener('click', function() {
        alert('Search functionality will be implemented here!');
        // In a real implementation, you might show a search input field
    });
    
    // Add hover effect to social icons in footer on touch devices
    const footerSocialIcons = document.querySelectorAll('.footer-social .social-icons a');
    footerSocialIcons.forEach(icon => {
        icon.addEventListener('touchstart', function() {
            this.classList.add('hover-effect');
        });
        
        icon.addEventListener('touchend', function() {
            setTimeout(() => {
                this.classList.remove('hover-effect');
            }, 200);
        });
    });
});



// Slider Functionality
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dotsContainer = document.querySelector('.slider-dots');
let currentSlide = 0;
let slideInterval;

// Create dots
slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

// Update slides and dots
function updateSlider() {
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Update 3D effect
    slides.forEach((slide, index) => {
        if (index === currentSlide) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
    
    // Update dots
    dots.forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Go to specific slide
function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateSlider();
    resetInterval();
}

// Next slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
    resetInterval();
}

// Previous slide
function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlider();
    resetInterval();
}

// Auto slide
function startInterval() {
    slideInterval = setInterval(nextSlide, 5000);
}

function resetInterval() {
    clearInterval(slideInterval);
    startInterval();
}

// Event listeners
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Initialize slider
updateSlider();
startInterval();

// Pause on hover
sliderContainer = document.querySelector('.slider-container');
sliderContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
sliderContainer.addEventListener('mouseleave', startInterval);



document.addEventListener('DOMContentLoaded', function() {
    const productSlider = document.querySelector('.product-slider');
    const prevNav = document.querySelector('.prev-nav');
    const nextNav = document.querySelector('.next-nav');
    const productCards = document.querySelectorAll('.product-card');
    let autoScrollInterval;
    let isScrolling = false;
    const scrollAmount = 265; // Card width + gap
    const scrollDelay = 3000; // 3 seconds
    
    // Initialize slider
    function initSlider() {
        startAutoScroll();
        setupEventListeners();
        handleSliderNav();
    }
    
    // Start auto-scrolling
    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            if (isScrolling) return;
            
            const maxScroll = productSlider.scrollWidth - productSlider.clientWidth;
            const currentScroll = productSlider.scrollLeft;
            
            if (currentScroll >= maxScroll - 10) {
                // Scroll back to start smoothly
                smoothScrollTo(productSlider, 0, 1000);
            } else {
                // Scroll to next card
                smoothScrollBy(productSlider, scrollAmount, 800);
            }
        }, scrollDelay);
    }
    
    // Pause auto-scroll
    function pauseAutoScroll() {
        clearInterval(autoScrollInterval);
    }
    
    // Smooth scroll by amount
    function smoothScrollBy(element, amount, duration) {
        isScrolling = true;
        const start = element.scrollLeft;
        const startTime = performance.now();
        
        function scrollStep(timestamp) {
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            element.scrollLeft = start + amount * progress;
            
            if (progress < 1) {
                window.requestAnimationFrame(scrollStep);
            } else {
                isScrolling = false;
            }
        }
        
        window.requestAnimationFrame(scrollStep);
    }
    
    // Smooth scroll to position
    function smoothScrollTo(element, to, duration) {
        isScrolling = true;
        const start = element.scrollLeft;
        const change = to - start;
        const startTime = performance.now();
        
        function scrollStep(timestamp) {
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            element.scrollLeft = start + change * progress;
            
            if (progress < 1) {
                window.requestAnimationFrame(scrollStep);
            } else {
                isScrolling = false;
            }
        }
        
        window.requestAnimationFrame(scrollStep);
    }
    
    // Manual navigation
    function manualScroll(direction) {
        pauseAutoScroll();
        smoothScrollBy(productSlider, direction === 'next' ? scrollAmount : -scrollAmount, 800);
        setTimeout(startAutoScroll, scrollDelay * 2);
    }
    
    // Handle navigation buttons visibility
    function handleSliderNav() {
        const scrollLeft = productSlider.scrollLeft;
        const maxScroll = productSlider.scrollWidth - productSlider.clientWidth;
        
        prevNav.style.display = scrollLeft <= 10 ? 'none' : 'flex';
        nextNav.style.display = scrollLeft >= maxScroll - 10 ? 'none' : 'flex';
    }
    
    // Setup event listeners
    function setupEventListeners() {
        nextNav.addEventListener('click', () => manualScroll('next'));
        prevNav.addEventListener('click', () => manualScroll('prev'));
        
        // Pause on hover/touch
        productSlider.addEventListener('mouseenter', pauseAutoScroll);
        productSlider.addEventListener('mouseleave', startAutoScroll);
        productSlider.addEventListener('touchstart', pauseAutoScroll);
        productSlider.addEventListener('touchend', () => {
            setTimeout(startAutoScroll, 5000);
        });
        
        // Handle scroll events
        productSlider.addEventListener('scroll', handleSliderNav);
    }
    
    // Initialize the slider
    initSlider();
    
    // Handle window resize
    window.addEventListener('resize', handleSliderNav);
});

// Enhanced Mobile Footer Navigation
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    const footer = document.querySelector('.mobile-footer');
    let lastScroll = 0;
    let isScrolling;
    
    // Set active item based on current page
    function setActiveNav() {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        
        navItems.forEach(item => {
            item.classList.remove('active');
            
            if (currentPath.includes(item.dataset.title.toLowerCase())) {
                item.classList.add('active');
            }
        });
        
        if (!document.querySelector('.nav-item.active') && 
           (currentPath === '' || currentPath === 'index.html')) {
            document.querySelector('.nav-item[data-title="Home"]').classList.add('active');
        }
    }
    
    // Initialize navigation
    setActiveNav();
    
    // Add click effects and navigation
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove all active classes
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Simulate navigation (replace with actual navigation)
            const target = this.dataset.title.toLowerCase();
            console.log(`Navigating to ${target}`);
            // window.location.href = `${target}.html`;
            
            // Show navigation bar temporarily after click
            footer.style.transform = 'translateY(0)';
            resetHideTimer();
        });
    });
    
    // Handle scroll to hide/show footer
    function resetHideTimer() {
        clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
            if (window.pageYOffset > 100) {
                footer.style.transform = 'translateY(100%)';
            }
        }, 3000);
    }
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            footer.style.transform = 'translateY(0)';
            return;
        }
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down - hide footer
            footer.style.transform = 'translateY(100%)';
        } else if (currentScroll < lastScroll) {
            // Scrolling up - show footer
            footer.style.transform = 'translateY(0)';
            resetHideTimer();
        }
        
        lastScroll = currentScroll;
    });
    
    // Touch device support
    footer.addEventListener('touchstart', function() {
        clearTimeout(isScrolling);
        footer.style.transform = 'translateY(0)';
    });
    
    footer.addEventListener('touchend', resetHideTimer);
});

 // Mobile footer navigation
            const navItems = document.querySelectorAll('.nav-item');
            
            navItems.forEach(item => {
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    navItems.forEach(nav => nav.classList.remove('active'));
                    this.classList.add('active');
                });
            });
            
            // Hide/show mobile footer on scroll
            let lastScroll = 0;
            const footer = document.querySelector('.mobile-footer');
            
            window.addEventListener('scroll', function() {
                const currentScroll = window.pageYOffset;
                
                if (currentScroll <= 0) {
                    footer.style.transform = 'translateY(0)';
                    return;
                }
                
                if (currentScroll > lastScroll && currentScroll > 100) {
                    // Scrolling down - hide footer
                    footer.style.transform = 'translateY(100%)';
                } else if (currentScroll < lastScroll) {
                    // Scrolling up - show footer
                    footer.style.transform = 'translateY(0)';
                }
                
                lastScroll = currentScroll;
            });