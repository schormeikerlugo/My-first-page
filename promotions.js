document.addEventListener("DOMContentLoaded", () => {
  const promoImages = document.querySelectorAll(".promo-img");
  const dots = document.querySelectorAll(".dot");
  const promotions = document.querySelector(".promotions");
  let currentPromo = 0;
  let interval;

  function showPromo(index) {
    promoImages.forEach((img, i) => {
      img.classList.toggle("active", i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
    currentPromo = index;
  }

  function startAutoPlay() {
    interval = setInterval(() => {
      let nextIndex = (currentPromo + 1) % promoImages.length;
      showPromo(nextIndex);
    }, 5000); // cada 5 segundos
  }

  function stopAutoPlay() {
    clearInterval(interval);
  }

  // Clic en indicadores
  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      const index = parseInt(dot.dataset.index);
      showPromo(index);
      stopAutoPlay();
      startAutoPlay();
    });
  });

  // Pausar con mouse encima
  promotions.addEventListener("mouseenter", stopAutoPlay);
  promotions.addEventListener("mouseleave", startAutoPlay);

  // Iniciar
  showPromo(0);
  startAutoPlay();
});
