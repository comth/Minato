import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseURL: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseURL = baseUrl;
  }

  public getAll(itensPagina: number, index: number) {
    return this.http.get(this.baseURL + "usuario/${itensPagina}/${index}");
  }

  public post(usuario: any) {
    return this.http.post(this.baseURL + "usuario", usuario);
  }
}
