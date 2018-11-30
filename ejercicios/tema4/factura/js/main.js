{
  let btnGuardarEmisor;
  let btnLimpiarEmisor;
  let btnGuardarCliente;
  let btnLimpiarCliente;
  let arrayLineas;
  let containerLineas;
  let nuevaLinea;
  let btnCrearFactura;
  let observaciones;
  let irpf;
  let re;
  let fecha;
  let moneda;
  function init() {
    arrayLineas = [];

    btnGuardarEmisor = document.getElementById("guardarEmisor");
    btnLimpiarEmisor = document.getElementById("limpiarEmisor");
    btnGuardarCliente = document.getElementById("guardarCliente");
    btnLimpiarCliente = document.getElementById("limpiarCliente");
    containerLineas = document.getElementById("containerLineas");
    nuevaLinea = document.getElementById("nuevaLinea");
    btnCrearFactura = document.getElementById("crearFactura");
    observaciones = document.getElementById("observaciones");
    irpf = document.getElementById("irpf");
    re = document.getElementById("re");
    fecha = document.getElementById("fecha");
    moneda = document.getElementById("moneda");

    btnGuardarEmisor.addEventListener("click", crearEmisor);
    btnLimpiarEmisor.addEventListener("click", limpiarInputsEmisor);
    btnGuardarCliente.addEventListener("click", crearCliente);
    btnLimpiarCliente.addEventListener("click", limpiarInputsCliente);
    nuevaLinea.addEventListener("click", obtenerLineas);
    btnCrearFactura.addEventListener("click", crearFactura);
  }

  let obtenerLineas = function() {
    let productos = document.querySelectorAll(".producto");
    let unidades = document.querySelectorAll(".unidades");
    let descuento = document.querySelectorAll(".descuento");
    let precio = document.querySelectorAll(".precio");
    let iva = document.querySelectorAll(".iva");
    let importe = document.querySelectorAll(".importe");

    arrayLineas.push(
      new Linea(
        productos[productos.length - 1].value,
        unidades[unidades.length - 1].value,
        descuento[descuento.length - 1].value,
        precio[precio.length - 1].value,
        iva[iva.length - 1].value,
        importe[importe.length - 1].value
      )
    );

    console.log(arrayLineas);

    containerLineas.innerHTML += `<div class="linea">
      <div class="centerLinea">
        <label for="">Producto:</label>
        <input type="producto" name="producto" class="producto" />
      </div>
      <div class="centerLinea">
        <label for="">Uds:</label>
        <input type="number" name="unidades" class="unidades" />
      </div>
      <div class="centerLinea">
        <label for="">Dto:</label>
        <input type="text" name="emailCliente" class="direccionCliente" />
      </div>
      <div class="centerLinea">
        <label for="">Precio:</label>
        <input type="text" name="precio" class="precio" />
      </div>
      <div class="centerLinea">
        <label for="">Iva:</label>
        <input type="text" name="iva" class="iva" />
      </div>
      <div class="centerLinea">
        <label for="">Importe:</label>
        <input type="text" name="importe" class="importe" />
      </div>
    </div>`;

    //containerLineas.innerHTML = `hola`;
  };

  let crearEmisor = function() {
    let nombreEmisor = document.getElementById("nombreEmisor").value;
    let cifEmisor = document.getElementById("cifEmisor").value;
    let direccion = document.getElementById("direccionEmisor").value;
    let telefono = document.getElementById("telefonoEmisor").value;
    let email = document.getElementById("emailEmisor").value;
    let logo = document.getElementById("logoEmisor").value;

    return new Emisor(
      nombreEmisor,
      cifEmisor,
      direccion,
      telefono,
      email,
      logo
    );
  };

  let limpiarInputsEmisor = function(idContenedor) {
    let inputsEmisor = Array.from(
      document.querySelectorAll("#datosEmisor input")
    );

    inputsEmisor.forEach(input => {
      input.value = "";
    });
  };

  let limpiarInputsCliente = function(idContenedor) {
    let inputsEmisor = Array.from(
      document.querySelectorAll("#datosCliente input")
    );

    inputsEmisor.forEach(input => {
      input.value = "";
    });
  };

  let crearCliente = function() {
    let nombreCliente = document.getElementById("nombreCliente").value;
    let cifCliente = document.getElementById("cifCliente").value;
    let direccionCliente = document.getElementById("direccionCliente").value;
    let telefonoCliente = document.getElementById("telefonoEmisor").value;
    let emailCliente = document.getElementById("emailCliente").value;

    return new Cliente(
      nombreCliente,
      cifCliente,
      direccionCliente,
      telefonoCliente,
      emailCliente
    );
  };

  let crearFactura = function(){

    let factura = new Factura(fecha.value,moneda.value,crearEmisor(),crearCliente(),arrayLineas,irpf.value,re.value,observaciones.value);

    console.log(factura);
    
  }

  window.addEventListener("load", init);
}
