import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'register',
  standalone: true,
  imports: [ReactiveFormsModule], // Importacion de ReactiveFormsModule para usar formularios reactivos
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  registerForm: FormGroup; // Declaración de la variable del formulario

  // Inyección de FormBuilder para facilitar la creación del formulario
  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group(
      {
        // Campos del formulario con sus validaciones
        // Cada campo es un array donde el primer elemento es el valor inicial y el segundo son los validadores
        name: ['', [Validators.required, Validators.minLength(2)]], // Nombre es obligatorio y debe tener al menos 2 caracteres
        email: ['', [Validators.required, Validators.email]], // Email es obligatorio y debe ser un email válido
        password: ['', [Validators.required, Validators.minLength(6)]], // Contraseña es obligatoria y debe tener al menos 6 caracteres
        confirmPassword: ['', [Validators.required]], // Confirmar contraseña es obligatorio
      },
      {
        validators: this.passwordMatchValidator, // Llamado al validador personalizado para verificar que las contraseñas coincidan
      }
    );
  }

  /* Condiciones de un email válido:
  Angular internamente verifica que:
  - contenga "@"
  - que haya caracteres antes y después del @
  - que tenga un dominio válido despues del @

  Un dominio es válido cuando contiene:
  - al menos un punto separando el nombre de dominio y la extensión
  - la extensión después del punto debe tener al menos 2 caracteres
  - no puede comenzar ni terminar con guión (-)
  - no puede tener dos puntos seguidos (..)
  - solo puede contener letras, números, guiones (-), puntos (.) y guion bajo (_)

  */

  // Validador personalizado para verificar que las contraseñas coincidan
  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value // Comparo los valores de ambos campos
      ? null
      : { mismatch: true }; // Si coinciden, no hay error (null). Si no coinciden, retorno un objeto con el error
    // mismatch es el nombre del error que puedo usar en el template para mostrar un mensaje
  }

  // Manejo del envío del formulario
  onSubmit() {
    // onSubmit es un método que es llamado al hacer click en el botón de enviar
    if (this.registerForm.valid) {
      // Verifico que el formulario sea válido
      console.log(this.registerForm.value); // Imprimo los valores del formulario en la consola
      // Aquí irá la lógica de registro
    }
  }
}
