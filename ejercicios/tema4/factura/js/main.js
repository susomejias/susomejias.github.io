{
  let btnGuardarEmisor;
  let btnLimpiarEmisor;
  let btnGuardarCliente;
  let btnLimpiarCliente;
  let arrayLineas;
  let containerLineas;
  let nuevaLinea;
  let btnCrearFactura;
  let textObservaciones;
  let irpf;
  let re;
  let fecha;
  let moneda;
  let spanDatosEmisor;
  let spanDatosCliente;
  let spanErrorLinea;
  let muestraTotal;
  let contLineas;

  function init() {
    arrayLineas = [];

    btnGuardarEmisor = document.getElementById("guardarEmisor");
    btnLimpiarEmisor = document.getElementById("limpiarEmisor");
    btnGuardarCliente = document.getElementById("guardarCliente");
    btnLimpiarCliente = document.getElementById("limpiarCliente");
    containerLineas = document.getElementById("containerLineas");
    nuevaLinea = document.getElementById("nuevaLinea");
    btnCrearFactura = document.getElementById("crearFactura");
    textObservaciones = document.getElementById("textObservaciones");
    irpf = document.getElementById("irpf");
    re = document.getElementById("re");
    fecha = document.getElementById("fecha");
    moneda = document.getElementById("moneda");
    spanDatosEmisor = document.getElementById("spanDatosEmisor");
    spanDatosCliente = document.getElementById("spanDatosCliente");
    spanErrorLinea = document.getElementById("spanErrorLinea");
    muestraTotal = document.getElementById("muestraTotal");
    contLineas = document.getElementById("contLineas");

    btnGuardarEmisor.addEventListener("click", crearEmisor);
    btnLimpiarEmisor.addEventListener("click", limpiarInputsEmisor);
    btnGuardarCliente.addEventListener("click", crearCliente);
    btnLimpiarCliente.addEventListener("click", limpiarInputsCliente);
    nuevaLinea.addEventListener("click", obtenerLineas);
    btnCrearFactura.addEventListener("click", crearFactura);

    crearCabecera();
  }

  let crearCabecera = function() {
    let div = document.createElement("div");
    div.innerHTML = `<b>Producto</b>`;
    contLineas.appendChild(div);
    let div2 = document.createElement("div");
    div2.innerHTML = `<b>Unidades</b>`;
    contLineas.appendChild(div2);
    let div3 = document.createElement("div");
    div3.innerHTML = `<b>Descuento</b>`;
    contLineas.appendChild(div3);
    let div4 = document.createElement("div");
    div4.innerHTML = `<b>Precio</b>`;
    contLineas.appendChild(div4);
    let div5 = document.createElement("div");
    div5.innerHTML = `<b>Iva</b>`;
    contLineas.appendChild(div5);
    let div6 = document.createElement("div");
    div6.innerHTML = `<b>Importe</b>`;
    contLineas.appendChild(div6);
  };

  let obtenerLineas = function() {
    let productos = document.querySelectorAll(".producto");
    let unidades = document.querySelectorAll(".unidades");
    let descuento = document.querySelectorAll(".descuento");
    let precio = document.querySelectorAll(".precio");
    let iva = document.querySelectorAll(".iva");
    let importe = document.querySelectorAll(".importe");

    if (
      productos[productos.length - 1].value !== "" &&
      unidades[unidades.length - 1].value !== "" &&
      descuento[descuento.length - 1].value !== "" &&
      precio[precio.length - 1].value !== "" &&
      iva[iva.length - 1].value !== ""
    ) {
      let productosPrecio =
        parseFloat(precio[precio.length - 1].value) *
        parseInt(unidades[unidades.length - 1].value);
      let productosPrecioDescuento =
        productosPrecio -
        productosPrecio *
          (parseInt(descuento[descuento.length - 1].value) / 100);
      let productosPrecioDescuentoIva =
        productosPrecioDescuento +
        productosPrecioDescuento * (parseInt(iva[iva.length - 1].value) / 100);

      arrayLineas.push(
        new Linea(
          productos[productos.length - 1].value,
          unidades[unidades.length - 1].value,
          descuento[descuento.length - 1].value,
          precio[precio.length - 1].value,
          iva[iva.length - 1].value,
          productosPrecioDescuentoIva.toFixed(2)
        )
      );

      contLineas.innerHTML = "";
      crearCabecera();
      arrayLineas.forEach(element => {
        for (const key in element) {
          if (element.hasOwnProperty(key)) {
            let div = document.createElement("div");

            div.innerHTML = `${element[key]}`;

            contLineas.appendChild(div);
          }
        }
      });

      containerLineas.innerHTML = `<h3>Crear línea</h3>
      <div class="linea">
        <div class="centerLinea">
          <label for="">Producto:</label>
          <input
            type="producto"
            name="producto"
            class="producto"
            required
          />
        </div>
        <div class="centerLinea">
          <label for="">Uds:</label>
          <input type="number" name="unidades" class="unidades" required />
        </div>
        <div class="centerLinea">
          <label for="">Dto:</label>
          <input type="text" name="descuento" class="descuento" required />
        </div>
        <div class="centerLinea">
          <label for="">Precio:</label>
          <input type="text" name="precio" class="precio" required />
        </div>
        <div class="centerLinea">
          <label for="">Iva:</label>
          <input type="text" name="iva" class="iva" required />
        </div>
        <div class="centerLinea">
          <label for="">Importe:</label>
          <input
            type="text"
            name="importe"
            class="importe"
            required
            readonly
          />
        </div>
      </div>`;
      spanErrorLinea.textContent = "";

      //contLineas.innerHTML = "hola";

      //  arrayLineas.forEach((element, index) => {
      //    contLineas.textContent += element[index];
      //  });

      console.log(arrayLineas);
    } else {
      spanErrorLinea.textContent = "La linea no puede estar vacía";
    }
  };

  let crearEmisor = function() {
    let nombreEmisor = document.getElementById("nombreEmisor").value;
    let cifEmisor = document.getElementById("cifEmisor").value;
    let direccion = document.getElementById("direccionEmisor").value;
    let telefono = document.getElementById("telefonoEmisor").value;
    let email = document.getElementById("emailEmisor").value;
    let logo = document.getElementById("logoEmisor").value;

    if (
      nombreEmisor !== "" &&
      cifEmisor !== "" &&
      direccion !== "" &&
      telefono !== "" &&
      email !== "" &&
      logo !== ""
    ) {
      spanDatosEmisor.textContent = "";

      return new Emisor(
        nombreEmisor,
        cifEmisor,
        direccion,
        telefono,
        email,
        logo
      );
    } else {
      spanDatosEmisor.textContent = "No puede haber campos vacíos";
    }
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

    if (
      nombreCliente !== "" &&
      cifCliente !== "" &&
      direccionCliente !== "" &&
      telefonoCliente !== "" &&
      emailCliente !== ""
    ) {
      spanDatosCliente.textContent = "";

      return new Cliente(
        nombreCliente,
        cifCliente,
        direccionCliente,
        telefonoCliente,
        emailCliente
      );
    } else {
      spanDatosCliente.textContent = "No puede haber campos vacíos";
    }
  };

  let crearFactura = function() {
    let factura = new Factura(
      fecha.value,
      moneda.value,
      crearEmisor(),
      crearCliente(),
      arrayLineas,
      irpf.value,
      re.value,
      textObservaciones.value
    );

    console.log(factura);

    muestraTotal.innerHTML = `Total (EUROS) ${factura.total}`;
  };

  window.addEventListener("load", init);
}
