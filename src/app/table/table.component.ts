import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {TableHeader} from './table-header';
import {TableSettings} from './table-settings';
import {isNullOrUndefined} from 'util';
import {TableElement} from './table-element';
import {TableCssSettings} from './table-css-settings';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  // Inputs y Outputs
  @Input() readonly = false;
  @Input() settings: TableSettings;
  @Input() data: any[] = [];
  @Input() headings: TableHeader[];
  @Input() selected: any[] = [];
  @Output() cambios: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output() seleccionados: EventEmitter<any[]> = new EventEmitter<any[]>();

  // manejo interno
  all: TableElement[] = [];
  css: TableCssSettings;
  compareFunction: (d1, d2) => boolean;

  /** Por default compara d1 y d2 por sus id. si son nullOrUndefined es false.
   * @param d1
   * @param d2
   * @returns {boolean} true si d1.id==d2.id. sino false
   */
  defaultCompare(d1, d2): boolean {
    if (isNullOrUndefined(d1) || isNullOrUndefined(d2) ) {
      return false;
    }
    return d1.id == d2.id;
  }

  defaultSettings(): TableSettings {
    return {
      check: false,
      radio: false,
      selectLabel: '',
      rowSelect: true,
      compareFunction: this.defaultCompare,
      css: {
        classTable: 'table table-sm-responsive',
        selectedRowClass: 'defaultSelected'
      }
    };
  }

  constructor() { }

  ngOnInit() {
    console.log('entre al ng on Init');
    // piso valores por defecto con los recibidos
    this.settings = Object.assign(this.defaultSettings(), this.settings);
    this.settings.css = Object.assign(this.defaultSettings().css,this.settings.css);

    // paso a variables internas para reducir codigo
    this.compareFunction = this.settings.compareFunction;
    this.css = this.settings.css;

    this.all = this.data.map(dato => Object.assign({tableSelected: false}, dato) );
    this.selected.forEach(sel => {
      let esta = false;
      this.all.forEach( dato => {
        if (this.compareFunction(sel, dato)) {
          dato.tableSelected = true;
          esta = true;
          return;
        }
      });
      if (!esta) {
        this.all.push(Object.assign({tableSelected: true}, sel));
      }
    });
  }

  rowClick(objeto: TableElement, indice: number, evento: Event) {
    if (isNullOrUndefined( this.settings.rowSelect) || this.settings.rowSelect == false || this.readonly ) {
      return;
    }
    if (this.settings.check === true) {
      this.checkClick(objeto, indice, evento);
    } else if (this.settings.radio === true) {
      this.radioClick(objeto, indice, evento);
    }
  }

  checkClick(objeto: TableElement, indice: number, evento: Event) {
    evento.preventDefault();
    evento.stopPropagation();
    if (this.readonly) {
      return;
    }
    if (objeto.tableSelected === true) {
      objeto.tableSelected = false;
    } else {
      objeto.tableSelected = true;
    }
    this.cambios.emit(this.all);
    this.seleccionados.emit(this.all.filter(a => a.tableSelected === true));
  }

  radioClick(objeto: TableElement, indice: number, evento: Event) {
    evento.preventDefault();
    evento.stopPropagation();
    if (this.readonly) {
      return;
    }
    if (objeto.tableSelected === true) {
      return;
    } else {
      let selected = this.all.filter( (d: TableElement) => d.tableSelected===true );
      selected.forEach( (d: TableElement) => d.tableSelected=false);
      objeto.tableSelected=true;
    }
    this.cambios.emit(this.all);
    this.seleccionados.emit(this.all.filter(a => a.tableSelected === true));
  }



}
