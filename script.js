document.getElementById('hamburger').addEventListener('click', function() {
    document.getElementById('nav_bar').classList.toggle('active');
    this.classList.toggle('active');
});

document.addEventListener("DOMContentLoaded", function () {
    const counters = document.querySelectorAll(".counter");
    const counterSection = document.getElementById("div_3");

    // 1. Debugging: Check if the section actually exists
    if (!counterSection) {
        console.error("Counter Error: Could not find the element with ID 'div_3'. Check your HTML.");
        return;
    }

    const startCounter = (counter) => {
        const target = parseInt(counter.getAttribute("data-target"));
        let count = 0;
        const speed = 2000; // Total duration of animation in ms
        const increment = target / (speed / 16); // 16ms is roughly 60fps

        const updateCount = () => {
            if (count < target) {
                count += increment;
                counter.innerText = Math.ceil(count);
                requestAnimationFrame(updateCount); // Smoother than setTimeout
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    };

    // 2. Setup the Observer with a lower threshold
    const observerOptions = {
        root: null, 
        threshold: 0.1 // Triggers when just 10% of the section is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            console.log("Section is visible:", entry.isIntersecting); // Check console for this!
            
            if (entry.isIntersecting) {
                counters.forEach(counter => startCounter(counter));
                observer.unobserve(entry.target); // Run once
            }
        });
    }, observerOptions);

    observer.observe(counterSection);
});

document.addEventListener("DOMContentLoaded", function () {

    const indicators = document.querySelectorAll(".indicator");
    if (!indicators.length) return;

    let currentIndex = 0;

    const animationDuration = 20000; // MUST match CSS
    const intervalTime = animationDuration / indicators.length;

    // ✅ Activate first indicator immediately
    indicators[0].classList.add("active");

    setInterval(() => {
        indicators.forEach(ind => ind.classList.remove("active"));
        indicators[currentIndex].classList.add("active");
        currentIndex = (currentIndex + 1) % indicators.length;
    }, intervalTime);

});

