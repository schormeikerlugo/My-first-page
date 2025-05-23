const searchIcon = document.querySelector('.search img');
const searchInput = document.querySelector('.search input');

searchIcon.addEventListener('click', () => {
  searchInput.focus();
});