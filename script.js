let currentStep = 1;
const totalSteps = 9;

const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const quizWrapper = document.getElementById('quiz-wrapper');
const resultContainer = document.getElementById('result-container');

// Escuchar cambios en las opciones marcadas
document.querySelectorAll('.question-step').forEach(stepElement => {
  const labels = stepElement.querySelectorAll('.options label');
  const radios = stepElement.querySelectorAll('input[type="radio"]');

  radios.forEach(radio => {
    radio.addEventListener('change', () => {
      labels.forEach(lbl => lbl.classList.remove('selected'));
      radio.closest('label').classList.add('selected');
      nextBtn.disabled = false;
    });
  });
});

// Actualizar vista de cada paso
function updateStepView() {
  document.querySelectorAll('.question-step').forEach(stepElement => {
    const stepNum = parseInt(stepElement.getAttribute('data-step'));
    if (stepNum === currentStep) {
      stepElement.classList.add('active');
    } else {
      stepElement.classList.remove('active');
    }
  });

  // Formato elegante de números (01 / 09)
  const currentFormatted = currentStep < 10 ? `0${currentStep}` : currentStep;
  const totalFormatted = totalSteps < 10 ? `0${totalSteps}` : totalSteps;
  progressBar.textContent = `${currentFormatted} / ${totalFormatted}`;

  // Botón Anterior
  prevBtn.disabled = (currentStep === 1);

  // Comprobar si ya está respondida la pregunta actual
  const currentStepElement = document.querySelector(`.question-step[data-step="${currentStep}"]`);
  const isAnswered = currentStepElement.querySelector('input[type="radio"]:checked') !== null;
  nextBtn.disabled = !isAnswered;

  // Texto del botón al final
  if (currentStep === totalSteps) {
    nextBtn.textContent = 'Ver Resultado';
  } else {
    nextBtn.textContent = 'Siguiente →';
  }
}

// Evento Siguiente
nextBtn.addEventListener('click', () => {
  if (currentStep < totalSteps) {
    currentStep++;
    updateStepView();
  } else {
    quizWrapper.style.display = 'none';
    document.querySelector('.sidebar-card').style.display = 'none';
    resultContainer.style.display = 'block';
  }
});

// Evento Anterior
prevBtn.addEventListener('click', () => {
  if (currentStep > 1) {
    currentStep--;
    updateStepView();
  }
});

// Inicializar
updateStepView();
