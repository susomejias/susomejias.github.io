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
  this.id = this.uniqueID();
}

Reserva.prototype.uniqueID = (function() {
  let id = 0;
  return function() {
    return id++;
  };
})();

Reserva.prototype.setServicioRestaurante = function(servicioRestaurante) {
  if (servicioRestaurante.length >= 1) {
    let salida = "";
    servicioRestaurante.forEach((element, index) => {
      salida += "| " + element + " |";
    });
    return salida;
  } else {
    return servicioRestaurante[0];
  }
};

Reserva.prototype.autoIncrementableId = function() {
  this.id++;
};

Reserva.prototype.mostrar = function() {
  let html = `<!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="css/estilos.min.css" />
        <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet"> 
        <title>Ejercicio-JesúsMejiasLeiva</title>
    </head>
    <body>
        <noscript>
            Por favor, comprueba que tu navegador es compatible con javascript, o bien
            comprueba si lo tienes activado
        </noscript>
        <main>
        <h1>Jesús Mejías Leiva</h1>
          <div class="card">
            <p id="idReserva"><b>id reserva: </b>${this.id}</p>
            <p id="nombreCompleto"><b>Nombre completo:</b> ${
              this.nombreCompleto
            }</p>
            <p id="correo"><b>Correo electrónico:</b> ${this.correo}</p>
            <p id="fechaLlegada"><b>Fecha llegada:</b> ${this.formatoFecha()}</p>
            <p id="horaLlegada"><b>Hora llegada:</b> ${this.horaLlegada}</p>
            <p id="numeroCoches"><b>Numero noches:</b> ${
              this.numeroNoches
            } noche/s</p>
            <p id="numeroPersonas"><b>Numero personas:</b> ${
              this.numeroPersonas
            } persona/s</p>
            <p id="servicioRestaurante"><b>Servicio restaurante:</b> ${
              this.servicioRestaurante
            }</p>
            <p id="edadCliente"><b>Edad cliente:</b>  ${
              this.edadCliente
            } años.</p>
            <p id="diasReserva"><b>Días para la reserva:</b> ${this.calcularDias()}  dia/s.</p>
          </div>
          </main>
        
    </body>
    </html>`;

  let ventana = window.open("", "", "width=300px,height=200px");
  ventana.document.open();
  ventana.document.write(html);
  ventana.document.close();
};

Reserva.prototype.setFecha = function(fechaLlegada) {
  if (!(fechaLlegada instanceof Date)) {
    throw new Error("Fecha no valida");
  }
  return fechaLlegada;
};

Reserva.prototype.formatoFecha = function() {
  let opciones = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  return this.fechaLlegada.toLocaleDateString("es-ES", opciones);
};

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
