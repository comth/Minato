import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TipoExcecao } from '../enums/tipo-excecao';

@Injectable({
  providedIn: 'root'
})

export class InterceptorService implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //tratar requisição antes de ir pro back
    return next.handle(req).pipe(
      tap((res) => {
        //console.log(res)
      }),
      catchError(err => {
        if (err instanceof HttpErrorResponse) {
          switch (err.status) {
            case 409:
              if (err.error.code) {
                if (err.error.code == TipoExcecao.ligadoOutraEntidade) {
                  Swal.fire(
                    'Erro',
                    'Item ligado a outra entidade',
                    'error'
                  )
                }
              } else {
                Swal.fire(
                  'Erro',
                  'Item já registrado',
                  'error'
                )
              }
              break;
            case 404:
              Swal.fire(
                'Erro',
                'Item não encontrado',
                'error'
              )
              break;
            case 400:
              let identifiers = Object.getOwnPropertyNames(err.error.errors);
              let text = '';

              identifiers.forEach(x => {
                var partText = '' + err.error.errors[x];
                partText = partText.replace(',', '\n');
                if (text = '') text = partText;
                else text = text + '\n' + partText;
              });

              Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Erro',
                html: '<pre class="swal-interceptor">' + text + '</pre>',
              });
              break;

            default: console.log(err)
          }
        }
        return throwError(new Error(err.statusText));
      }),
      finalize(() => {
        //console.log('finalize')
      })
    );
  }
}
