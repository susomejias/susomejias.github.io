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
  this.servicioRestaurante = servicioRestaurante;
  this.edadCliente = edadCliente;
  this.autoIncrementableId();
}

Reserva.prototype.id = 0;

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
        <title>Ejercicio-JesúsMejiasLeiva</title>
    </head>
    <body>
        <noscript>
            Por favor, comprueba que tu navegador es compatible con javascript, o bien
            comprueba si lo tienes activado
        </noscript>
        <h1>Jesús Mejías Leiva</h1>
        <p id="idReserva">id reserva: ${this.id}</p>
        <p id="nombreCompleto">Nombre completo: ${this.nombreCompleto}</p>
        <p id="correo">Correo electrónico: ${this.correo}</p>
        <p id="fechaLlegada">Fecha llegada: ${this.formatoFecha()}</p>
        <p id="horaLlegada">Hora llegada: ${this.horaLlegada}</p>
        <p id="numeroCoches">Numero noches: ${this.numeroNoches}</p>
        <p id="numeroPersonas">Numero persona: ${this.numeroPersonas}</p>
        <p id="servicioRestaurante">Servicio restaurante: ${
          this.servicioRestaurante
        }</p>
        <p id="edadCliente"> Edad cliente: ${this.edadCliente}</p>
        <p id="diasReserva"> Días para la reserva: ${this.calcularDias()} dias</p>
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
  let dias = Math.trunc(fechaRestante / 1000 / 60 / 60 / 24);
  if (dias < 0) {
    throw new Error("Dias negativos");
  }
  return dias;
};
