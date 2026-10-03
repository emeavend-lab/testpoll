let currentStep = 1;
const totalSteps = 9; // <--- Cambiado a 9

const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const quizWrapper = document.getElementById('quiz-wrapper');
const resultContainer = document.getElementById('result-container');

// Escuchar cambios en los radio buttons para resaltar y habilitar botón 'Siguiente'
document.querySelectorAll('.question-step').forEach(stepElement => {
  const labels = stepElement.querySelectorAll('.options label');
  const radios = stepElement.querySelectorAll('input[type="radio"]');

  radios.forEach(radio => {
    radio.addEventListener('change', () => {
      // Quitar clase selected de las opciones de esta pregunta
      labels.forEach(lbl => lbl.classList.remove('selected'));
      // Agregar clase al label seleccionado
      radio.closest('label').classList.add('selected');
      
      // Habilitar el botón siguiente
      nextBtn.disabled = false;
    });
  });
});

// Función para actualizar la vista de las preguntas
function updateStepView() {
  // Mostrar u ocultar pasos
  document.querySelectorAll('.question-step').forEach(stepElement => {
    const stepNum = parseInt(stepElement.getAttribute('data-step'));
    if (stepNum === currentStep) {
      stepElement.classList.add('active');
    } else {
      stepElement.classList.remove('active');
    }
  });

  // Actualizar la barra de progreso
  progressBar.textContent = `Pregunta ${currentStep} de ${totalSteps}`;

  // Controlar botón "Anterior"
  if (currentStep === 1) {
    prevBtn.disabled = true;
  } else {
    prevBtn.disabled = false;
  }

  // Verificar si la pregunta actual ya tiene respuesta marcada
  const currentStepElement = document.querySelector(`.question-step[data-step="${currentStep}"]`);
  const isAnswered = currentStepElement.querySelector('input[type="radio"]:checked') !== null;

  nextBtn.disabled = !isAnswered;

  // Cambiar texto en la última pregunta
  if (currentStep === totalSteps) {
    nextBtn.textContent = 'Ver Resultado';
  } else {
    nextBtn.textContent = 'Siguiente pregunta';
  }
}

// Botón "Siguiente" / "Ver Resultado"
nextBtn.addEventListener('click', () => {
  if (currentStep < totalSteps) {
    currentStep++;
    updateStepView();
  } else {
    // Si estamos en la última pregunta, mostramos el resultado
    quizWrapper.style.display = 'none';
    resultContainer.style.display = 'block';
  }
});

// Botón "Anterior"
prevBtn.addEventListener('click', () => {
  if (currentStep > 1) {
    currentStep--;
    updateStepView();
  }
});

// Inicializar vista
updateStepView();
