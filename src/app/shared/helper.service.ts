import { Injectable } from '@angular/core';

@Injectable()
export class Helper {

  constructor() { }

  /**
   * chequea si el objeto recibido es una fecha
   * @param fecha
   * @returns {boolean}
   */
  static isDate(fecha: any): boolean {
    return fecha instanceof Date;
  }

  /**
   * Chequea si el objeto recibido es una fecha VALIDA
   * @param d
   * @returns {boolean}
   */
  static isValidDate(d: any) {
    if (Object.prototype.toString.call(d) === '[object Date]') {
      // it is a date
      if ( isNaN(d.getTime()) ) {  // d.valueOf() could also work
        // date is not valid
        return false;
      } else {
        // date is valid
        return true;
      }
    } else {
      // not a date
      return false;
    }
    // return d instanceof Date && !isNaN(d);
  }

  /**
   * Devuelve un nuevo objeto fecha con mas dias
   * @param fecha Date de origen a sumarle los dias
   * @param dias cantidad de dias(integer)
   * @returns {Date} new date
   */
  static agregarDias(fecha: Date, dias: number): Date {
    const d = new Date(fecha.getTime());
    d.setDate(d.getDate() + dias);
    return d;
  }

  /**
   * Armar el blob y lo descarga. testeado en Chrome e IE11
   * @param binario binario recibido derecho del back. Desde java un byte[]
   * @param nombreDocumento nombre que va a tener el documento descargado
   * @param tipoDocumento - default: 'application/pdf'
   */
  static descargarArchivo(binario:any, nombreDocumento:string, tipoDocumento?:string) {
    const byteCharacters = atob(binario);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], {type: 'application/pdf'});
    // pregunto si es IE11 para abrir el archivo de forma exclusiva para el navegador
    if (Helper.detectIE() === 11) {
      window.navigator.msSaveOrOpenBlob(blob, nombreDocumento);
    } else {
      const fileURL = URL.createObjectURL(blob);
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.href = fileURL;
      a.download = nombreDocumento;
      a.click();
      document.body.removeChild(a);
    }
  }

    /**
     * detect IE
     * returns version of IE or false, if browser is not Internet Explorer
     */
  static detectIE() {
      let ua = window.navigator.userAgent;

      // Test values; Uncomment to check result …

      // IE 10
      // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';

      // IE 11
      // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

      // IE 12 / Spartan
      // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

      // Edge (IE 12+)
      // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

      let msie = ua.indexOf('MSIE ');
      if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
      }

      let trident = ua.indexOf('Trident/');
      if (trident > 0) {
        // IE 11 => return version number
        let rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
      }

      let edge = ua.indexOf('Edge/');
      if (edge > 0) {
        // Edge (IE 12+) => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
      }

      // other browser
      return false;
    }

}
