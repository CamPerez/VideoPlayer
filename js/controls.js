
 var video;
 var play;
 var pause;
 var fullscreen;
 var barra;
 var magic;
 var screenshot;
 var subs;
 var context;
 var canvas;
 var filter;
 var cw;
 var ch;
 var scaleFactor;
 var snapshots;
 var speed;
 var videospeed;
 var play_button;
 var divBlack, divInfoRight;


 var track_info, track_info2, nomvideo;



function initVideoPlayer(nv){

  canvas = document.getElementById('c');
  context = canvas.getContext('2d');
  filter="normal";
  speed="normal";
  nomvideo=nv;
  scaleFactor = 0.25;
  snapshots = [];

  video= document.getElementById("myVideo"); 
  play= document.getElementById("play"); 
  pause= document.getElementById("pause"); 
  stop= document.getElementById("stop");
  fullscreen= document.getElementById("fullscreen");
  vol = document.getElementById("volumen");
  magic= document.getElementById("magic");
  screenshot= document.getElementById("screenshot");
  videospeed= document.getElementById("videospeed");
  play_button= document.getElementById("play_button");
  divBlack= document.getElementById("divBlack");
  divInfoRight= document.getElementById("divInfoRight");
  src_mp4= document.getElementById("src_mp4");
  subs= document.getElementById("subs");

  canvas.addEventListener("click", playPauseVideo, false);
  play_button.addEventListener("click", playPauseVideo, false);
  play.addEventListener("click", playVideo, false);
  pause.addEventListener("click", pauseVideo, false);
  stop.addEventListener("click", stopVideo, false);
  fullscreen.addEventListener("click", fullScreenVideo, false);
  vol.addEventListener("input", changeVolumVideo, false);
  magic.addEventListener("click", putFilter, false);
  screenshot.addEventListener("click",paintFrame,false);
  videospeed.addEventListener("click",speedVideo,false);
  divBlack.addEventListener("click", cleanCassettePlayer, false);
  subs.addEventListener("click",subsActive,false);

  video.addEventListener("loadedmetadata", function() { 
    video.textTracks[0].mode = "showing"; // thanks Firefox 
  });

  
  crearSourcesVideo();
  crearTextTrackMetadata();

  cw = canvas.clientWidth;
  ch = canvas.clientHeight;
  canvas.width = cw;
  canvas.height = ch;

  $(video).on("play", function(){
    draw(video,context,cw,ch,filter);
    video.style.display="none";
  });
}


function crearTextTrackMetadata(){

  /*src_webm.src= "video/webm/"+nomvideo+".webm";
  src_ogg.src= "video/ogg/"+nomvideo+".ogg";
  console.log("despues de reiniciar nuevo cassete, la activa es: ");
  console.log(document.getElementById("myVideo").textTracks[0]);
   
 
  document.getElementById("myVideo").textTracks[0].addEventListener("cuechange", metadata, false);
  */
  track_info = document.createElement("track");
     track_info.kind = "metadata";  
     track_info.src = "textTrack/"+nomvideo+".vtt";
     
     track_info.addEventListener("cuechange", function() { 
        this.mode = "showing"; 
        video.textTracks[0].mode = "showing"; // thanks Firefox 

        document.getElementById("myVideo").textTracks[0].mode="showing";

        var json = JSON.parse(document.getElementById("myVideo").textTracks[0].activeCues[0].text);
        document.getElementById("infoTitle").innerHTML = "<strong>T&iacutetulo</strong>: "+ json["title"];
        document.getElementById("infoAlbum").innerHTML = "<strong>&Aacutelbum:</strong> "+ json["album"];
        document.getElementById("infoPublication").innerHTML = "<strong>Fecha de publicaci&oacuten:</strong> "+ json["publication"];
        document.getElementById("infoRecord").innerHTML = "<strong>Fecha de grabaci&oacuten:</strong> "+ json["record"];
        document.getElementById("infoGenre").innerHTML = "<strong>G&eacutenero musical:</strong> "+ json["genre"];
        document.getElementById("infoLabel").innerHTML = "<strong>Sello discogr&aacutefico:</strong> "+ json["label"];
        document.getElementById("infoAuthors").innerHTML = "<strong>Autores:</strong> "+ json["authors"];
        document.getElementById("infoProducers").innerHTML = "<strong>Productores:</strong> "+ json["producers"];
        document.getElementById("infoSrc").innerHTML = "<img class='img-responsive imgCover-size' src=" + json['src'] +" />";
        document.getElementById("infoWiki").innerHTML = "<strong>M&aacutes informaci&oacuten:</strong> "+ "<a target='_blank' href=" + json['wiki'] +">" + json['wiki'] +"</a>";
      }); 

      video.appendChild(track_info);
 
}

