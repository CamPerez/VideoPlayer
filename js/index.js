jQuery(document).ready(function($) {
			jQuery('#videoheader').vide({
				mp4: "video/background.mp4",
				webm: "video/background.webm",
				ogg: "video/background.ogg",
				poster: "images/concertbackground.jpeg"
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