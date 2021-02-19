import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DistanceMatrixService {

  cepOrigem: string = '86010060';
  key: string = '';
  base: string = 'https://maps.googleapis.com/maps/api/distancematrix/json?'

  constructor(private http: HttpClient) { }

  public get(cepDestino: any) {
    return this.http.get(`${this.base}origins=${this.cepOrigem}&destinations=${cepDestino}&key=${this.key}`);
  }
}
