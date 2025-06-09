import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Utente } from '../models/Utente';
import { AuthRequest } from '../models/responses/AuthRequest';
import { AuthResponse } from '../models/responses/AuthResponse';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly apiUrl = 'http://localhost:8080/api/auth'; // URL del backend

  constructor(readonly http: HttpClient, readonly router: Router) { }

  /**
   * Registra un nuovo utente
   */
  register(utente: Utente): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/register`, utente).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Effettua il login e salva il token e il ruolo nel localStorage
   */
  login(authRequest: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, authRequest).pipe(
      tap(response => {
        this.saveToken(response.accessToken);
        this.saveUserRole(response.role);
        this.saveIdUser(response.idUser);
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Salva il token JWT nel localStorage
   */
  private saveToken(accessToken: string): void {
    localStorage.setItem('accessToken', accessToken);
  }

  /**
   * Ottiene il token JWT dal localStorage
   */
  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  /**
   * Salva il ruolo dell'utente nel localStorage
   */
  private saveUserRole(role: string): void {
    localStorage.setItem('role', role);
  }

  /**
   * Ottiene il ruolo dell'utente
   */
  getUserRole(): string | null {
    return localStorage.getItem('role');
  }


  private saveIdUser(idUser: number): void {
    localStorage.setItem('idUser', idUser.toString());
  }

  /**
   * Ottiene il ruolo dell'utente
   */
  getIdUser(): number | null {
    const id = localStorage.getItem('idUser');
    return id ? Number(id) : null;
  }

  /**
   * Cancella il token e il ruolo dal localStorage per effettuare il logout
   */
  logout(): void {
    localStorage.clear(); // Rimuove tutti gli item dal localStorage
    this.router.navigate(["/login"]);
  }

  /**
   * Controlla se l'utente è autenticato
   */
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  /**
   * Gestisce errori HTTP
   */
  private handleError(error: HttpErrorResponse) {
    let errorMsg = 'Si è verificato un errore';
    if (error.error instanceof ErrorEvent) {
      errorMsg = `Errore client: ${error.error.message}`;
    } else {
      errorMsg = `Errore server: ${error.status} - ${error.message}`;
    }
    return throwError(() => new Error(errorMsg));
  }

}