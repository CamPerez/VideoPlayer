
 var video;
 var play;
 var pause;
 var fullscreen;
 var isVideoFullScreen;

function initVideoPlayer(){

  video= document.getElementById("myVideo"); 
  play= document.getElementById("play"); 
  pause= document.getElementById("pause"); 
  stop= document.getElementById("stop");
  fullscreen= document.getElementById("fullscreen");

  isVideoFullScreen=false;

  play.addEventListener("click", playVideo, false);
  pause.addEventListener("click", pauseVideo, false);
  stop.addEventListener("click", stopVideo, false);
  fullscreen.addEventListener("click", fullscreenVideo,false);

}

function fullscreenVideo(){
  isVideoFullScreen ? that.fullScreenOff() : that.fullScreenOn();
}

function SetVolume(val){
  console.log('Before: ' + player.volume);
  video.volume = val / 100;
  console.log('After: ' + player.volume);
}

function playVideo() {
 video.play();
}

function pauseVideo() {
 video.pause();
}

function stopVideo(){
 video.pause();
 video.currentTime = 0;
}