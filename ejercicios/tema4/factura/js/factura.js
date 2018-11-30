{
  function Factura(fecha, moneda, emisor, cliente, lineas, irpf, re, observaciones) {
    this.fecha = fecha;
    this.moneda = moneda;
    this.emisor = emisor;
    this.cliente = cliente;
    this.lineas = lineas;
    this.irpf = irpf;
    this.re = re;
    this.observaciones = observaciones;
    this.total = this.calculaTotal();
    this.incrementaId();
  }

  Factura.prototype.id = 0;

  Factura.prototype.incrementaId = function() {
    this.id++;
  };

  Factura.prototype.calculaTotal = function() {
    let arrayLineas = this.lineas;
    let total = 0;
    arrayLineas.forEach(element => {
      total += parseFloat(element.importe);
    });

    return total;
  };
}
