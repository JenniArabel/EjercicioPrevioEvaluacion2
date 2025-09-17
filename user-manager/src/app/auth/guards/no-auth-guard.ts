import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

// Permite el acceso solo si el usuario NO está autenticado
export const noAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    router.navigate(['/']); // Redirige a la HOME si el usuario está logueado
    return false;
  }

  return true;
};
