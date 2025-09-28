import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'login',
  standalone: true,
  imports: [RouterModule, RouterOutlet],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private router = inject(Router); // Inyecto el servicio Router para manejar la navegación

  // Getter para verificar si la ruta actual incluye '/register'
  get isRegisterRoute(): boolean {
    return this.router.url.includes('/register');
  }

  // Método para navegar a la ruta de registro
  navigateToRegister() {
    this.router.navigate(['login/register']);
  }
}
