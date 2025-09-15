import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

let loggedIn = false; // Simulacion de si el usuario está logueado o no
/* Cuando quiera simular que el usuario está logueado,
 cambiar el valor de loggedIn a true */

export const noAuthGuard: CanActivateFn = (route, state) => {
  // const authService = inject(AuthService);
  const router = inject(Router); // Inyecto el router para redirigir si es necesario

  if (loggedIn) {
    router.navigate(['/']); // Aquí debería redirigir a la HOME si el usuario está logueado
    return false;
  }

  return true;
};
