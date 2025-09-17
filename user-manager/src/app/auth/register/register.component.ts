import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PasswordStrengthDirective } from '../directives/password-strength.directive';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    PasswordStrengthDirective,
    MatIconModule,
  ], // Importacion de ReactiveFormsModule y Angular Material
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  registerForm: FormGroup; // Declaración de la variable del formulario
  passwordStrength?: 'Débil' | 'Media' | 'Fuerte';
  showPassword = false;
  showConfirmPassword = false;

  // Inyección de FormBuilder para facilitar la creación del formulario
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router
  ) {
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
      // Simular generación de un token (en una app real, esto lo da el backend)
      const fakeToken = btoa(this.registerForm.value.email + ':' + Date.now());
      this.authService.login(fakeToken);
      // Guardar el nombre del usuario en localStorage para mostrarlo en el home
      localStorage.setItem('userName', this.registerForm.value.name);
      this.snackBar.open('Registro exitoso', 'Cerrar', {
        duration: 2000,
        panelClass: ['snackbar-success'],
      });
      console.log('Token guardado:', fakeToken);
      // Redirigir a home después de registro exitoso
      this.router.navigate(['/home']);
    } else {
      this.snackBar.open('Por favor, corrige los errores del formulario', 'Cerrar', {
        duration: 3000,
        panelClass: ['snackbar-error'],
      });
    }
  }

  // Método para actualizar la fortaleza de la contraseña
  onStrengthChange(strength: 'Débil' | 'Media' | 'Fuerte' | undefined) {
    this.passwordStrength = strength;
  }
  // Métodos para alternar la visibilidad de las contraseñas
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
