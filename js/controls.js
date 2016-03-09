
 var video;
 var play,pause,stop;
 var fullscreen;
 var barra;
 var magic;
 var screenshot;
 var subs;
 var context;
 var canvas;
 var filter;
 var cw,ch;
 var scaleFactor;
 var snapshots;
 var speed;
 var videospeed;
 var play_button;
 var divBlack, subsVideo, locationList;
 var liChapters;
 var chapter_clicked;
 var track_info, track_chapters, track_subs, nomvideo;
 var jSrc, jTitle, jAlbum, jPublic,jRecord,jGenre,jLabel,jAuthors,jProducers,jWiki;


function initVideoPlayer(nv){

  canvas = document.getElementById('c');
  context = canvas.getContext('2d');
  filter="normal";
  speed="normal";
  chapter_clicked= false;
  nomvideo=nv;
  scaleFactor = 0.25;
  snapshots = [];

  jSrc= document.createElement("h4");
  jTitle= document.createElement("h4");
  jAlbum= document.createElement("h4");
  jPublic= document.createElement("h4");
  jRecord= document.createElement("h4");
  jGenre= document.createElement("h4");
  jLabel= document.createElement("h4");
  jAuthors= document.createElement("h4");
  jProducers= document.createElement("h4");
  jWiki= document.createElement("h4");
  divInfoRight.appendChild(jSrc);
  divInfoRight.appendChild(jTitle);
  divInfoRight.appendChild(jAlbum);
  divInfoRight.appendChild(jPublic);
  divInfoRight.appendChild(jRecord);
  divInfoRight.appendChild(jGenre);
  divInfoRight.appendChild(jLabel);
  divInfoRight.appendChild(jAuthors);
  divInfoRight.appendChild(jProducers);
  divInfoRight.appendChild(jWiki);

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
  subsVideo = document.getElementById("subsVideo");
  subsVideo.style.visibility="hidden";
  divInfoRight= document.getElementById("divInfoRight");
  src_mp4= document.getElementById("src_mp4");
  subs= document.getElementById("subs");
  liChapters= document.getElementById("liChapters");

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
  liChapters.addEventListener("click", displayChapters,false);

  video.addEventListener("loadedmetadata", function() { 
    video.textTracks[0].mode = "showing"; // thanks Firefox 
    video.textTracks[1].mode = "hidden"; // thanks Firefox 
    video.textTracks[2].mode = "hidden"; // thanks Firefox 
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
  track_info = document.createElement("track");
  track_info.kind = "metadata";  
  track_info.src = "textTrack/"+nomvideo+".vtt";
     
  track_info.addEventListener("cuechange", function() { 
      this.mode = "showing"; 
      video.textTracks[0].mode = "showing"; // thanks Firefox 

      document.getElementById("myVideo").textTracks[0].mode="showing";

      var json = JSON.parse(document.getElementById("myVideo").textTracks[0].activeCues[0].text);
      
      
      jSrc.innerHTML = "<img class='img-responsive imgCover-size' src=" + json['src'] +" />";
      
      jTitle.innerHTML = "<strong>T&iacutetulo</strong>: "+ json["title"];
      
      jAlbum.innerHTML = "<strong>&Aacutelbum:</strong> "+ json["album"];
      
      jPublic.innerHTML = "<strong>Fecha de publicaci&oacuten:</strong> "+ json["publication"];
     
      jRecord.innerHTML = "<strong>Fecha de grabaci&oacuten:</strong> "+ json["record"];
      
      jGenre.innerHTML = "<strong>G&eacutenero musical:</strong> "+ json["genre"];
     
      jLabel.innerHTML = "<strong>Sello discogr&aacutefico:</strong> "+ json["label"];
     
      jAuthors.innerHTML = "<strong>Autores:</strong> "+ json["authors"];
      
      jProducers.innerHTML = "<strong>Productores:</strong> "+ json["producers"];
      
      jWiki.innerHTML = "<strong>M&aacutes informaci&oacuten:</strong> "+ "<a target='_blank' href=" + json['wiki'] +">" + json['wiki'] +"</a>";
  
      

   }); 


  track_chapters = document.createElement("track");
  track_chapters.kind = "chapters";  
  track_chapters.src="textTrack/chapters_"+nomvideo+".vtt";

  track_subs = document.createElement("track");
  track_subs.kind = "subtitles";  
  track_subs.srclang= "en";
  track_subs.src="textTrack/sub_"+nomvideo+".vtt";

  track_subs.addEventListener("cuechange", function(){
    this.mode = "showing"; 
    video.textTracks[2].mode = "showing"; // thanks Firefox 
    document.getElementById("myVideo").textTracks[2].mode="showing";

    document.getElementById("subsVideo").innerHTML = video.textTracks[2].activeCues[0].text;
  });

  video.appendChild(track_info);
  video.appendChild(track_chapters);
  video.appendChild(track_subs);
}

function crearSourcesVideo(){
  var src_mp4= document.createElement("source");
  src_mp4.src= "video/mp4/"+nomvideo+".mp4";
  src_mp4.type= "video/mp4";
  video.appendChild(src_mp4);
  video.load(); 
}


function subsActive(){
  
  if (subsVideo.style.visibility=="hidden"){
    subsVideo.style.visibility="visible";
  }else{    
    subsVideo.style.visibility="hidden";
  }
}


function cleanCassettePlayer(){
  video.pause();

  $( "video" ).empty();
  $( "#divScreenshot" ).empty();
  $( "#divInfoRight" ).empty();
  subsVideo.style.visibility="hidden";
  locationList.style.visibility="hidden";
}


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

 
/********************************/
//CANVAS:FILTRO DE VIDEO 
/********************************/

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


/********************************/
//vVELOCIDAD DEL VIDEO
/********************************/

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


/********************************/
//SCREENSHOT
/********************************/

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


/********************************/
//PROFUNDIDAD BOTONES
/********************************/

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


/********************************/
//AUDIO BOTONES
/********************************/

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


/********************************/
//PROGRESS BAR 
/********************************/
$(document).ready(function(){

  var video = $('#myVideo');

  //remove default control when JS loaded
  $('.control').css('visibility', 'hidden');
  $('.control').show().css({'bottom':5});

  $(document).mousemove(function() { 
    $('#c').hover(      
      function() {
        $('.control').css('visibility', 'visible');
        $('.control').stop().animate({'bottom':20}, 250);
      },
      function() {
        $('.control').css('visibility', 'hidden');
      }
    );
    $('.control').hover(      
      function() {
        $('.control').css('visibility', 'visible');
      },
      function() {
        $('.control').css('visibility', 'hidden');
      }
    );
  });


  //display video buffering bar
  var startBuffer = function() {
    var currentBuffer = video[0].buffered.end(0);
    var maxduration = video[0].duration;
    var perc = 100 * currentBuffer / maxduration;
    $('.bufferBar').css('width',perc+'%');
      
    if(currentBuffer < maxduration) {
      setTimeout(startBuffer, 500);
    }
  };  
  
  //display current video play time
  video.on('timeupdate', function() {
    var currentPos = video[0].currentTime;
    var maxduration = video[0].duration;
    var perc = 100 * currentPos / maxduration;
    $('.timeBar').css('width',perc+'%');  
    $('.current').text(timeFormat(currentPos)); 

    $('.duration').text(timeFormat(maxduration));
  });
  

  //VIDEO PROGRESS BAR
  //when video timebar clicked
  var timeDrag = false; /* check for drag event */
  $('.progress').on('mousedown', function(e) {
    timeDrag = true;
    updatebar(e.pageX);
  });
  $(document).on('mouseup', function(e) {
    if(timeDrag) {
      timeDrag = false;
      updatebar(e.pageX);
    }
  });
  $(document).on('mousemove', function(e) {
    if(timeDrag) {
      updatebar(e.pageX);
    }
  });
  var updatebar = function(x) {
    var progress = $('.progress');
    
    //calculate drag position
    //and update video currenttime
    //as well as progress bar
    var maxduration = video[0].duration;
    var position = x - progress.offset().left;
    var percentage = 100 * position / progress.width();
    if(percentage > 100) {
      percentage = 100;
    }
    if(percentage < 0) {
      percentage = 0;
    }
    $('.timeBar').css('width',percentage+'%');  
    video[0].currentTime = maxduration * percentage / 100;
  };

    //Time format converter - 00:00
  var timeFormat = function(seconds){
    var m = Math.floor(seconds/60)<10 ? "0"+Math.floor(seconds/60) : Math.floor(seconds/60);
    var s = Math.floor(seconds-(m*60))<10 ? "0"+Math.floor(seconds-(m*60)) : Math.floor(seconds-(m*60));
    return m+":"+s;
  };
  
});


 
/********************************/
// CHAPTERS 
/********************************/

function displayChapters(){

  var cue;
  locationList = document.getElementById("chapters");
  track_chapters = video.textTracks[1];
  track_chapters.src="textTrack/chapters_"+nomvideo+".vtt";

  if(!chapter_clicked){
    $("#chapters").empty();
    locationList = document.getElementById("chapters");
    if (track_chapters.kind === "chapters"){
    track_chapters.mode = "hidden";

    //var cues = textTrack.cues;
    //var cuesRev = cues.reverse();
    //textTrack.cues.length --> BUG GOOGLE CHROME
    //Need click twices --> BUG GOOGLE CHROME

      for (var i = 0; i <= 2 ; i++) {
        cue = track_chapters.cues[i];
        chapterName = cue.text; //BUG TWICE CLICK       
        start = cue.startTime;
        newLocale = document.createElement("li");
        newLocale.setAttribute('id', start);
        var localeDescription = document.createTextNode(cue.text);
        newLocale.appendChild(localeDescription);
        
        //var locationList = document.getElementById("chapters");
        locationList.insertBefore(newLocale, locationList.childNodes[0]);
        //Add Bootstrap List Groups
        document.getElementById(start).className = "list-group-item";

        newLocale.addEventListener("click", function() {
          video.currentTime = this.id;
        },false);
      }
    }
    //Hidden button to show chapters
    //liChapters.style.display = "none";
    //Sort List --> Reverse List
    var i = locationList.childNodes.length;
    while (i--)
    locationList.appendChild(locationList.childNodes[i]);
    locationList.style.visibility="visible";
    chapter_clicked=true;
  
  }else{
    locationList.style.visibility="hidden";
    chapter_clicked=false;
  }

 
}



