const inputEl = document.querySelector('input'); 
const buttonEl = document.querySelector('button'); 
const timerEl = document.querySelector('span');

// функция для форматирования времени в формате "hh:mm:ss"
const formatTime = (timeInSeconds) => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = timeInSeconds % 60;

  // добавляем в начало ноль при необходимости
  const formattedHours = hours.toString().padStart(2, '0'); 
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

// функция которая будет анимировать timerEl
const createTimerAnimator = () => {
  // id интервала для обновления таймера
  let intervalId; 

  return (seconds) => {
    // оставшееся количество секунд
    let remainingSeconds = seconds; 

    // очищаем предыдущий интервал, чтобы избежать множественных интервалов
    clearInterval(intervalId); 

    intervalId = setInterval(() => {
      if (remainingSeconds > 0) {
        // обновляем отображение таймера
        timerEl.textContent = formatTime(remainingSeconds); 
        remainingSeconds--;
      } else {
        // останавливаем интервал, когда время истекло и показываем "00:00:00" после завершения
        clearInterval(intervalId); 
        timerEl.textContent = '00:00:00';
      }
    }, 1000); // интервал в 1 секунду
  };
};

// создаем анимацию таймера
const animateTimer = createTimerAnimator(); 

// оставляем только цифры в поле ввода
inputEl.addEventListener('input', () => {
  inputEl.value = inputEl.value.replace(/\D/g, '');
});

// запускаем анимацию таймера
buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);

  animateTimer(seconds); 

  inputEl.value = '';
});
