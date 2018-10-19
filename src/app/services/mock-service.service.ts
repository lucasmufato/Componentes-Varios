import { Injectable } from '@angular/core';
import {Personas} from '../models/Persona';
import {Trabajo} from '../models/trabajo';
import {TrabajoPipe} from '../pipes/trabajo-pipe.pipe';
import {DatePipe} from '@angular/common';
import {TableHeader} from "../table/table-header";

@Injectable({
  providedIn: 'root'
})
export class MockServiceService {

  constructor() { }

  static getPersonas(): Personas[] {
    const besy: Trabajo = new Trabajo('Desarrollador', 'Besysoft', true, new Date());
    const mule: Trabajo = new Trabajo('Desarrollador', 'Mulesoft', true, new Date());
    const IBM: Trabajo = new Trabajo('Service Manager', 'IBM', true, new Date());
    return [
      new Personas(10, '20 35942784 1', 'Lucas', 'Mufato', new Date('1992-04-11'), besy),
      new Personas(3, '30 55485216 2', 'Pablo', 'Gomez', new Date('1990-11-28'), besy),
      new Personas(4, '20 77165164 9', 'Franco', 'Catania', new Date('1992-01-09'), besy),
      new Personas(9, '20 35942784 1', 'German', 'Mufato', new Date('1992-04-11'), IBM),
      new Personas(2, '27 12124122 3', 'Nicolas', 'Dulio', new Date('1994-06-10'), besy),
      new Personas(7, '27 2342342 2', 'Santiago', 'Ambrosetti', new Date('1992-04-11') , mule)
    ];
  }

  static getHeadersPersonas(): TableHeader[] {
    return [
      {label: 'Id', field: 'id', ordenado: 'des'},
      {label: 'CUIT/CUIL', field: 'cuil'},
      {label: 'Nombre', field: 'nombre'},
      {label: 'Apellido', field: 'apellido'},
      // {label: 'Fecha Nac.', field: 'fechaNacimiento'},
      {label: 'Fecha Nac.', field: 'fechaNacimiento', pipe: DatePipe, pipeArgs: ['dd/MM/yyyy']},
      {label: 'Trabajo', field: 'trabajo', pipe: TrabajoPipe, pipeArgs: 'medio' },
      // {label: 'Trabajo', field: 'trabajo'},
    ];
  }

}
