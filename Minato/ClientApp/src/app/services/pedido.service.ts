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

  public getAll(itensPagina: number, index: number) {
    return this.http.get(this.baseURL + "pedido/${itensPagina}/${index}");
  }

  public post(pedido: any) {
    return this.http.post(this.baseURL + "pedido", pedido);
  }
}
