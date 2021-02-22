import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DistanceMatrixService {

  private baseURL: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseURL = baseUrl;
  }

  public get(cepDestino: string) {
    return this.http.get(this.baseURL + `distanceMatrix/${cepDestino}`);
  }
}
