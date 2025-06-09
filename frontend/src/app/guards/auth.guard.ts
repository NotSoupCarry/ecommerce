import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Ruolo } from '../enums/Ruolo';


export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Controlla se l'utente è autenticato
  if (authService.isAuthenticated()) {
    const userRole = authService.getUserRole();

    // Se l'utente è autenticato e il ruolo è 'admin', reindirizza alla pagina admin
    if (userRole === Ruolo.ADMIN) {
      router.navigate(['/']);
      return false;
    }
    
    // Se l'utente è autenticato e il ruolo è 'user', reindirizza alla userpage
    if (userRole === Ruolo.USER) {
      router.navigate(['/']);
      return false;
    }
  }

  // Se l'utente non è autenticato, consenti l'accesso alla route
  return true;
};