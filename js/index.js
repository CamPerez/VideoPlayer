/************************************/
//HIDDEN BIG CASSETE AND DIV BLACK
/************************************/
      $(document).ready(function () { 
        $(document).click(function() {
          $("#divBlack").click(function(){        
              $('#divCassette').css('visibility', 'hidden');
              $('#divBlack').css('visibility', 'hidden');
          });
        });
      });
/********************************/
//SHOW BIG CASSETE AND DIV BLACK
/********************************/

function blackFunction() {
    document.getElementById("divCassette").style.visibility="visible";
    document.getElementById("divBlack").style.visibility="visible";
}


/********************************/
//POP UP
/********************************/



/********************************/
/*CONTROLS*/
/********************************/

$(document).ready(function () { 
	$('#play').click(function(){
    $('#play').attr('src', 'images/metal_dark.jpg');
   });
});
