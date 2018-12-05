{
  function Factura(
    fecha,
    moneda,
    emisor,
    cliente,
    lineas,
    irpf,
    re,
    observaciones
  ) {
    this.fecha = fecha;
    this.moneda = moneda;
    this.emisor = emisor;
    this.cliente = cliente;
    this.lineas = lineas;
    this.irpf = irpf;
    this.re = re;
    this.observaciones = observaciones;
    this.total = this.calculaTotal();
    this.id = this.incrementaId();
  }

  Factura.prototype.id = 0;

  Factura.prototype.incrementaId = function() {
    return this.id++;
  };

  Factura.prototype.calculaTotal = function() {
    let arrayLineas = this.lineas;
    let total = 0;
    arrayLineas.forEach(element => {
      total += parseFloat(element.importe);
    });

    total += total * parseFloat(this.irpf / 100);
    total += total * parseFloat(this.re / 100);
    return total.toFixed(2);
  };
}
