import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Ruolo } from '../enums/Ruolo';

export const roleUserGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    const userRole = authService.getUserRole();

    if (userRole === Ruolo.USER) {
      return true;
    }
  }

  // Se l'utente non è autenticato, non consenti l'accesso alla route
  router.navigate(['/']);
  return false;
};
