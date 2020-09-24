import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private baseURL: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseURL = baseUrl;
  }

  public getAll(itensPagina: number, index: number) {
    return this.http.get(this.baseURL + `produto/${itensPagina}/${index}`);
  }

  public get(id: any) {
    return this.http.get(this.baseURL + `produto/${id}`);
  }

  public filtrar(itensPagina: number, index: number, pesquisa: any) {
    return this.http.get(this.baseURL + `produto/${itensPagina}/${index}/${pesquisa}`);
  }

  public post(produto: any) {
    return this.http.post(this.baseURL + "produto", produto);
  }

  public put(produto: any) {
    return this.http.put(this.baseURL + "produto", produto);
  }

  public delete(id: any) {
    return this.http.delete(this.baseURL + `produto/${id}`);
  }
}
