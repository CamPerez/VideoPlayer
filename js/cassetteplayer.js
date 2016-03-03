/************************************/
//HIDDEN BIG CASSETE AND DIV BLACK
/************************************/
$(document).ready(function () { 
    $(document).click(function() {
      $("#divBlack").click(function(){        
          $('#divCassette').css('visibility', 'hidden');
          $('#divBlack').css('visibility', 'hidden');
          $('#divInfoRight').css('visibility', 'hidden');
      });
  });
});
/********************************/
//SHOW BIG CASSETE AND DIV BLACK
/********************************/

function blackFunction() {
    document.getElementById("divCassette").style.visibility="visible";
    document.getElementById("divInfoRight").style.visibility="visible";
    document.getElementById("divBlack").style.visibility="visible";
    //scroll the document to top    
    window.scrollTo(0, 0);
}




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
