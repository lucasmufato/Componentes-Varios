export interface TrabajoInterface {
  puesto?: string;
  empresa?: string;
  enBlanco?: boolean;
  fechaInicio?: Date;
}

export class Trabajo implements TrabajoInterface{
  puesto: string;
  empresa: string;
  enBlanco: boolean;
  fechaInicio: Date;

  constructor(puesto: string, empresa: string, enBlanco: boolean, fechaInicio: Date) {
    this.puesto = puesto;
    this.empresa = empresa;
    this.enBlanco = enBlanco;
    this.fechaInicio = fechaInicio;
  }
}
