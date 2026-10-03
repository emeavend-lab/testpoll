document.getElementById('quiz-form').addEventListener('submit', function(e) {
  e.preventDefault(); // Evita que la página se recargue

  // Oculta el formulario del test
  document.getElementById('quiz').style.display = 'none';

  // Muestra el contenedor del resultado
  document.getElementById('result-container').style.display = 'block';
});
