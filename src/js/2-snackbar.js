// Імпорт бібліотеки iziToast для відображення сповіщень
import iziToast from 'izitoast';
// Імпорт стилів для iziToast
import 'izitoast/dist/css/iziToast.min.css';

// Створимо функцію, що додає затримку і вирішує або відхиляє проміс
const createPromise = (delay, state) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
};

// Створимо об'єкт посилань на елементи форми
const elements = {
  form: document.querySelector('.form'),
  delayInput: document.querySelector('input[name="delay"]'),
  stateInputs: document.querySelectorAll('input[name="state"]'),
};

// Деструктуризація об'єкта elements
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

  createPromise(delay, state)
    .then((resolvedDelay) => {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${resolvedDelay}ms`,
      });
    })
    .catch((rejectedDelay) => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${rejectedDelay}ms`,
      });
    });
});
