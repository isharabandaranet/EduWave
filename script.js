document.addEventListener("DOMContentLoaded", function () {

    // --- 1. Hamburger Menu Logic ---
    const hamburger = document.getElementById('hamburger');
    const navBar = document.getElementById('nav_bar');
    const body = document.body;

    if (hamburger && navBar) {
        hamburger.addEventListener('click', function () {
            navBar.classList.toggle('active');
            this.classList.toggle('active');
            body.classList.toggle('menu-open');
        });

        // Close menu when a regular link is clicked (not dropbtn)
        const navLinks = navBar.querySelectorAll('a:not(.dropbtn)');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navBar.classList.remove('active');
                hamburger.classList.remove('active');
                body.classList.remove('menu-open');
            });
        });
    }

    // --- 2. DROPDOWN TOGGLE FOR MOBILE ---
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const dropbtn = dropdown.querySelector('.dropbtn');
        const arrow = dropdown.querySelector('.arrow');
        
        if (dropbtn) {
            dropbtn.addEventListener('click', function(e) {
                // Only apply on mobile view (768px or less)
                if (window.innerWidth <= 768) {
                    e.preventDefault();  // Prevent navigation to services.html
                    e.stopPropagation();
                    
                    // Close all other dropdowns first
                    dropdowns.forEach(other => {
                        if (other !== dropdown) {
                            other.classList.remove('mobile-active');
                        }
                    });
                    
                    // Toggle current dropdown
                    dropdown.classList.toggle('mobile-active');
                }
            });
        }
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('mobile-active');
            });
        }
    });

    // Close dropdown when clicking a dropdown link
    document.querySelectorAll('.dropdown-content a').forEach(link => {
        link.addEventListener('click', function() {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('mobile-active');
            });
            if (navBar) navBar.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });

    // Reset on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('mobile-active');
            });
            if (navBar) navBar.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });

    // --- 3. Preloader Logic ---
    window.addEventListener("load", function () {
        const loader = document.getElementById("preloader");
        
        if (!loader) return;
        
        loader.classList.add("loader-hidden");

        loader.addEventListener("transitionend", function () {
            loader.remove();
        });
    });

    // --- 4. Counter Animation Logic ---
    const counters = document.querySelectorAll(".counter");
    const counterSection = document.getElementById("div_3");

    if (counterSection && counters.length > 0) {
        const startCounter = (counter) => {
            const target = parseInt(counter.getAttribute("data-target"));
            const speed = 2000;
            const increment = target / (speed / 16);

            let count = 0;
            const updateCount = () => {
                if (count < target) {
                    count += increment;
                    counter.innerText = Math.ceil(count);
                    requestAnimationFrame(updateCount);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        };

        const observerOptions = {
            root: null,
            threshold: 0.2
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    counters.forEach(counter => startCounter(counter));
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        observer.observe(counterSection);
    }

    // --- 5. Slider Indicator Logic ---
    const indicators = document.querySelectorAll(".indicator");
    if (indicators.length > 0) {
        let currentIndex = 0;
        setInterval(() => {
            indicators.forEach(ind => ind.classList.remove("active"));
            indicators[currentIndex].classList.add("active");
            currentIndex = (currentIndex + 1) % indicators.length;
        }, 3000);
    }

    // --- 6. Popup Login Section Logic ---
    const overlay = document.getElementById('popupOverlay');
    const openBtn = document.getElementById('openLoginBtn');
    const closeBtn = document.getElementById('closeBtn');

    if (openBtn) {
        openBtn.addEventListener('click', () => {
            overlay.classList.add('active');
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            overlay.classList.remove('active');
        });
    }

    if (overlay) {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('active');
            }
        });
    }

});