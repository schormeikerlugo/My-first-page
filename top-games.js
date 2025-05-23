
  const rows = document.querySelectorAll('.popular-table tbody tr');

  rows.forEach(row => {
    row.addEventListener('click', () => {
      // Quitar selección previa
      rows.forEach(r => r.classList.remove('selected'));
      // Agregar selección a la fila actual
      row.classList.add('selected');
    });
  });

