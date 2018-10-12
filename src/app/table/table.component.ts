import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {TableHeader} from './table-header';
import {TableSettings} from './table-settings';
import {isNullOrUndefined} from 'util';
import {TableElement} from "./table-element";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  // Inputs y Outputs
  @Input() form: FormGroup;
  @Input() readonly = false;
  @Input() settings: TableSettings;
  @Input() data: any[];
  @Input() headings: TableHeader[];
  @Input() selected: any[];
  @Input() compareFunction: (d1, d2) => boolean;
  @Output() cambios: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output() seleccionados: EventEmitter<any[]> = new EventEmitter<any[]>();

  // CSS de la tabla
  @Input() classTable = 'table table-sm-responsive';
  @Input() classHeader: string;
  @Input() classHeaderRow: string;
  @Input() classTh: string;
  @Input() classBody: string;
  @Input() classBodyRow: string;
  @Input() classBodyTd: string;
  @Input() classFooter: string;
  @Input() classFooterRow: string;
  @Input() classFooterTd: string;

  // manejo interno
  all: TableElement[];

  constructor() { }

  ngOnInit() {
    this.all = this.data.map( dato => {
      let d = Object.assign({},dato);
      d.tableSelected = false;
      return d;
    });
    if (isNullOrUndefined(this.selected)) {
      this.selected = [];
    }
    console.log(this.all);
    this.all = this.all.concat(
      this.selected.map( dato => {
        // this.all.
        // if(this.all.)
        let d = Object.assign({},dato);
        d.tableSelected = true;
        return d;
    })
    );
    console.log(this.all);
    // this.selected.forEach( s => s.tableSelected = true);
    if (isNullOrUndefined(this.settings.selectedRowClass)) {
      this.settings.selectedRowClass = 'defaultSelected';
    }
  }

  rowClick(objeto: any, indice: number) {
    if (isNullOrUndefined( this.settings.rowSelect) ) {
      return;
    }
    if (this.settings.check === true) {
      this.checkClick(objeto, indice);
    } else if (this.settings.radio === true) {
      this.radioClick(objeto, indice);
    }
  }

  checkClick(objeto: any, indice: number) {
    if (this.readonly) {
      return;
    }
    if (objeto.tableSelected === true) {
      objeto.tableSelected = false;
    } else {
      objeto.tableSelected = true;
    }
    this.cambios.emit(this.all);
  }

  radioClick(objeto: any, indice: number) {
    if (this.readonly) {
      return;
    }
    if (objeto.tableSelected === true) {
      return;
    } else {
      this.selected.pop();
    }
    this.cambios.emit(this.all);
  }



}
