import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[passwordStrength]'
})
export class PasswordStrengthDirective {
  @Output() strengthChange = new EventEmitter<'Débil' | 'Media' | 'Fuerte'>();

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value; // Obtengo el valor actual del campo de entrada

    // Si el valor no está vacío, emito la fortaleza calculada
    if (value.length > 0) {
      this.strengthChange.emit(this.getStrength(value));
    } else { // Si está vacío, emito undefined para indicar que no hay fortaleza
      this.strengthChange.emit(undefined);
    }
  }

  getStrength(password: string): 'Débil' | 'Media' | 'Fuerte' {
    let score = 0; // Inicializo un puntaje para evaluar la fortaleza

    // Cada if suma 1 punto de fortaleza si se cumple la condición
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    switch (score) {
      case 0:
      case 1:
        return 'Débil';
      case 2:
      case 3:
        return 'Media';
      default:
        return 'Fuerte';
    }
  }
}
