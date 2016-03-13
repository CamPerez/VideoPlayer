/************************************/
//HIDDEN BIG CASSETE AND DIV BLACK
/************************************/
$(document).ready(function () { 
    $(document).click(function() {
      $("#divBlack").click(function(){        
          $('#divCassette').css('visibility', 'hidden');
          $('#divBlack').css('visibility', 'hidden');
          $('#divInfoRight').css('visibility', 'hidden');
          $('#divScreenshot').css('visibility', 'hidden');
          $('#play_button').css('visibility', 'hidden');
          $('#divChapters').css('visibility', 'hidden');
          $('#coverVideo').css('visibility', 'hidden');
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
    document.getElementById("divScreenshot").style.visibility="visible";
    document.getElementById("play_button").style.visibility="visible";
    document.getElementById("divChapters").style.visibility="visible";
    document.getElementById("coverVideo").style.visibility="visible";
    //scroll the document to top    
    window.scrollTo(0, 0);
}



