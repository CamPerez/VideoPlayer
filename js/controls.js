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
});

//VOLUMN

 $(function() {

      //Store frequently elements in variables
      var slider  = $('#slider'),
        tooltip = $('.tooltip');

      //Hide the Tooltip at first
      tooltip.hide();

      //Call the Slider
      slider.slider({
        //Config
        range: "min",
        min: 1,
        value: 35,

        start: function(event,ui) {
            tooltip.fadeIn('fast');
        },

        //Slider Event
        slide: function(event, ui) { //When the slider is sliding

          var value  = slider.slider('value'),
            volume = $('.volume');

          tooltip.css('left', value).text(ui.value);  //Adjust the tooltip accordingly

          if(value <= 5) { 
            volume.css('background-position', '0 0');
          } 
          else if (value <= 25) {
            volume.css('background-position', '0 -25px');
          } 
          else if (value <= 75) {
            volume.css('background-position', '0 -50px');
          } 
          else {
            volume.css('background-position', '0 -75px');
          };

        },

        stop: function(event,ui) {
            tooltip.fadeOut('fast');
        },
      });

    });


  /*AUDIO EFFECTS*/

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
  });


  /*FULL SCREEN*/

  $(document).ready(function() {
    $('#fullscreen').click(function() {
      
    });
  });