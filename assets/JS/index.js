let INDEX_PREGUNTA = 0;
let puntaje=0; //puntaje seria 120
let validezRespuesta;
let numero_pistas=0;
// Obtenemos el modal para actualizar
Modal_respuesta = document.getElementById("Modal_respuesta");

// Obtenemos el modal para modificarlo
modal_update = document.getElementById("text_respuesta");

// Obtenemos el modal ayuda
modal_ayuda = document.getElementById("Modal_ayuda");

// cerramos el modal de la respuesta
btnmodal = document.getElementById("btnmodal");

// Boton para validar si la respuesta fue correcta o no
btnrespuesta = document.getElementById("btnrespuesta");

// cerramos el modal de ayuda
span = document.getElementById("close");

opcion1 = document.getElementById("opcion-1");
opcion2 = document.getElementById("opcion-2");

cargarPregunta(INDEX_PREGUNTA);


function cargarPregunta(index) {
  objetoPregunta = baseDePreguntas[index]; // inicia en el indice del arreglo baseDePreguntas

  opciones = [...objetoPregunta.distractores]; // Se hace un arreglo para traer la respuesta los distrartores 
  opciones.push(objetoPregunta.respuesta); //se le agraga al vector, la respuesta de la pregunta 

  opciones.sort(() => Math.random() - 0.5); //Hace que la repuesta no este siempre en la misma posicion 

  document.getElementById("pregunta").innerHTML = objetoPregunta.pregunta; //en el html se cambia el enunciado para la pregunta
 
  if (objetoPregunta.imagen) {
    document.getElementById("imagen").src = objetoPregunta.imagen;
    document.getElementById("imagen").style.display = ""; //Si hay imagen la cambia sino, no pone imagen 
  } else {
    document.getElementById("imagen").style.display = "none";
  }

  if (objetoPregunta.ayuda) { // habilita y quita la ayuda
    document.getElementById("ayuda").style.display = "";
  } else {
    document.getElementById("ayuda").style.display = "none";
  }

  //se agregan las opciones 
  document.getElementById("opcion-1").innerHTML = opciones[0];
  document.getElementById("opcion-2").innerHTML = opciones[1];
}

function seleccionarOpción(index) { 
  validezRespuesta = opciones[index];
  if (index == 0){
    opcion1.style.backgroundColor = "#5087ffc2";
    opcion2.style.backgroundColor = "#ACB3F0";
  }else{
    opcion1.style.backgroundColor = "#ACB3F0";
    opcion2.style.backgroundColor = "#5087ffc2";
  }
}

btnrespuesta.onclick = function enviarOpción() { //funcion para evaluar la pregunta con el boton 

  // Determina cuando termina el juego
  INDEX_PREGUNTA++;
  if (INDEX_PREGUNTA >= baseDePreguntas.length) { //este if evalua si el indice es mayor
     btnmodal.innerHTML = "Ver Resultados";
  } 
    if (validezRespuesta == objetoPregunta.respuesta) {
      Modal_respuesta.style.display = "block";
      modal_update.style.backgroundColor = "#4FE993";
      opcion1.style.backgroundColor = "#ACB3F0";
      opcion2.style.backgroundColor = "#ACB3F0";
      modal_update.innerHTML = 'Respuesta Correcta';
      puntaje = puntaje + 5;
    } else {
      Modal_respuesta.style.display = "block";
      modal_update.style.backgroundColor = "#e94f4f";
      opcion1.style.backgroundColor = "#ACB3F0";
      opcion2.style.backgroundColor = "#ACB3F0";
      modal_update.innerHTML = 'Respuesta Incorrecta';
      puntaje = puntaje - 2.5;
    }
    sessionStorage.setItem('puntaje', puntaje);
  
  cargarPregunta(INDEX_PREGUNTA);

}

function ayuda() { // hace que sea visible la pista o ayuda 
  if (numero_pistas>=4) {
    modal_ayuda.style.display = "block";
    document.getElementById('titulo_pista').innerHTML = "Has agotado tus pistas";
    document.getElementById('text_ayuda').innerHTML = "4/4 pistas";
  }else{
    modal_ayuda.style.display = "block";
    document.getElementById('text_ayuda').innerHTML = objetoPregunta.ayuda;
    numero_pistas=numero_pistas+1;
  }
}

// Cuando el index llegue al limite lo lleva al resumen del juego
btnmodal.onclick = function () {
  if (INDEX_PREGUNTA >= baseDePreguntas.length) {
    window.location = "./resumen.html";
    // se reinician las variables para volver a comenzar
    INDEX_PREGUNTA = 0;
  } else {
    Modal_respuesta.style.display = "none";
    
  }
}

// Cuando el usuario de clic en la (x), cierra el modal ayuda
span.onclick = function () {
  modal_ayuda.style.display = "none";
}

// Cuando el usuario de clic fuera del modal ayuda se cierra
window.onclick = function (event) {
  if (event.target == modal_ayuda) {
    modal_ayuda.style.display = "none";
  }
}
