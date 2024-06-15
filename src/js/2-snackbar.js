// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

// Створимо функцію, що додає затримку
const delayPromise = delay =>
  new Promise(resolve => setTimeout(resolve, delay));

// Створимо об'єкт посилань на елементи форми
const elements = {
  form: document.querySelector('.form'),
  delayInput: document.querySelector('input[name="delay"]'),
  stateInputs: document.querySelectorAll('input[name="state"]'),
};

const { form, delayInput, stateInputs } = elements;

// Функція для отримання обраного стану
const getSelectedState = () => {
  for (const input of stateInputs) {
    if (input.checked) {
      return input.value;
    }
  }
  return null;
};

// Обробка сабміту форми
form.addEventListener('submit', event => {
  event.preventDefault();

  const delay = Number(delayInput.value);
  const state = getSelectedState();

  if (!delay || !state) {
    return;
  }

  delayPromise(delay).then(() => {
    if (state === 'fulfilled') {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
    } else {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
      });
    }
  });
});
