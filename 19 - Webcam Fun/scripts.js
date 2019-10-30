const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo(){
  navigator.mediaDevices.getUserMedia({video: true, audio: false})
    .then(localMediaStream => {
      console.log(localMediaStream)
      video.srcObject  = localMediaStream;
      video.play();
      //after video init, eventListenrer will call function paintToCanvas
    })
    .catch(err => {
      console.log("err", err);
    }) 
}

function paintToCanvas(){
  const {videoWidth: width, videoHeight: height} = video;
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0 ,0 , width, height);

    let pixels = ctx.getImageData(0,0,width, height);
    //pixels = redEffect(pixels);
    pixels = rpgSplit(pixels);
    //speed 0.5
    ctx.globalAlpha = 0.5;
    ctx.putImageData(pixels, 0, 0);

  }, 16)
}

function takePhoto() {
  snap.currentTime = 0;
  snap.play();
  //take the data out of the canvas
  const data = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'handsome');
  link.innerHTML = `<img src="${data}" alt="handsome man"/>`;
  strip.insertBefore(link, strip.firstChild);
  console.log(data)
}

function redEffect(pixels){
  const length = pixels.data.length;
  for(let i = 0; i < length; i += 4){
    pixels.data[i] = pixels.data[i] + 200; //RED
    pixels.data[i + 1] = pixels.data[i + 1] - 50; //GREEN
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; //BLUE
  }
  return pixels;
}

function rpgSplit(pixels){
  const length = pixels.data.length;
  for(let i = 0; i < length; i += 4){
    pixels.data[i - 150] = pixels.data[i]; //RED
    pixels.data[i + 500] = pixels.data[i + 1]; //GREEN
    pixels.data[i - 550] = pixels.data[i + 2]; //BLUE
  }
  return pixels;
}

getVideo();

video.addEventListener("canplay", paintToCanvas);
