import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Produto {
  idProduto: number;
  nome: string;
  preco: number;
  embalagem: any;
}

@Injectable({
  providedIn: 'root'
})

export class ProdutoService {

  private baseURL: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseURL = baseUrl;
  }

  public getAll() {
    return this.http.get(this.baseURL + `produto`);
  }

  public get(id: any) {
    return this.http.get(this.baseURL + `produto/${id}`);
  }

  public post(produto: Produto) {
    produto.idProduto = +produto.idProduto;
    produto.preco = +produto.preco;
    produto.embalagem.idEmbalagem = +produto.embalagem.idEmbalagem;
    produto.embalagem.preco = +produto.embalagem.preco;
    console.log(produto);
    return this.http.post(this.baseURL + "produto", produto);
  }

  public put(produto: any) {
    return this.http.put(this.baseURL + "produto", produto);
  }

  public delete(id: any) {
    return this.http.delete(this.baseURL + `produto/${id}`);
  }
}
