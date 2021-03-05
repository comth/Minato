import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Pedido } from "../interfaces/pedido";
import { TipoPedido } from "../enums/tipo-pedido";

@Injectable({
  providedIn: 'root'
})

export class PedidoService {

  private baseURL: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseURL = baseUrl;
  }

  public getAll() {
    return this.http.get(this.baseURL + `pedido`);
  }

  public get(id: any) {
    return this.http.get(this.baseURL + `pedido/${id}`);
  }

  public getEspecifico(tipoPedido: TipoPedido) {
    return this.http.get(this.baseURL + `pedido/especifico/${tipoPedido}`);
  }

  //public filtrar(itensPagina: number, index: number, pesquisa: any) {
  //  return this.http.get(this.baseURL + `pedido/${itensPagina}/${index}/${pesquisa}`);
  //}

  public post(pedido: Pedido, idMesa?) {
    let i = 0;
    for (i; i < pedido.produtos.length; i++) {
      delete pedido.produtos[i].id
    }
    if (!idMesa) idMesa = 0;
    return this.http.post(this.baseURL + "pedido/" + idMesa, pedido);
  }

  public put(pedido: Pedido) {
    return this.http.put(this.baseURL + "pedido", pedido);
  }

  public encerrarPedido(id: number) {
    return this.http.put(this.baseURL + "pedido/encerrar/" + id, {});
  }

  public delete(id: any) {
    return this.http.delete(this.baseURL + `pedido/${id}`);
  }
}
