import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prodotto } from '../models/Prodotto';
import { Utente } from '../models/Utente';
import { CarrelloUtente } from '../models/CarrelloUtente';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private readonly apiUrl = 'http://localhost:8080/api/admin';

  constructor(readonly http: HttpClient, readonly authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  /**
   * Recupera tutti gli utenti (solo per admin)
   */
  getAllUtenti(): Observable<Utente[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Utente[]>(`${this.apiUrl}/utenti/all`, { headers });
  }

  /**
   * Crea un nuovo prodotto (solo per admin)
   */
  creaProdotto(prodotto: Prodotto): Observable<Prodotto> {
    const headers = this.getAuthHeaders();
    return this.http.post<Prodotto>(`${this.apiUrl}/prodotto`, prodotto, { headers });
  }

  /**
   * Elimina un prodotto per ID (solo per admin)
   */
  eliminaProdotto(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.apiUrl}/prodotto/${id}`, { headers });
  }

  /**
   * Recupera tutti i carrelli di tutti gli utenti (solo per admin)
   */
  getTuttiICarrelli(): Observable<CarrelloUtente[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<CarrelloUtente[]>(`${this.apiUrl}/CarrelloUtente`, { headers });
  }
}
