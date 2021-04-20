import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
              Swal.fire(
                'Erro',
                'Item já registrado',
                'error'
              )
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
              let text;

              identifiers.forEach(x => {
                text = err.error.errors[x];
              })

              console.log(text);
              Swal.fire(
                'Erro',
                'aaa',
                'error'
              )
              break;

            default:
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
