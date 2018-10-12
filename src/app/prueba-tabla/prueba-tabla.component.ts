import { Component, OnInit } from '@angular/core';
import {RepresentanteSolicitud} from '../models/representante-solicitud.model';
import {MockServiceService} from '../services/mock-service.service';
import {TableHeader} from '../table/table-header';
import {TableSettings} from '../table/table-settings';

@Component({
  selector: 'app-prueba-tabla',
  templateUrl: './prueba-tabla.component.html',
  styleUrls: ['./prueba-tabla.component.css']
})
export class PruebaTablaComponent implements OnInit {

  constructor() { }

  rep: RepresentanteSolicitud[];
  sel: RepresentanteSolicitud[];
  heads: TableHeader[];
  setting: TableSettings;

  tableData = [];

  ngOnInit() {
    this.rep = MockServiceService.getRepresentantes();
    this.sel = [Object.assign({}, this.rep[0] )];
    // this.sel = [new RepresentanteSolicitud(1, '789', '27 2342342 2', 'matias', 'dueño', 'cargo', null)];
    this.heads = [
      {label: 'Id', field: 'clienteIdSfb'},
      {label: 'CUIT/CUIL', field: 'cuil'},
      {label: 'Denominacion', field: 'denominacion'},
      {label: 'Relacion', field: 'relacion'},
      {label: 'Cargo', field: 'cargo'},
      {label: 'Facultad Corhoma', field: 'facultadCorhoma'},
    ];
    this.setting = {
      // radio:true,
      check: true,
      selectLabel: 'Seleccionado',
      rowSelect: true
    };
    const compare = (d1, d2) => d1.clienteIdSfb === d2.clienteIdSfb;

  }

  cambiosEnTabla(algo) {
    this.tableData = algo;
  }



}
