let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
let interval;

function startCountTime(){
  clearInterval(interval);
  countdown = Number.parseInt(this.dataset.time);
  const timeEnd = new Date(new Date().getTime() + countdown*1000);
  endTime.innerHTML = `Be Back At ${timeEnd.getHours()}:${timeEnd.getMinutes()}`
  console.log(countdown);
  interval = setInterval(()=>{
    const minute = Math.floor(countdown / 60);
    const second = countdown % 60;
    timerDisplay.innerHTML = minute + ":" + second;
    countdown -= 1;
    if(countdown === 0){
      clearInterval(interval);
    }
  }, 1000)
}

buttons.forEach(button => button.addEventListener('click', startCountTime))