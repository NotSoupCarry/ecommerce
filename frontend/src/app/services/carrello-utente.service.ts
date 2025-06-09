import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarrelloUtente } from '../models/CarrelloUtente';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CarrelloUtenteService {
  readonly apiUrl = 'http://localhost:8080/api/carrello';

  constructor(readonly http: HttpClient, readonly authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken(); // Ottieni il token da AuthService
    console.log(token);
    return new HttpHeaders({
      Authorization: `Bearer ${token}`, // Aggiungi l'header di autorizzazione
    });
  }

  /**
   * Aggiunge un prodotto al carrello
   */
  aggiungiAlCarrello(
    utenteId: number,
    prodottoId: number,
    quantita: number
  ): Observable<any> {
    const params = new HttpParams()
      .set('utenteId', this.authService.getIdUser()!)
      .set('prodottoId', prodottoId)
      .set('quantita', quantita);
    const headers = this.getAuthHeaders();

    console.log(headers);
    return this.http.post(`${this.apiUrl}/aggiungi`, null, { headers, params });
  }

  /**
   * Recupera il carrello di un utente per ID
   */
  getCarrelloByUtenteId(utenteId: number): Observable<CarrelloUtente[]> {
    const headers = this.getAuthHeaders();

    return this.http.get<CarrelloUtente[]>(
      `${this.apiUrl}/utente/${utenteId}`,
      { headers }
    );
  }
}
