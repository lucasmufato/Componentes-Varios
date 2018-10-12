import {Corhoma} from './corhoma';

export class RepresentanteSolicitud {
  id: number;
  clienteIdSfb: string;
  cuil: string;
  denominacion: string;
  relacion: string;
  cargo: string;
  facultadCorhoma: Corhoma;

  constructor(id: number, clienteIdSfb: string, cuil: string, denominacion: string, relacion: string,
              cargo: string, facultadCorhoma: Corhoma) {
    this.id = id;
    this.clienteIdSfb = clienteIdSfb;
    this.cuil = cuil;
    this.denominacion = denominacion;
    this.relacion = relacion;
    this.cargo = cargo;
    this.facultadCorhoma = facultadCorhoma;
  }

}
