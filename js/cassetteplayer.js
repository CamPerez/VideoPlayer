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
/*
jQuery(function ($) {
    $('#progressBar').click(function () {
        var val = Math.floor((Math.random() * 100)) + '%';
        $('.progress-bar').width(val).text(val)
    })
});
*/

//document.getElementById('progressBar').addEventListener('click', function (e) {


function progressBar() {
    var e = document.getElementById("progressBar");
    var x = e.pageX - this.offsetLeft, // or e.offsetX (less support, though)

    //alert("holaaa");
    y = e.pageY - this.offsetTop,  // or e.offsetY
    clickedValue = x * this.max / this.offsetWidth,
    isClicked = clickedValue <= this.value;
    
    if (isClicked) {
        alert('You clicked within the value range at: ' + clickedValue);
    }
}
//});




