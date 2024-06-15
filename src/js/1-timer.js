import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

function addLeadingZero(value) {
  return value < 10 ? '0' + value : value;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Об'єкт посилань на елементи DOM
const refs = {
  startBtn: document.querySelector('[data-start]'),
  dateTimePickerEl: document.querySelector('#datetime-picker'),
};

// Деструктуризація об'єкта посилань
const { startBtn, dateTimePickerEl } = refs;

// Ініціалізація кнопки та обробник події
startBtn.disabled = true;
let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];

    if (userSelectedDate < new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

const startTimer = function () {
  startBtn.disabled = true;
  dateTimePickerEl.disabled = true;

  const intervalId = setInterval(function () {
    const currentDate = new Date();
    const timeDifference = userSelectedDate - currentDate;

    if (timeDifference <= 0) {
      clearInterval(intervalId);
      iziToast.success({
        title: 'Success',
        message: 'Countdown finished!',
      });
      startBtn.disabled = true;
      dateTimePickerEl.disabled = false;
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeDifference);
    document.querySelector('[data-days]').innerText = addLeadingZero(days);
    document.querySelector('[data-hours]').innerText = addLeadingZero(hours);
    document.querySelector('[data-minutes]').innerText =
      addLeadingZero(minutes);
    document.querySelector('[data-seconds]').innerText =
      addLeadingZero(seconds);
  }, 1000);
};

startBtn.addEventListener('click', startTimer);
