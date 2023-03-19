import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

// all modules
import Notiflix from 'notiflix';

// // one by one
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import { Report } from 'notiflix/build/notiflix-report-aio';
// import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
// import { Loading } from 'notiflix/build/notiflix-loading-aio';
// import { Block } from 'notiflix/build/notiflix-block-aio';

const refs = {
  buttonStartEl: document.querySelector('button'),
  timerEl: document.querySelector('.timer'),
  fieldsEl: document.querySelectorAll('.field'),
  fieldValueEl: document.querySelector('.value'),
  fieldValueAllEl: document.querySelectorAll('.field .value'),
  daysFieldEl: document.querySelector('.field [data-days]'),
  hoursFieldEl: document.querySelector('.field [data-hours]'),
  minutesFieldEl: document.querySelector('.field [data-minutes]'),
  secondsFieldEl: document.querySelector('.field [data-seconds]'),
  input: document.querySelector('#datetime-picker'),
};
refs.timerEl.style.display = 'flex';
refs.input.addEventListener('click', onInputClick);
refs.buttonStartEl.addEventListener('click', onButtonStartClick);

refs.buttonStartEl.setAttribute('disabled', true);

function onInputClick(e) {
  console.log('выбираю дату');
}

let selectedDate;

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    selectedDate = selectedDates[0];
    const dateNow = new Date();
    console.log(dateNow);
    console.log(dateNow.getTime());
    const diferentInTime = selectedDate.getTime() - dateNow.getTime();
    console.log(diferentInTime);
    if (diferentInTime <= 0) {
      Notiflix.Notify.warning('Please choose a date in the future');
    } else {
      refs.input.style.backgroundColor = 'aqua';
      refs.buttonStartEl.removeAttribute('disabled');
      refs.buttonStartEl.style.backgroundColor = 'lime';
    }
  },
});

function onButtonStartClick(e) {
  console.log('посчитаем время');
  let diferentTime;

  const timerID = setInterval(() => {
    const dateNow = new Date();
    console.log(dateNow);

    console.log(dateNow.getTime());

    console.log(selectedDate.getTime());

    diferentTime = selectedDate.getTime() - dateNow.getTime();
    if (diferentTime > 0) {
      console.log(diferentTime);
      console.log(convertMs(diferentTime));

      updateClockFace(convertMs(diferentTime));
    } else clearInterval(timerID);
  }, 1000);
}

function updateClockFace({ days, hours, minutes, seconds }) {
  console.log((refs.daysFieldEl.textContent = ` ${days} : `));
  console.log((refs.hoursFieldEl.textContent = ` ${hours} : `));
  console.log((refs.minutesFieldEl.textContent = ` ${minutes} : `));
  console.log((refs.secondsFieldEl.textContent = ` ${seconds} : `));
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2, '0');
}
