import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";

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

  public filtrar(itensPagina: number, index: number, pesquisa: any) {
    return this.http.get(this.baseURL + `pedido/${itensPagina}/${index}/${pesquisa}`);
  }

  public post(pedido: any) {
    return this.http.post(this.baseURL + "pedido", pedido);
  }

  public put(pedido: any) {
    return this.http.put(this.baseURL + "pedido", pedido);
  }

  public delete(id: any) {
    return this.http.delete(this.baseURL + `pedido/${id}`);
  }
}
