import { Injectable } from '@angular/core';
import {RepresentanteSolicitud} from '../models/representante-solicitud.model';
import {Corhoma} from '../models/corhoma';

@Injectable({
  providedIn: 'root'
})
export class MockServiceService {

  constructor() { }

  static getRepresentantes(): RepresentanteSolicitud[] {
    const corhoma: Corhoma = new Corhoma();
    return [
      new RepresentanteSolicitud(1, '123', '20 35942784 1', 'pedro', 'dueño', 'cargo', corhoma),
      new RepresentanteSolicitud(2, '234', '27 12124122 3', 'natalia', 'dueño', 'cargo', corhoma),
      new RepresentanteSolicitud(3, '345', '30 55485216 2', 'besysoft', 'dueño', 'cargo', corhoma),
      new RepresentanteSolicitud(4, '456', '20 77165164 9', 'nicolas', 'dueño', 'cargo', corhoma)
    ];
  }

}