function crearSourcesVideo(){
  var src_mp4= document.createElement("source");
  src_mp4.src= "video/mp4/"+nomvideo+".mp4";
  src_mp4.type= "video/mp4";
  video.appendChild(src_mp4);
  video.load(); 
}
//Active subtitles
function subsActive(){
  var subsVideo = document.getElementById("subsVideo");
  if (subsVideo.style.visibility=="hidden"){
    subsVideo.style.visibility="visible";
  }else{    
    subsVideo.style.visibility="hidden";
  }
}


function cleanCassettePlayer(){
  video.pause();

 /* console.log("la activa es ");
  console.log(document.getElementById("myVideo").textTracks[0]);
  for (var i = 0; i <= document.getElementById("myVideo").textTracks[0].activeCues.length; i++) {
    document.getElementById("myVideo").textTracks[0].removeCue(document.getElementById("myVideo").textTracks[0].activeCues[i]);
  };*/
  $( "video" ).empty();
  $( "#divScreenshot" ).empty();
}

/*function metadata() {

  document.getElementById("myVideo").textTracks[0].mode="showing";

  var json = JSON.parse(document.getElementById("myVideo").textTracks[0].activeCues[0].text);
  document.getElementById("infoTitle").innerHTML = "<strong>T&iacutetulo</strong>: "+ json["title"];
  document.getElementById("infoAlbum").innerHTML = "<strong>&Aacutelbum:</strong> "+ json["album"];
  document.getElementById("infoPublication").innerHTML = "<strong>Fecha de publicaci&oacuten:</strong> "+ json["publication"];
  document.getElementById("infoRecord").innerHTML = "<strong>Fecha de grabaci&oacuten:</strong> "+ json["record"];
  document.getElementById("infoGenre").innerHTML = "<strong>G&eacutenero musical:</strong> "+ json["genre"];
  document.getElementById("infoLabel").innerHTML = "<strong>Sello discogr&aacutefico:</strong> "+ json["label"];
  document.getElementById("infoAuthors").innerHTML = "<strong>Autores:</strong> "+ json["authors"];
  document.getElementById("infoProducers").innerHTML = "<strong>Productores:</strong> "+ json["producers"];
  document.getElementById("infoSrc").innerHTML = "<img class='img-responsive imgCover-size' src=" + json['src'] +" />";
  document.getElementById("infoWiki").innerHTML = "<strong>M&aacutes informaci&oacuten:</strong> "+ "<a target='_blank' href=" + json['wiki'] +">" + json['wiki'] +"</a>";

}*/

function playPauseVideo(){
  if (video.paused === false) {
        video.pause();
        play_button.style.visibility="visible";
        pause.click();
    } else {
        video.play();
        play_button.style.visibility="hidden";
        play.click();
    }
}


function playVideo() {
 video.play();
 play_button.style.visibility="hidden";
}

