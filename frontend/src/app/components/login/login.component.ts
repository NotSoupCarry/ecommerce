import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthRequest } from '../../models/responses/AuthRequest';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(readonly authService: AuthService, readonly router: Router) {}

  login(event: Event) {
    event.preventDefault();

    // Creiamo l'oggetto AuthRequest
    const authRequest: AuthRequest = {
      username: this.username,
      password: this.password,
    };

    this.authService.login(authRequest).subscribe({
      next: (response) => {
        console.log('Login success:', response);

        // Controlla il ruolo dell'utente

        this.router.navigate(['/']); 
      },
      error: (error) => {
        console.error('Errore nel login:', error);
        this.errorMessage = 'Credenziali non valide. Riprova.';
      },
    });
  }
}
