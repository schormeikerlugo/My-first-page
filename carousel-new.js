const images = document.querySelectorAll('.carousel-img');
const nextBtn = document.querySelector('.carousel-btn.next');
const prevBtn = document.querySelector('.carousel-btn.prev');
const container = document.querySelector('.new');

let index = 0;
let intervalId;

function showImage(i) {
  images.forEach((img, idx) => {
    img.classList.toggle('active', idx === i);
  });
}

// Navegación manual
nextBtn.addEventListener('click', () => {
  index = (index + 1) % images.length;
  showImage(index);
});

prevBtn.addEventListener('click', () => {
  index = (index - 1 + images.length) % images.length;
  showImage(index);
});

// Autoplay
function startAutoSlide() {
  intervalId = setInterval(() => {
    index = (index + 1) % images.length;
    showImage(index);
  }, 5000); // 5 segundos
}

function stopAutoSlide() {
  clearInterval(intervalId);
}

// Iniciar autoplay
startAutoSlide();

// Pausar/resumir en hover
container.addEventListener('mouseenter', stopAutoSlide);
container.addEventListener('mouseleave', startAutoSlide);

// Mostrar imagen inicial
showImage(index);




