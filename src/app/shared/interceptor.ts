import {
  HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NGXLogger} from 'ngx-logger';
import {environment} from '../../environments/environment';
import {ErrorModalComponent} from './error-modal/error-modal.component';
import {ModalInfo} from '../modelo/modal-info';

/**
 *  Developed by Lmufato
 *  Interceptor que en caso de error en la comunicacion con el BACK, si el error tiene 'algo que ver'
 *  con el LOGGER lo ignora (para evitar recursion) si no tiene esta relacionado con el logger, en base al http status
 *  muestra un pop-up en la pantalla con el error y logea la informacion al BACK
 */
@Injectable()
export class Interceptor implements HttpInterceptor {


  constructor(private logger: NGXLogger, private modalService: NgbModal) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // indica que no se debe guardar cache. Si se guarda el cache, en IE11 la app funciona mal ya que cachea los gets
    // en los que se pide informacion del back, y muestra informacion desactualizada.
    const httpRequest = req.clone({
      headers: new HttpHeaders({
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': 'Sat, 01 Jan 2000 00:00:00 GMT'
      })
    });
    // this.logger.info('------- INTERCEPTOR: intercepte: ', req, next);

    // pasa la solicitud al proximo filtro pero catchea cualquier error
    return next.handle(httpRequest)
      .catch( (httpErrorResponse: HttpErrorResponse, caught: Observable<any>) => {

        this.logger.info('------- INTERCEPTOR: Error Occurred', httpErrorResponse, caught, httpRequest);

        // si el error de la comunicacion contiene la URL para logear, osea el problema esta relacionado
        // con el logger o falta de internet, por lo que no muestra mensaje ni logea
        // (ya mostro mensaje en el primer caso por el error original)

        if ( !httpRequest.url.includes(environment.logUrl) ) {
          const componentRef = this.modalService.open(ErrorModalComponent);
          const modal: ModalInfo = new ModalInfo({
            parrafo1: 'Ha ocurrido un error inesperado!',
            errorStyle: true,
            detalle: JSON.stringify(httpErrorResponse)
          });
          switch (httpErrorResponse.status) {
            case 0: // problemas con el CORS o falta de conexion
            case 404:
              // error en la conexion, server caido o no hay internet
              modal.parrafo1 = 'Error en la conexion al servidor.';
              modal.parrafo2 = 'No se pudo obtener la URL: ' + httpRequest.url;
              break;
            case 500:
              // runtime del back
              modal.parrafo1 = 'El servidor tuvo un error: ';
              modal.parrafo2 = httpErrorResponse.error.message;
              break;
            case 409:
              // errores que maneja el back
              modal.parrafo1 = 'El servidor informa el siguiente error:';
              modal.parrafo2 = '"' + httpErrorResponse.error.message + '"';
              break;
            default:
              modal.parrafo2 = httpErrorResponse.error.message;
          }
          componentRef.componentInstance.info = modal;
          this.logger.error('FALLO EL PEDIDO: ' + httpRequest.method + ' ' + httpRequest.urlWithParams,
            ' - HttpRequest completo: ' + JSON.stringify(httpRequest));
          return Observable.throw(httpErrorResponse);
        } else {
          // no logeo ya que la libreria lo hace sola si no puede logear la info
          // this.logger.info('TUVE UN ERROR AL LOGUEAR EN EL BACK PERO LO IGNORO');
        }
    }) as any;

  }




}
