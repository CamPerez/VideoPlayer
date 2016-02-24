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


$(document).ready(function(e) {
    var mozillaPresente = false,
    mozilla = (function detectarNavegador(navegador) {
        if(navegador.indexOf("Firefox") != -1 ) {
            mozillaPresente = true;
        }   
    })(navigator.userAgent);

    function darEfecto(efecto) {
        el = $('.cajainterna');
        el.addClass(efecto);
        el.one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
            function (e) {
                el.removeClass(efecto);
            });
    }
    function mostrar(e) {
        $(".cajaexterna").show();
        darEfecto("bounceIn"); 
        
    }
    function ocultar() {
        $(".cajaexterna").fadeOut("fast", function() {
            if(mozillaPresente) {
                setTimeout(function() {
                    $(".cajainterna").removeClass("bounceIn");
                }, 5);
            }
        });         
    }


    $("a.mostrarmodal").click(mostrar);
    $("a.cerrarmodal").click(ocultar);
}); 


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




