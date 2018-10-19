import { Pipe, PipeTransform } from '@angular/core';
import {Trabajo} from '../models/trabajo';
import {isNullOrUndefined} from 'util';

@Pipe({
  name: 'trabajoPipe'
})
export class TrabajoPipe implements PipeTransform {

  transform(value: Trabajo, args?: any): any {
    if (isNullOrUndefined(value)) {
      return value;
    }
    if (isNullOrUndefined(args)) {
      return value.puesto + ' en ' + value.empresa;
    }
    switch (args) {
      case 'largo':
         return value.puesto + ' en ' + value.empresa + ' desde ' + value.fechaInicio.toDateString();
      case 'corto':
         return value.puesto;
      case 'medio':
      default:
        return value.puesto + ' en ' + value.empresa;
    }

  }

}
