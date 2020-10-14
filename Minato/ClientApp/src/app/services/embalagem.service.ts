import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class EmbalagemService {

  private baseURL: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseURL = baseUrl;
  }

  public getAll() {
    return this.http.get(this.baseURL + `embalagem`);
  }

  public get(id: any) {
    return this.http.get(this.baseURL + `embalagem/${id}`);
  }

  public post(embalagem: any) {
    embalagem.idEmbalagem = +embalagem.idEmbalagem;
    embalagem.preco = +embalagem.preco;
    console.log(embalagem);
    return this.http.post(this.baseURL + "embalagem", embalagem);
  }

  public put(embalagem: any) {
    return this.http.put(this.baseURL + "embalagem", embalagem);
  }

  public delete(id: any) {
    return this.http.delete(this.baseURL + `embalagem/${id}`);
  }
}
