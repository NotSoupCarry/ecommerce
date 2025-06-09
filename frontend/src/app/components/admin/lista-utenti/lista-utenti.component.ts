import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../services/admin.service';
import { Utente } from '../../../models/Utente';
import { AuthService } from '../../../services/auth.service';
import { Ruolo } from '../../../enums/Ruolo';

@Component({
  selector: 'app-lista-utenti',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-utenti.component.html',
  styleUrl: './lista-utenti.component.scss'
})
export class ListaUtentiComponent implements OnInit {
  utenti: Utente[] = [];
  errore: string | null = null;

  constructor(
    readonly adminService: AdminService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.authService.getUserRole() === 'ROLE_ADMIN') {
      this.adminService.getAllUtenti().subscribe({
        next: (res) => this.utenti = res,
        error: (err) => this.errore = 'Errore nel caricamento degli utenti.'
      });
    } else {
      this.errore = 'Accesso negato. Solo l\'admin può visualizzare gli utenti.';
    }
  }

  Ruolo = Ruolo; // per usare l'enum nel template
}
