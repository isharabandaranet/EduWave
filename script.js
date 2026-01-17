document.addEventListener("DOMContentLoaded", function () {

  const counters = document.querySelectorAll(".counter");

  counters.forEach(counter => {
    counter.innerText = "0";

    const updateCounter = () => {
      const target = Number(counter.getAttribute("data-target"));
      const current = Number(counter.innerText);

      const increment = Math.ceil(target / 100);

      if (current < target) {
        counter.innerText = current + increment;
        setTimeout(updateCounter, 20);
      } else {
        counter.innerText = target;
      }
    };

    updateCounter();
  });

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

