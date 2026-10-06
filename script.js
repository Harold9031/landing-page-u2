document.addEventListener('DOMContentLoaded', () => {

  // 1. HEADER STICKY CON CAMBIO VISUAL AL HACER SCROLL (> 80px)
  const header = document.getElementById('main-header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. ANIMACIÓN DE SCROLL CON INTERSECTION OBSERVER
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  const observerOptions = {
    root: null,
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target); // Animación ejecutada una sola vez
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => observer.observe(el));

  // 3. VALIDACIÓN DE FORMULARIO (BLUR + SUBMIT EN EL DOM SIN ALERT)
  const form = document.getElementById('form-registro');
  const nombreInput = document.getElementById('nombre');
  const emailInput = document.getElementById('email');
  const ideSelect = document.getElementById('ide');
  const terminosCheckbox = document.getElementById('terminos');
  const successMsg = document.getElementById('form-success');

  // Funciones auxiliares de validación
  const showError = (input, errorId, message) => {
    const errorSpan = document.getElementById(errorId);
    if (input.type !== 'checkbox') {
      input.parentElement.classList.add('input-error');
    }
    errorSpan.textContent = message;
  };

  const clearError = (input, errorId) => {
    const errorSpan = document.getElementById(errorId);
    if (input.type !== 'checkbox') {
      input.parentElement.classList.remove('input-error');
    }
    errorSpan.textContent = '';
  };

  const validateNombre = () => {
    if (nombreInput.value.trim() === '') {
      showError(nombreInput, 'error-nombre', 'El nombre es obligatorio.');
      return false;
    }
    clearError(nombreInput, 'error-nombre');
    return true;
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value.trim() === '') {
      showError(emailInput, 'error-email', 'El correo es obligatorio.');
      return false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
      showError(emailInput, 'error-email', 'Ingrese un correo válido.');
      return false;
    }
    clearError(emailInput, 'error-email');
    return true;
  };

  const validateIde = () => {
    if (ideSelect.value === '') {
      showError(ideSelect, 'error-ide', 'Seleccione un editor principal.');
      return false;
    }
    clearError(ideSelect, 'error-ide');
    return true;
  };

  const validateTerminos = () => {
    if (!terminosCheckbox.checked) {
      showError(terminosCheckbox, 'error-terminos', 'Debe aceptar los términos.');
      return false;
    }
    clearError(terminosCheckbox, 'error-terminos');
    return true;
  };

  // Eventos de pérdida de foco (BLUR)
  nombreInput.addEventListener('blur', validateNombre);
  emailInput.addEventListener('blur', validateEmail);
  ideSelect.addEventListener('blur', validateIde);
  terminosCheckbox.addEventListener('change', validateTerminos);

  // Evento de envío (SUBMIT)
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isNombreValid = validateNombre();
    const isEmailValid = validateEmail();
    const isIdeValid = validateIde();
    const isTerminosValid = validateTerminos();

    if (isNombreValid && isEmailValid && isIdeValid && isTerminosValid) {
      successMsg.style.display = 'block';
      successMsg.textContent = '¡Registro exitoso! Revisa tu correo para activar tu cuenta de CodePulse AI.';
      form.reset();
    } else {
      successMsg.style.display = 'none';
    }
  });
});