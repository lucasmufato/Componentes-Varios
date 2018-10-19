import { Component, OnInit } from '@angular/core';
import {Personas} from '../models/Persona';
import {MockServiceService} from '../services/mock-service.service';
import {TableHeader} from '../table/table-header';
import {TableSettings} from '../table/table-settings';
import {DatePipe} from '@angular/common';
import {TrabajoPipe} from "../pipes/trabajo-pipe.pipe";
import {Trabajo} from "../models/trabajo";

@Component({
  selector: 'app-prueba-tabla',
  templateUrl: './prueba-tabla.component.html',
  styleUrls: ['./prueba-tabla.component.css']
})
export class PruebaTablaComponent implements OnInit {

  constructor() { }

  rep: Personas[];
  sel: Personas[];
  heads: TableHeader[];
  trabajoHeads: TableHeader[];
  setting: TableSettings;
  trabajo: Trabajo[];

  tableData = [];

  ngOnInit() {
    this.rep = MockServiceService.getPersonas();
    // this.sel = [Object.assign({}, this.rep[0] )];

    const IBM: Trabajo = new Trabajo('Service Manager', 'IBM', true, new Date());
    this.sel = [
      new Personas(5, '20 35942784 1', 'German', 'Mufato', new Date('1992-04-11'), IBM)
    ];
    this.heads = [
      {label: 'Id', field: 'id', ordenado: 'des'},
      {label: 'CUIT/CUIL', field: 'cuil'},
      {label: 'Nombre', field: 'nombre'},
      {label: 'Apellido', field: 'apellido'},
      // {label: 'Fecha Nac.', field: 'fechaNacimiento'},
      {label: 'Fecha Nac.', field: 'fechaNacimiento', pipe: DatePipe, pipeArgs: ['dd/MM/yyyy']},
      {label: 'Trabajo', field: 'trabajo', pipe: TrabajoPipe, pipeArgs: 'medio' },
      // {label: 'Trabajo', field: 'trabajo'},
    ];
    this.setting = {
      // radio:true,
      check: true,
      // rowSelect: false,
      // selectLabel:'pablo serra',
      // css: {
      //   selectedRowClass:'mufato-table-model'
      // },
      // sortable: true,
      // compareFunction : (d1, d2) => d1.cuil === d2.cuil
    };


    this.trabajo = [this.sel[0].trabajo];
    this.trabajoHeads = [
      {label: 'Empresa', field: 'empresa'},
      {label: 'Puesto', field: 'puesto'},
      {label: 'En Blanco', field: 'enBlanco'},
      {label: 'Fecha Inicio', field: 'fechaInicio',pipe: DatePipe, pipeArgs: ['dd/MM/yyyy']}
    ];


  }

  cambiosEnTabla(algo) {
    this.tableData = algo;
  }

  cambioSeleccionados(seleccionados) {
    this.sel = seleccionados;
  }


}
