import { Injectable } from '@angular/core';
import {Personas} from '../models/Persona';
import {Trabajo} from '../models/trabajo';

@Injectable({
  providedIn: 'root'
})
export class MockServiceService {

  constructor() { }

  static getPersonas(): Personas[] {
    const besy: Trabajo = new Trabajo('Desarrollador', 'Besysoft', true, new Date());
    const mule: Trabajo = new Trabajo('Desarrollador', 'Mulesoft', true, new Date());
    return [
      new Personas(1, '20 35942784 1', 'Lucas', 'Mufato', new Date('1992-04-11'), besy),
      new Personas(2, '27 12124122 3', 'Nicolas', 'Dulio', new Date('1994-06-10'), besy),
      new Personas(3, '30 55485216 2', 'Pablo', 'Gomez', new Date('1990-11-28'), besy),
      new Personas(4, '20 77165164 9', 'Franco', 'Catania', new Date('1992-01-09'), besy),
      new Personas(7, '27 2342342 2', 'Santiago', 'Ambrosetti', new Date('1992-04-11') , mule)
    ];
  }

}
