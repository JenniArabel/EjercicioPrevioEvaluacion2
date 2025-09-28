import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
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
  ],
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup = new FormGroup({});
  passwordStrength?: 'Débil' | 'Media' | 'Fuerte';
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  ngOnDestroy() {
    // Limpiar el formulario o cancelar suscripciones si fuera necesario
    this.registerForm.reset();
  }


  // Validador personalizado para verificar que las contraseñas coincidan
  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  onSubmit() {

    if (this.registerForm.valid) {
      // Simular generación de un token (en una app real, esto lo da el backend)
      const fakeToken = btoa(this.registerForm.value.email + ':' + Date.now());
      this.authService.login(fakeToken); // Guardar el token usando el AuthService
      localStorage.setItem('userName', this.registerForm.value.name); // Guardar el nombre del usuario en localStorage para mostrarlo en el home

      this.snackBar.open('Registro exitoso', 'Cerrar', {
        duration: 2000,
        panelClass: ['snackbar-success'],
      });

      console.log('Token guardado:', fakeToken);
      this.registerForm.reset(); // Limpiar el formulario antes de navegar (efecto visual si el usuario permanece en la página)
      this.router.navigate(['/home']); // Redirigir a home después de registro exitoso

    } else {
      // Mostrar notificación de error si el formulario no es válido
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
