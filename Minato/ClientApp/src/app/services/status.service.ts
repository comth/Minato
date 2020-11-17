import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private baseURL: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseURL = baseUrl;
  }

  public getAll() {
    return this.http.get(this.baseURL + `status`);
  }

  public get(id: any) {
    return this.http.get(this.baseURL + `status/${id}`);
  }

  public post(status: any) {
    delete status.id;
    return this.http.post(this.baseURL + "status", status);
  }

  public put(status: any) {
    return this.http.put(this.baseURL + "status", status);
  }

  public delete(id: any) {
    return this.http.delete(this.baseURL + `status/${id}`);
  }
}
