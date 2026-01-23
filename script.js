document.addEventListener("DOMContentLoaded", function () {

    // --- 1. Hamburger Menu Logic ---
    const hamburger = document.getElementById('hamburger');
    const navBar = document.getElementById('nav_bar');

    if (hamburger && navBar) {
        hamburger.addEventListener('click', function () {
            navBar.classList.toggle('active');
            this.classList.toggle('active');
        });

        // Close menu when a link is clicked
        const navLinks = navBar.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navBar.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    /*loader*/

    window.addEventListener("load", function () {
        const loader = document.getElementById("preloader");
        if (!loader) return;

        loader.classList.add("loader-hidden");

        loader.addEventListener("transitionend", function () {
            loader.remove();
        });
    });


    // --- 2. Counter Animation Logic ---
    const counters = document.querySelectorAll(".counter");
    const counterSection = document.getElementById("div_3");

    if (counterSection && counters.length > 0) {
        const startCounter = (counter) => {
            const target = parseInt(counter.getAttribute("data-target"));
            const speed = 2000; // Animation duration in ms
            const increment = target / (speed / 16); // 60 FPS

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
            threshold: 0.2 // Start when 20% visible
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    counters.forEach(counter => startCounter(counter));
                    observer.unobserve(entry.target); // Run only once
                }
            });
        }, observerOptions);

        observer.observe(counterSection);
    }

    // --- 3. Slider Indicator Logic (Optional Visuals) ---
    const indicators = document.querySelectorAll(".indicator");
    if (indicators.length > 0) {
        let currentIndex = 0;
        setInterval(() => {
            indicators.forEach(ind => ind.classList.remove("active"));
            indicators[currentIndex].classList.add("active");
            currentIndex = (currentIndex + 1) % indicators.length;
        }, 3000); // Change indicator every 3 seconds
    }

});


// --- 4. Popup Login Section Logic ---

document.addEventListener("DOMContentLoaded", function () {
    const overlay = document.getElementById('popupOverlay');
    const openBtn = document.getElementById('openLoginBtn');
    const closeBtn = document.getElementById('closeBtn');

    // Open
    if (openBtn) {
        openBtn.addEventListener('click', () => {
            overlay.classList.add('active');
        });
    }

    // Close on X
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            overlay.classList.remove('active');
        });
    }

    // Close on background click
    if (overlay) {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('active');
            }
        });
    }
});