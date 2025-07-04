import { Component, OnInit } from '@angular/core';
import { CarrelloUtenteService } from '../../../services/carrello-utente.service';
import { AuthService } from '../../../services/auth.service';
import { CarrelloUtente } from '../../../models/CarrelloUtente';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-carello-utente',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './carello-utente.component.html',
  styleUrl: './carello-utente.component.scss',
})
export class CarelloUtenteComponent implements OnInit {
  carrello: CarrelloUtente[] = [];
  errore: string = '';
  totale: number = 0;

  modificaQuantitaId: number | null = null; // Id prodotto in modifica
  quantitaModificata: number = 1; // Valore della quantità in input

  constructor(
    readonly carrelloService: CarrelloUtenteService,
    readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.caricaCarrello();
  }

  caricaCarrello(): void {
    const utenteId = this.authService.getIdUser();
    if (utenteId) {
      this.carrelloService.getCarrelloByUtenteId(utenteId).subscribe({
        next: (dati) => {
          this.carrello = dati;
          this.totale = this.carrello.reduce(
            (acc, item) => acc + item.quantita * item.prezzo,
            0
          );
        },
        error: (err) => {
          this.errore = 'Errore nel recupero del carrello.';
          console.error(err);
        },
      });
    } else {
      this.errore = 'Utente non autenticato.';
    }
  }

  eliminaProdottoDalCarrello(prodottoId: number): void {
    const utenteId = this.authService.getIdUser();
    if (!utenteId) {
      this.errore = 'Utente non autenticato';
      return;
    }

    this.carrelloService.eliminaDalCarrello(utenteId, prodottoId).subscribe({
      next: () => {
        alert('Prodotto rimosso dal carrello');
        this.caricaCarrello();
      },
      error: (err) => {
        this.errore = 'Errore durante la rimozione del prodotto';
        this.caricaCarrello();
        console.error(err);
      },
    });
  }

  iniziaModificaQuantita(prodottoId: number, quantitaCorrente: number): void {
    this.modificaQuantitaId = prodottoId;
    this.quantitaModificata = quantitaCorrente;
  }

  annullaModifica(): void {
    this.modificaQuantitaId = null;
  }

  salvaModificaQuantita(prodottoId: number): void {
    const utenteId = this.authService.getIdUser();
    if (!utenteId) {
      this.errore = 'Utente non autenticato';
      return;
    }

    if (this.quantitaModificata < 1) {
      this.errore = 'La quantità deve essere almeno 1.';
      return;
    }

    this.carrelloService
      .aggiornaQuantita(utenteId, prodottoId, this.quantitaModificata)
      .subscribe({
        next: () => {
          alert('Quantità aggiornata');
          this.modificaQuantitaId = null;
          this.caricaCarrello();
        },
        error: (err) => {
          this.errore = "Errore durante l'aggiornamento della quantità";
          console.error(err);
        },
      });
  }
}
