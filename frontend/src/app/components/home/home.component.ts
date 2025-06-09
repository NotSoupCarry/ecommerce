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
    this.getProdotti();
  }

  getProdotti(): void {
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
