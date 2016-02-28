
 var video;
 var play;
 var pause;
 var fullscreen;
 var barra;
 var magic;
 var screenshot;
 var context;
 var canvas;
 var filter;
 var cw;
 var ch;

function initVideoPlayer(){

  canvas = document.getElementById('c');
  context = canvas.getContext('2d');
  filter=undefined;

  cw = canvas.clientWidth;
  ch = canvas.clientHeight;
  canvas.width = cw;
  canvas.height = ch;

  video= document.getElementById("myVideo"); 
  play= document.getElementById("play"); 
  pause= document.getElementById("pause"); 
  stop= document.getElementById("stop");
  fullscreen= document.getElementById("fullscreen");
  vol = document.getElementById("volumen");
  magic= document.getElementById("magic");
  magic1= document.getElementById("magic1");
  magic2= document.getElementById("magic2");
  magic3= document.getElementById("magic3");
  screenshot= document.getElementById("screenshot");

  play.addEventListener("click", playVideo, false);
  pause.addEventListener("click", pauseVideo, false);
  stop.addEventListener("click", stopVideo, false);
  fullscreen.addEventListener("click", fullScreenVideo, false);
  vol.addEventListener("input", changeVolumVideo, false);
  magic.addEventListener("click", greyFilter, false);
  magic1.addEventListener("click", tintFilter, false);
  magic2.addEventListener("click", colorFilter, false);
  magic3.addEventListener("click", noneFilter, false);
  
  $(video).on("play", function(){
    draw(video,context,cw,ch,filter);
  });
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

function fullScreenVideo(){
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.mozRequestFullScreen) {
    video.mozRequestFullScreen();
  } else if (video.webkitRequestFullscreen) {
    video.webkitRequestFullscreen();
  }
}

function changeVolumVideo(){
 video.volume= (vol.value/100);
}



 
 /*CANVAS: VIDEO EN BLANCO Y NEGRO*/

 function greyFilter(){
  filter="grey";
  video.pause();
  setTimeout("$('#play').trigger('click')",20);
 }

 function tintFilter(){
  filter="tint";
  video.pause();
  setTimeout("$('#play').trigger('click')",20);
 }

 function colorFilter(){
  filter="color";
  video.pause();
  setTimeout("$('#play').trigger('click')",20);
 }

 function noneFilter(){
  filter=undefined;
  video.pause();
  setTimeout("$('#play').trigger('click')",20);
 }

function filterdata(idata,type) {

    switch(type){
      case "grey":
        var data = idata.data;
        for(var i = 0; i < data.length; i+=4) {
          var r = data[i];
          var g = data[i+1];
          var b = data[i+2];
          var brightness = parseInt((r + g + b) / 3);
          data[i] = brightness;
          data[i+1] = brightness;
          data[i+2] = brightness;
        }
        idata.data = data;
        return idata;
        break;
      case "color":
        var data = idata.data;
        for(var i = 0; i < data.length; i+=4) {
          data[i] = 0;
        }
        idata.data = data;
        return idata;
        break;
      case "tint":
        var data = idata.data;
        for(var i = 0; i < data.length; i+=4) {
          var average = (data[i] + data[i+1] + data[i+2]) /3;
          data[i] = average;
          data[i+1] = average + 30;
          data[i+2] = average;
        }
        idata.data = data;
        return idata;
        break;        
      default:
        return idata;
    }
  }
  

