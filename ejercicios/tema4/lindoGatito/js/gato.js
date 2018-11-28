/**
Crea una clase Gato, y a partir de ella crea tantos gatos como quiera el usuario.
Cada gato tendrá un nombre, una fecha de nacimiento, una raza y un peso (1-15). 

Cada vez que crees un objeto gato aparecerá una ventana nueva con una imagen que cambiará en función de su estado (comiendo, durmiendo y jugando, que es su estado habitual). El usuario podrá averiguar la edad del gato partiendo de un evento.

El comportamiento es el siguiente:
Cuando el gato juega pierde peso
Cuando el gato come gana peso
El gato puede morir de inanición o por sobrepeso
Recuerda:
Evita las cajas de texto
No puedes usar ni alert ni prompt
Hazlo lo más dinámico posible.
Utiliza prototype para los métodos
 */
{
  function Gato(nombre, fechaNacimiento, raza, peso) {
    this.nombre = nombre;
    this.fechaNacimiento = fechaNacimiento;
    this.raza = raza;
    this.peso = peso;
  }

  // el gato vio o muerto
  Gato.prototype.isMuerto = false;

  Gato.prototype.isDurmiendo = false;

  // conlleva perder peso
  Gato.prototype.jugar = function() {
    if (this.peso > 1) {
      this.peso--;
    } else {
      this.isMuerto = true;
    }
  };

  // conlleva ganar peso
  Gato.prototype.comer = function() {
    if (this.peso < 15) {
      this.peso++;
    } else {
      this.isMuerto = true;
    }
  };

  Gato.prototype.dormir = function() {
    this.isDurmiendo = true;
  };

  Gato.prototype.obtenerEdad = function() {
    let fechaActual = new Date();

    let fechaNacimiento = new Date(this.fechaNacimiento.toString());

    let edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();

    return edad;
  };
}
