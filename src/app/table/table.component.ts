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
      },
      sortable: false
    };
  }

  constructor() { }

  ngOnInit() {
    console.log('entre al ng on Init');
    // piso valores por defecto con los recibidos
    this.settings = Object.assign(this.defaultSettings(), this.settings);
    this.settings.css = Object.assign(this.defaultSettings().css, this.settings.css);

    // paso a variables internas para reducir codigo
    this.compareFunction = this.settings.compareFunction;
    this.css = this.settings.css;

    // copio los 'datos' sin seleccionar
    this.all = this.data.map(dato => Object.assign({tableSelected: false}, dato) );
    // por cada seleccionado lo agrego a los datos o le cambio el estado a seleccionado
    this.selected.forEach(sel => {
      let esta = false;
      this.all.forEach( dato => {
        // si esta le cambio el estado
        if (this.compareFunction(sel, dato)) {
          dato.tableSelected = true;
          esta = true;
          return;
        }
      });
      // si no esta lo agrego
      if (!esta) {
        this.all.push(Object.assign({tableSelected: true}, sel));
      }
    });

    // si se paso que este ordenado por alguna columna, la obtengo y la ordeno por esa
    let header = this.headings.filter( h => h.ordenado === 'asc' || h.ordenado === 'des').pop();
    if( !isNullOrUndefined(header)){
      this.sortBy(header);
    }

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
      const selected = this.all.filter( (d: TableElement) => d.tableSelected === true );
      selected.forEach( (d: TableElement) => d.tableSelected = false);
      objeto.tableSelected = true;
    }
    this.cambios.emit(this.all);
    this.seleccionados.emit(this.all.filter(a => a.tableSelected === true));
  }

  /**
   * Ordena la lista por el field del header
   * @param header tableHeader
   */
  sortBy(header: TableHeader) {
    if( !(this.settings.sortable || header.sortable) ){
      return;
    }
    // voy pasando por los estados def -> asc -> des -> asc
    this.headings.filter( h => h !== header).forEach( h => h.ordenado = undefined);
    // si el ESTADO ACTUAL
    const f = header.field;
    switch (header.ordenado) {
      case 'asc':
        this.all.sort((a, b) => (a[f] < b[f]) ? 1 : (a[f] > b[f]) ? -1 : 0);
        header.ordenado = 'des';
        break;
      case 'des':
        this.all.sort((a, b) => (a[f] > b[f]) ? 1 : (a[f] < b[f]) ? -1 : 0);
        header.ordenado = 'asc';
        break;
      default:
        this.all.sort((a, b) => (a[f] > b[f]) ? 1 : (a[f] < b[f]) ? -1 : 0);
        header.ordenado = 'asc';
        break;
    }

  }


}
