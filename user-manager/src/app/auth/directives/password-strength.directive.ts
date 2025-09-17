import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

/* Directiva para evaluar la fortaleza de la contraseña
Se trata de una directiva personaliza de Angular que
escucha los eventos de entrada en un campo de contraseña
y emite la fortaleza de la contraseña basada en ciertos criterios.

Una directiva personalizada es una clase en Angular que puede
modificar el comportamiento o la apariencia de los elementos del DOM
a los que está asociada.

Se usa el decorador @Directive para definir la directiva
y se especifica un selector que se usará en el template HTML
*/
@Directive({
  selector: '[passwordStrength]'
})
export class PasswordStrengthDirective {
  /** @Output()
   * Es un decorador que marca una propiedad de la directiva
   * como un evento que puede ser escuchado por el componente padre.
   * En este caso, strengthChange es un evento que emite la fortaleza
   * de la contraseña ('Débil', 'Media', 'Fuerte') cada vez que el usuario
   * escribe en el campo de entrada.
  */
  @Output() strengthChange = new EventEmitter<'Débil' | 'Media' | 'Fuerte'>();

  /** @HostListener
   * Es un decorador que se usa para escuchar eventos
   *
   * En este caso, escucha el evento 'input' que:
   * Cada vez que ocurre un evento de entrada en el elemento se llama al método onInput
   */
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

  /** getStrength
   * Es un método que evalúa la fortaleza de la contraseña
   * basado en ciertos criterios y devuelve 'Débil', 'Media' o 'Fuerte'.
   */
  getStrength(password: string): 'Débil' | 'Media' | 'Fuerte' {
    let score = 0; // Inicializo un puntaje para evaluar la fortaleza

    // Cada if suma 1 punto de fortaleza si se cumple la condición
    if (password.length >= 8) score++; // Al menos 8 caracteres
    if (/[A-Z]/.test(password)) score++; // Tener al menos una letra mayúscula
    if (/[0-9]/.test(password)) score++; // Tener al menos un número
    if (/[^A-Za-z0-9]/.test(password)) score++; // Tener al menos un carácter especial


    // Evaluo la fortaleza de la contraseña: 0-1 es 'Débil', 2-3 es 'Media' y 4 es 'Fuerte'
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