function pauseVideo() {
 video.pause();
 play_button.style.visibility="visible";
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

 
 /*CANVAS: FILTROS DE VÍDEO*/

  function putFilter(){
  if(filter=="grey"){
    filter="tint";
  }else if(filter=="tint"){
    filter="color";
  }else if(filter=="color"){
    filter="normal";
  }else if(filter=="normal"){
    filter="grey";
  }
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


/* SALTOS DE TIEMPO */




/* VELOCIDAD VÍDEO */

function speedVideo(){

  if(speed=="normal"){
      speed="fast";
      video.playbackRate  = 2.0;
  }else if(speed=="fast"){
      speed="slow";
      video.playbackRate  = 0.5;
  }else if(speed=="slow"){
      speed="normal";
      video.playbackRate  = 1.0;
  }
}


/* SCREENSHOT */

function paintFrame() {
  var elementID = 'canvas' + $('canvas').length;
    
    $('<canvas class="col-xs-12 col-sm-12 col-md-12 col-lg-6">').attr({
        id: elementID
    }).css({
      left: 20 + 'px',
      top: 8 + 'px'
    }).appendTo('#divScreenshot');

    var c = document.getElementById(elementID);
    var ctx = c.getContext('2d');
    ctx.drawImage(video, 0, 0, 250, 140);
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

  $('#videospeed').click(function(){
      $("#videospeed").addClass("vc-control-pressed");     
      //When pass 0.8 sec change image (class)
      setTimeout(function() {
            $("#videospeed").removeClass("vc-control-pressed");
      },80);                
  });

  $('#screenshot').click(function(){
      $("#screenshot").addClass("vc-control-pressed");     
      //When pass 0.8 sec change image (class)
      setTimeout(function() {
            $("#screenshot").removeClass("vc-control-pressed");
      },80);                
  });

  $('#fullscreen').click(function(){
      $("#fullscreen").addClass("vc-control-pressed");     
      //When pass 0.8 sec change image (class)
      setTimeout(function() {
            $("#fullscreen").removeClass("vc-control-pressed");
      },80);                
  });
  
  $('#subs').click(function(){
      $("#subs").addClass("vc-control-pressed");     
      //When pass 0.8 sec change image (class)
      setTimeout(function() {
            $("#subs").removeClass("vc-control-pressed");
      },80);                
  });
  
  $('#liChapters').click(function(){
      $("#liChapters").addClass("vc-control-pressed");     
      //When pass 0.8 sec change image (class)
      setTimeout(function() {
            $("#liChapters").removeClass("vc-control-pressed");
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

      $('#videospeed').click(function() {
          audioElement.play();
      });

      $('#screenshot').click(function() {
          audioElement.play();
      });

      $('#fullscreen').click(function() {
          audioElement.play();
      });
      
      $('#subs').click(function() {
          audioElement.play();
      });
  
      $('#liChapters').click(function() {
          audioElement.play();
      });
  });

 
//PROGRESS BAR

mediaPlayer.addEventListener('timeupdate', updateProgressBar, false);


function updateProgressBar() {
   var progressBar = document.getElementById('progress-bar');
   var percentage = Math.floor((100 / mediaPlayer.duration) * mediaPlayer.currentTime);
   progressBar.value = percentage;
   progressBar.innerHTML = percentage + '% played';
}

function resetPlayer() {
   progressBar.value = 0;
   mediaPlayer.currentTime = 0;
   changeButtonType(playPauseBtn, 'play');
}

/*CHAPTERS*/

function displayChapters(){

  var liChapters = document.getElementById("liChapters");

  var video = document.getElementById("myVideo");
  var textTrack = document.getElementById("myVideo").textTracks[1];
  var locationList = document.getElementById("chapters");
  
  if (textTrack.kind === "chapters"){
    textTrack.mode = 'hidden';
    //var cues = textTrack.cues;
    //var cuesRev = cues.reverse();
    //textTrack.cues.length --> BUG GOOGLE CHROME
    //Need click twices --> BUG GOOGLE CHROME

    for (var i = 0; i <= 2 ; i++) {
      cue = textTrack.cues[i];
      chapterName = cue.text; //BUG TWICE CLICK       
      start = cue.startTime;
      newLocale = document.createElement("li");
      newLocale.setAttribute('id', start);
      var localeDescription = document.createTextNode(cue.text);
      newLocale.appendChild(localeDescription);
      
      var locationList = document.getElementById("chapters");
      locationList.insertBefore(newLocale, locationList.childNodes[0]);
      //Add Bootstrap List Groups
      document.getElementById(start).className = "list-group-item";

      newLocale.addEventListener("click", function() {
        video.currentTime = this.id;
      },false);
    }
  }
  //Hidden button to show chapters
  liChapters.style.visibility = "hidden";
  //Sort List --> Reverse List
  var i = locationList.childNodes.length;
  while (i--)
  locationList.appendChild(locationList.childNodes[i]);
}



