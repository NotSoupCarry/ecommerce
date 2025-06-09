import { Component } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { Prodotto } from '../../../models/Prodotto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-aggiungi-prodotto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './aggiungi-prodotto.component.html',
  styleUrl: './aggiungi-prodotto.component.scss',
})
export class AggiungiProdottoComponent {
  prodotto: Prodotto = {
    nome: '',
    descrizione: '',
    prezzo: 0,
  };

  messaggio: string = '';
  errore: string = '';

  constructor(readonly adminService: AdminService) {}

  aggiungiProdotto(): void {
    this.adminService.creaProdotto(this.prodotto).subscribe({
      next: (res) => {
        this.messaggio = 'Prodotto aggiunto con successo!';
        this.errore = '';
        this.prodotto = { nome: '', descrizione: '', prezzo: 0 }; // resetta il form
      },
      error: (err) => {
        this.errore = "Errore durante l'aggiunta del prodotto.";
        console.error(err);
        this.messaggio = '';
      },
    });
  }
}
