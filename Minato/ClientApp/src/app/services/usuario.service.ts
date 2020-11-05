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

  public getAll() {
    return this.http.get(this.baseURL + `usuario`);
  }

  public get(id: any) {
    return this.http.get(this.baseURL + `usuario/${id}`);
  }

  public filtrar(itensPagina: number, index: number, pesquisa: any) {
    return this.http.get(this.baseURL + `usuario/${itensPagina}/${index}/${pesquisa}`);
  }

  public post(usuario: any) {
    delete usuario.id;
    let i = 0;
    for (i; i < usuario.enderecos.length; i++) {
      delete usuario.enderecos[i].id
    }
    i = 0;
    for (i; i < usuario.telefones.length; i++) {
      delete usuario.telefones[i].id
    }
    console.log(usuario)
    return this.http.post(this.baseURL + "usuario", usuario);
  }

  public put(usuario: any) {
    return this.http.put(this.baseURL + "usuario", usuario);
  }

  public delete(id: any) {
    return this.http.delete(this.baseURL + `usuario/${id}`);
  }
}
