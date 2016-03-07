
document.getElementById("myVideo").textTracks[0].addEventListener("cuechange", metadata, false);


function metadata() {

  var video = document.getElementById("myVideo");

  video.textTracks[0].mode = "showing";
  video.textTracks[2].mode = "showing"; //Show Subtitles

  document.getElementById("subsVideo").innerHTML = video.textTracks[2].activeCues[0].text;

  var json = JSON.parse(video.textTracks[0].activeCues[0].text);
  document.getElementById("infoTitle").innerHTML = "<strong>Title</strong>: "+ json["title"];
  document.getElementById("infoAlbum").innerHTML = "<strong>&Aacutelbum:</strong> "+ json["album"];
  document.getElementById("infoPublication").innerHTML = "<strong>Fecha de publicaci&oacuten:</strong> "+ json["publication"];
  document.getElementById("infoRecord").innerHTML = "<strong>Fecha de grabaci&oacuten:</strong> "+ json["record"];
  document.getElementById("infoGenre").innerHTML = "<strong>G&eacutenero musical:</strong> "+ json["genre"];
  document.getElementById("infoLabel").innerHTML = "<strong>Sello discog&aacutefico:</strong> "+ json["label"];
  document.getElementById("infoAuthors").innerHTML = "<strong>Autores:</strong> "+ json["authors"];
  document.getElementById("infoProducers").innerHTML = "<strong>Productores:</strong> "+ json["producers"];
  document.getElementById("infoSrc").innerHTML = "<strong>Portada:</strong> "+ "<img class='img-responsive imgCover-size' src=" + json['src'] +" />";
  document.getElementById("infoWiki").innerHTML = "<strong>M&aacute informaci&oacuten:</strong> "+ "<a target='_blank' href=" + json['wiki'] +">" + json['wiki'] +"</a>";
}

