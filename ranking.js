const wrapper = document.querySelector('.ratings-wrapper');
let autoScrollInterval;
let waitingToRestart = false;

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