
 var video;
 var play;
 var pause;

function initVideoPlayer(){

  video= document.getElementById("myVideo"); 
  play= document.getElementById("play"); 
  pause= document.getElementById("pause"); 

  play.addEventListener("click", playVideo, false);
  pause.addEventListener("click", pauseVideo, false);


}



function playVideo() {

 video.play();
}

function pauseVideo() {
 video.pause();
}
