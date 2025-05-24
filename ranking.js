const wrapper = document.querySelector('.ratings-wrapper');
let isDragging = false;
let startX, scrollLeft;
let autoScrollInterval;
let waitingToRestart = false;

// Mouse drag
wrapper.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.pageX - wrapper.offsetLeft;
  scrollLeft = wrapper.scrollLeft;
  wrapper.style.cursor = 'grabbing';
  stopAutoScroll();
});

wrapper.addEventListener('mouseup', () => {
  isDragging = false;
  wrapper.style.cursor = 'grab';
  startAutoScroll();
});

wrapper.addEventListener('mouseleave', () => {
  isDragging = false;
  wrapper.style.cursor = 'grab';
  startAutoScroll();
});

wrapper.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - wrapper.offsetLeft;
  const walk = (x - startX) * 1.5;
  wrapper.scrollLeft = scrollLeft - walk;
});

// Touch drag (móvil)
wrapper.addEventListener('touchstart', (e) => {
  isDragging = true;
  startX = e.touches[0].pageX - wrapper.offsetLeft;
  scrollLeft = wrapper.scrollLeft;
  stopAutoScroll();
}, { passive: true });

wrapper.addEventListener('touchend', () => {
  isDragging = false;
  startAutoScroll();
});

wrapper.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  const x = e.touches[0].pageX - wrapper.offsetLeft;
  const walk = (x - startX) * 1.5;
  wrapper.scrollLeft = scrollLeft - walk;
}, { passive: false });

function startAutoScroll() {
  if (autoScrollInterval || waitingToRestart) return;

  autoScrollInterval = setInterval(() => {
    wrapper.scrollLeft += 1;

    const reachedEnd = wrapper.scrollLeft + wrapper.clientWidth >= wrapper.scrollWidth;

    if (reachedEnd) {
      clearInterval(autoScrollInterval);
      autoScrollInterval = null;

      waitingToRestart = true;

      // Esperar 3 segundos al llegar al final
      setTimeout(() => {
        // Desplazar suavemente al inicio
        wrapper.scrollTo({ left: 0, behavior: 'smooth' });

        // Esperar 1 segundo (transición suave) + 5 segundos antes de reiniciar
        setTimeout(() => {
          waitingToRestart = false;
          startAutoScroll();
        }, 6000); // 1s animación + 5s espera
      }, 3000); // ← espera antes de volver al inicio
    }
  }, 10);
}

function stopAutoScroll() {
  clearInterval(autoScrollInterval);
  autoScrollInterval = null;
}

wrapper.addEventListener('mouseenter', stopAutoScroll);
wrapper.addEventListener('mouseleave', startAutoScroll);

wrapper.style.scrollBehavior = 'smooth';
wrapper.style.cursor = 'grab';

// Iniciar
startAutoScroll();