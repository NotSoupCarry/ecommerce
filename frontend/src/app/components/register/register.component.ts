import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { Utente } from '../../models/Utente';
import { Ruolo } from '../../enums/Ruolo';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(readonly authService: AuthService, readonly router: Router) { }

  register(event: Event) {
    event.preventDefault(); // Evita il reload della pagina

    const newUser: Utente = {
      username: this.username,
      password: this.password,
      ruolo: Ruolo.USER
    };

    this.authService.register(newUser).subscribe({
      next: (response) => {
        console.log('Registrazione avvenuta con successo:', response);
        this.router.navigate(['/login']); // Redirige al login dopo la registrazione
      },
      error: (error) => {
        console.error('Errore nella registrazione:', error);
        this.errorMessage = 'Errore durante la registrazione. Riprova.';
      }
    });
  }
}
