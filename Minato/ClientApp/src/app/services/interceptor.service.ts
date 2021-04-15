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
            //tratar erros dos requireds back
            case 409:
              Swal.fire(
                'Erro',
                'Item não encontrado',
                'error'
              )
            case 404:
              Swal.fire(
                'Erro',
                'Item não encontrado',
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
