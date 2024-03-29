import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Configuracao } from '../interfaces/configuracao';

@Injectable({
  providedIn: 'root'
})

export class ConfiguracaoService {

  private baseURL: string;
  public configuracao: Configuracao;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseURL = baseUrl;
  }

  public get() {
    return this.http.get(this.baseURL + `configuracao`);
  }

  public put(configuracao: any) {
    return this.http.put(this.baseURL + "configuracao", configuracao);
  }
}
