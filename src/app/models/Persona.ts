import {Trabajo} from './trabajo';

export class Personas {
  id: number;
  cuil: string;
  nombre: string;
  apellido: string;
  fechaNacimiento: Date;
  trabajo: Trabajo;

  constructor(id: number, cuil: string, nombre: string, apellido: string,
              fechaNacimiento: Date, facultadCorhoma: Trabajo) {
    this.id = id;
    this.cuil = cuil;
    this.nombre = nombre;
    this.apellido = apellido;
    this.fechaNacimiento = fechaNacimiento;
    this.trabajo = facultadCorhoma;
  }

}