function draw(v,c,w,h,filter) {

    if(v.paused || v.ended) return false;
    c.drawImage(v,0,0,w,h);

      var idata = c.getImageData(0,0,w,h);
      newdata = filterdata(idata,filter);
      c.putImageData(newdata,0,0);
 

    setTimeout(draw,20,v,c,w,h,filter);

  }


 /*EFECTO LUZ DE FONDO*/

  $(document).ready(function() {
    $('#light').click(function() {  
      if ($('#divBlack').css("opacity") == 0.40) {
        $('#divBlack').css("opacity", 0.75);
        $("#ilight").removeClass("fa fa-star-o");
        $("#ilight").addClass("fa fa-star-half-o");      
      }else{
        if ($('#divBlack').css("opacity") == 0.75) {
          $('#divBlack').css("opacity", 0.90);
          $("#ilight").removeClass("fa fa-star-half-o");
          $("#ilight").addClass("fa fa-star");     
        }else{             
          if ($('#divBlack').css("opacity") == 0.90) {
            $('#divBlack').css("opacity", 0.40);
          $("#ilight").removeClass("fa fa-star");
          $("#ilight").addClass("fa fa-star-o");     
          } 
        }
      };
    });
  });


 /*EFECTO PROFUNDIDAD BOTONES*/

$(document).ready(function () { 
  $('#play').click(function(){ 
      $("#play").addClass("vc-control-active");
      $("#pause").removeClass("vc-control-active");
      $("#stop").removeClass("vc-control-active");
  }); 
  $('#pause').click(function(){
      $("#pause").addClass("vc-control-active");
      $("#play").removeClass("vc-control-active");
      $("#stop").removeClass("vc-control-active");
  });

  $('#stop').click(function(){
      $("#stop").addClass("vc-control-pressed");     
      //When pass 0.8 sec change image (class)
      setTimeout(function() {
            $("#stop").removeClass("vc-control-pressed");
      },80);                
      $("#play").removeClass("vc-control-active");
      $("#pause").removeClass("vc-control-active");
  });

  $('#light').click(function(){
      $("#light").addClass("vc-control-pressed");     
      //When pass 0.8 sec change image (class)
      setTimeout(function() {
            $("#light").removeClass("vc-control-pressed");
      },80);                
  });

  $('#magic').click(function(){
      $("#magic").addClass("vc-control-pressed");     
      //When pass 0.8 sec change image (class)
      setTimeout(function() {
            $("#magic").removeClass("vc-control-pressed");
      },80);                
  });

  $('#magic1').click(function(){
      $("#magic1").addClass("vc-control-pressed");     
      //When pass 0.8 sec change image (class)
      setTimeout(function() {
            $("#magic1").removeClass("vc-control-pressed");
      },80);                
  });

  $('#magic2').click(function(){
      $("#magic2").addClass("vc-control-pressed");     
      //When pass 0.8 sec change image (class)
      setTimeout(function() {
            $("#magic2").removeClass("vc-control-pressed");
      },80);                
  });

  $('#screenshot').click(function(){
      $("#screenshot").addClass("vc-control-pressed");     
      //When pass 0.8 sec change image (class)
      setTimeout(function() {
            $("#screenshot").removeClass("vc-control-pressed");
      },80);                
  });

  $('#cc').click(function(){
      $("#cc").addClass("vc-control-pressed");     
      //When pass 0.8 sec change image (class)
      setTimeout(function() {
            $("#cc").removeClass("vc-control-pressed");
      },80);                
  });

  $('#fullscreen').click(function(){
      $("#fullscreen").addClass("vc-control-pressed");     
      //When pass 0.8 sec change image (class)
      setTimeout(function() {
            $("#fullscreen").removeClass("vc-control-pressed");
      },80);                
  });
});


/*EFECTOS DE AUDIO DE LOS BOTONES*/

  $(document).ready(function() {
      var audioElement = document.createElement('audio');
      audioElement.setAttribute('src', 'sounds/click.mp3');

      $.get();

      audioElement.addEventListener("load", function() {
          audioElement.play();
      }, true);

      $('#play').click(function() {
          audioElement.play();
      });

      $('#pause').click(function() {
          audioElement.play();
      });

      $('#stop').click(function() {
          audioElement.play();
      });

      $('#light').click(function() {
          audioElement.play();
      });

      $('#cc').click(function() {
          audioElement.play();
      });

      $('#magic').click(function() {
          audioElement.play();
      });

      $('#screenshot').click(function() {
          audioElement.play();
      });

      $('#fullscreen').click(function() {
          audioElement.play();
      });
  });

 







