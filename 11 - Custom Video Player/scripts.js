const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

console.log('video',video)
function togglePlay(){
  if(video.paused){
    video.play();
  }else{
    video.pause();
  }
  this.innerHTML = video.paused? '►' : '❚ ❚';
}
toggle.addEventListener('click', togglePlay)
video.addEventListener('click', function(e){
  if(video.paused){
    video.play();
  }else{
    video.pause();
  }
  toggle.innerHTML = video.paused? '►' : '❚ ❚';
})

function handleChange(e){
  video[this.name] = this.value;
}
ranges.forEach(range => {
  range.addEventListener('change', handleChange);
  range.addEventListener('mousemove', handleChange);
})

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}
video.addEventListener('timeupdate', handleProgress);

function scrub(e){
 
  const percent = (e.offsetX / progress.offsetWidth);
  video.currentTime = percent * video.duration;

}

let isMoving = false;
progress.addEventListener('mousedown', () => {
  isMoving = true;
})
progress.addEventListener('mouseup', () => {
  isMoving = false;
})
progress.addEventListener('mousemove', (e) => isMoving && scrub(e))
progress.addEventListener('click', (e) => scrub(e))