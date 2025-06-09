import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prodotto } from '../models/Prodotto';

@Injectable({
  providedIn: 'root'
})
export class PublicService {
  
  readonly baseUrl = 'http://localhost:8080/api/public';

  constructor(readonly http: HttpClient) {}

  getAllProdotti(): Observable<Prodotto[]> {
    return this.http.get<Prodotto[]>(`${this.baseUrl}/allProducts`);
  }
}
