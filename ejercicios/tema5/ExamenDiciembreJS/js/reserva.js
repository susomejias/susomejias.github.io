/*
 * Contructor de la clase, asigna los valores
 * @param nombreCompleto nombre completo
 * @param correo correo
 * @param fechaLlegada fecha llegada
 * @param horaLlegada hora llegada
 * @param numeroNoches numero de noches
 * @param numeroPersonas numero de personas
 * @param servicioRestaurante servicio de restaurante
 * @pram edadCliente edad de cliente
 */
function Reserva(
  nombreCompleto,
  correo,
  fechaLlegada,
  horaLlegada,
  numeroNoches,
  numeroPersonas,
  servicioRestaurante,
  edadCliente
) {
  this.nombreCompleto = nombreCompleto;
  this.correo = correo;
  this.fechaLlegada = this.setFecha(fechaLlegada);
  this.horaLlegada = horaLlegada;
  this.numeroNoches = numeroNoches;
  this.numeroPersonas = numeroPersonas;
  this.servicioRestaurante = this.setServicioRestaurante(servicioRestaurante);
  this.edadCliente = edadCliente;
  this.id = this.incrementarId();
}

/*
 * Incrementa el id cada vez que creemos una reserva.
 */
Reserva.prototype.incrementarId = (function() {
  let id = 1;
  return function() {
    return id++;
  };
})();

/*
 * Asigna un valor a servicioRestaurante.
 * @param servicioRestaurante array de valores de los checkbox checked.
 */
Reserva.prototype.setServicioRestaurante = function(servicioRestaurante) {
  if (servicioRestaurante.length > 1) {
    let salida = "";
    servicioRestaurante.forEach((element, index) => {
      index === servicioRestaurante.length - 1
        ? (salida += element.value)
        : (salida += element.value + ", ");
    });
    return salida;
  } else if (servicioRestaurante.length === 1) {
    return servicioRestaurante[0].value;
  } else {
    return "Ninguno";
  }
};

/*
 * Muestra los datos de la clase en una ventana nueva.
 */
Reserva.prototype.mostrar = function() {
  let html = `<!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="css/animaciones.css" />
        <link rel="stylesheet" href="css/estilos.min.css" />
        <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet">
        <title>Ejercicio-JesúsMejiasLeiva</title>
    </head>
    <body>
        <noscript>
            Por favor, comprueba que tu navegador es compatible con javascript, o bien
            comprueba si lo tienes activado
        </noscript>
        <main class="slide-top">
        <h1>Jesús Mejías Leiva</h1>
          <div class="card">
            <p><b>id reserva: </b>${this.id}</p>
            <p><b>Nombre completo:</b> ${this.nombreCompleto}</p>
            <p><b>Correo electrónico:</b> ${this.correo}</p>
            <p><b>Fecha llegada:</b> ${this.formatoFecha()}</p>
            <p><b>Hora llegada:</b> ${this.horaLlegada}</p>
            <p><b>Numero noches:</b> ${this.numeroNoches} noche/s</p>
            <p><b>Numero personas:</b> ${this.numeroPersonas} persona/s</p>
            <p><b>Servicio restaurante:</b> ${this.servicioRestaurante}</p>
            <p><b>Edad cliente:</b>  ${this.edadCliente} años.</p>
            <p><b>Días para la reserva:</b> ${this.calcularDias()}  dia/s.</p>
          </div>
          </main>

    </body>
    </html>`;
  let ventana = window.open("", "", "width=300px,height=200px");
  ventana.document.open();
  ventana.document.write(html);
  ventana.document.close();
};

/*
 * Asigna un valor a fechaLlegada.
 * @param fechaLlegada valor de tipo date.
 */
Reserva.prototype.setFecha = function(fechaLlegada) {
  if (!(fechaLlegada instanceof Date)) {
    throw new Error("Fecha no valida");
  }
  return fechaLlegada;
};

/*
 * Devuelve la fechaLlegada con el formato español.
 */
Reserva.prototype.formatoFecha = function() {
  let opciones = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  return this.fechaLlegada.toLocaleDateString("es-ES", opciones);
};

/*
 * Calcula los dias hasta una fecha
 */
Reserva.prototype.calcularDias = function() {
  let fechaActualEnMs = Date.now();
  let fechaLlegada = Date.parse(this.fechaLlegada);
  let fechaRestante = fechaLlegada - fechaActualEnMs;
  let diasSinTruncar = fechaRestante / 1000 / 60 / 60 / 24;
  let dias = Math.trunc(fechaRestante / 1000 / 60 / 60 / 24);
  if (dias < 0) {
    throw new Error("La fecha introducida es anterior a la fecha actual");
  }
  if (diasSinTruncar > 0 && diasSinTruncar < 1) {
    return 1;
  }
  return dias;
};
