import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MesaService {

  private baseURL: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseURL = baseUrl;
  }

  public getAll() {
    return this.http.get(this.baseURL + `mesa`);
  }

  public get(id: any) {
    return this.http.get(this.baseURL + `mesa/${id}`);
  }

  public post(mesa: any) {
    delete mesa.id;
    return this.http.post(this.baseURL + "mesa", mesa);
  }

  public put(mesa: any) {
    return this.http.put(this.baseURL + "mesa", mesa);
  }

  public delete(id: any) {
    return this.http.delete(this.baseURL + `mesa/${id}`);
  }
}
