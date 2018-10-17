import {TableCssSettings} from "./table-css-settings";
export interface TableSettings {
  check?:boolean; // pone checks a los inputs
  radio?:boolean; // pone radio a los inputs
  selectLabel?:string; // label de la columna de checks/radio
  rowSelect?:boolean; // si al clickear la fila se selecciona
  selectedRowClass?:string; // clase que se les pone a las filas seleccionadas
  compareFunction?: (d1, d2) => boolean; // funcion que compara entre los objetos recibidos
  css?: TableCssSettings; // interface con todos los css necesarios
}

