const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  bodyElem: document.querySelector('body'),
};

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onStartBtnClick() {
  refs.startBtn.setAttribute('disabled', true);

  refs.stopBtn.removeAttribute('disabled');

  timerID = setInterval(() => {
    refs.bodyElem.style.backgroundColor = `#${Math.floor(
      Math.random() * 16777215
    ).toString(16)}`;
    // console.log('меняем цвет фона');
  }, 1000);
}

function onStopBtnClick() {
  clearInterval(timerID);

  refs.stopBtn.setAttribute('disabled', true);
  refs.startBtn.removeAttribute('disabled');
  //   console.log(refs.startBtn);
  //   console.log('останавливаем таймер');
}
