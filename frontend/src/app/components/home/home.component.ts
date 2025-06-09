import { Component, OnInit } from '@angular/core';
import { Prodotto } from '../../models/Prodotto';
import { PublicService } from '../../services/public.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CarrelloUtenteService } from '../../services/carrello-utente.service';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  prodotti: Prodotto[] = [];
  quantita: { [prodottoId: number]: number } = {};

  constructor(
    readonly publicService: PublicService,
    readonly authService: AuthService,
    readonly carrelloService: CarrelloUtenteService,
    readonly adminService: AdminService
  ) {}

  ngOnInit(): void {
    if (this.authService.getUserRole() !== 'ROLE_ADMIN') this.getProdotti();
    else this.getProdottiAdmin();
  }

  getProdotti(): void {
    this.publicService.getAllProdotti().subscribe({
      next: (data) => {
        this.prodotti = data;

        const utenteId = this.authService.getIdUser();
        if (this.authService.isAuthenticated() && utenteId) {
          for (const prodotto of this.prodotti) {
            this.carrelloService
              .getQuantitaProdottoNelCarrello(utenteId, prodotto.id!)
              .subscribe({
                next: (quantita) => {
                  this.quantita[prodotto.id!] = quantita;
                },
                error: (err) => {
                  // Se non trovato o errore (es: 404), metti 0
                  console.warn(
                    `Prodotto ${prodotto.id} non trovato nel carrello. Imposto quantità a 0.`
                  );
                  this.quantita[prodotto.id!] = 0;
                },
              });
          }
        }
      },
      error: (err) => {
        console.error('Errore nel recupero dei prodotti:', err);
      },
    });
  }

  getProdottiAdmin(): void {
    this.publicService.getAllProdotti().subscribe({
      next: (data) => {
        this.prodotti = data;
      },
      error: (err) => {
        console.error('Errore nel recupero dei prodotti:', err);
      },
    });
  }

  aggiungiAlCarrello(prodottoId: number, quantita: number): void {
    if (!quantita || quantita < 1) {
      quantita = 1; // quantità minima 1
    }
    this.carrelloService.aggiungiAlCarrello(0, prodottoId, quantita).subscribe({
      next: () => {
        alert('Prodotto aggiunto al carrello!');
        this.quantita[prodottoId] = 1; // reset quantità input
      },
      error: (err) => {
        alert("Errore durante l'aggiunta al carrello.");
        console.error(err);
      },
    });
  }

  eliminaProdotto(prodottoId: number): void {
    this.adminService.eliminaProdotto(prodottoId).subscribe({
      next: () => {
        // Ricarica la lista prodotti dopo eliminazione
        this.publicService.getAllProdotti().subscribe((prodotti) => {
          this.prodotti = prodotti;
        });
      },
      error: (err) => {
        console.error('Errore durante eliminazione prodotto:', err);
      },
    });
  }
}
