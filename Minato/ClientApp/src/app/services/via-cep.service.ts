import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ViaCepService {

  constructor(private http: HttpClient) { }

  public get(cep: any) {
    return this.http.get(`https://viacep.com.br/ws/${cep}/json/unicode`);
  }
}
