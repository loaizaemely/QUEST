// RESUMEN--------------------------

function CargarResumen(){
    if (sessionStorage.getItem('puntaje')>=30){
      document.getElementById("ganar_perder").innerHTML = "FELICIDADES!!!";
    }else{
      document.getElementById("ganar_perder").innerHTML = "Tu puntaje fue menor a 30... Pero puedes intentarlo de nuevo";
      document.getElementById("img_b-m").src = "./img/malo.png";
      document.getElementById("GIFS").src = "./img/gif_perder.gif";
    }
    document.getElementById("cantida_puntaje").innerHTML = sessionStorage.getItem('puntaje');//trae la variable puntaje anteriormente guardada, para mostrarla en el resumen 
}
  