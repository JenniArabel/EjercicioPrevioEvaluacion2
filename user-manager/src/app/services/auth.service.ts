import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  //TOKEN_KEY: Es la clave bajo la cual se guarda el token
  // de autenticación en Local Storage.
  private readonly TOKEN_KEY = 'authToken';

  // login(token: string): Guarda el token recibido en Local Storage,
  // iniciando la sesión.
  login(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  // logout(): Elimina el token de Local Storage, cerrando la sesión.
  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  // isLoggedIn(): Verifica si hay un token en Local Storage
  // para determinar si el usuario está autenticado.
  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }
}
