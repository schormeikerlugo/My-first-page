const wrapper = document.querySelector('.ratings-wrapper');
let isDragging = false;
let startX, scrollLeft;
let autoScrollInterval;
let waitingToRestart = false;

// Mouse drag (mejorado)
wrapper.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.pageX - wrapper.offsetLeft;
  scrollLeft = wrapper.scrollLeft;
  wrapper.style.cursor = 'grabbing';
  stopAutoScroll();
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - wrapper.offsetLeft;
  const walk = (x - startX) * 1.5;
  wrapper.scrollLeft = scrollLeft - walk;
});

document.addEventListener('mouseup', () => {
  if (isDragging) {
    isDragging = false;
    wrapper.style.cursor = 'grab';
    startAutoScroll();
  }
});

// Touch drag (mejorado)
wrapper.addEventListener('touchstart', (e) => {
  isDragging = true;
  startX = e.touches[0].pageX - wrapper.offsetLeft;
  scrollLeft = wrapper.scrollLeft;
  stopAutoScroll();
}, { passive: true });

document.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  const touch = e.touches[0];
  const x = touch.pageX - wrapper.offsetLeft;
  const walk = (x - startX) * 1.5;
  wrapper.scrollLeft = scrollLeft - walk;
}, { passive: false });

document.addEventListener('touchend', () => {
  if (isDragging) {
    isDragging = false;
    startAutoScroll();
  }
});

function startAutoScroll() {
  if (autoScrollInterval || waitingToRestart) return;
  autoScrollInterval = setInterval(() => {
    wrapper.scrollLeft += 1;
    const reachedEnd = wrapper.scrollLeft + wrapper.clientWidth >= wrapper.scrollWidth - 1;
    if (reachedEnd) {
      clearInterval(autoScrollInterval);
      autoScrollInterval = null;
      waitingToRestart = true;
      setTimeout(() => {
        wrapper.scrollTo({ left: 0, behavior: 'smooth' });
        setTimeout(() => {
          waitingToRestart = false;
          startAutoScroll();
        }, 6000);
      }, 3000);
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