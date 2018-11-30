{
  function Linea(productoServicio, unidades, descuento, precio, iva, importe) {
    this.productoServicio = productoServicio;
    this.unidades = unidades;

    this.descuento = descuento;

    this.precio = precio;

    this.iva = iva;

    this.importe = importe;
    // (
    //   ((this.precio * this.iva) / 100 + this.precio) *
    //   this.unidades
    // ).toFixed(2);
  }
}
