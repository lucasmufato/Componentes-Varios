import {Injector, Pipe, PipeTransform} from '@angular/core';
import {isNullOrUndefined} from 'util';

@Pipe({
  name: 'dynamicPipe'
})
/**
 * Si tira un inyectoy not provided tenes que agregar el pipe en app module en la parte de providers
 */
export class DynamicPipePipe implements PipeTransform {

  public constructor(private injector: Injector) {
  }

  transform(value: any, pipeToken: any, pipeArgs: any): any {
    if ( isNullOrUndefined(pipeToken) ) {
      return value;
    } else {
      const pipe = this.injector.get(pipeToken);
      return pipe.transform(value, ...pipeArgs);
    }
  }

}
