jQuery(document).ready(function($) {
			jQuery('#videoheader').vide({
				mp4: "video/concertbackground.mp4",
				webm: "",
				poster: "images/concertbackground.jpg"
			}, {
					muted: true,
					loop: true,
					autoplay: true,
					position: "50% 50%",
					posterType: "detect",
					resizing: true,
					bgColor: 'transparent'
			});
		});