import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  userName: string | null = null;

  constructor(private authService: AuthService, private router: Router) {
    // Intentar obtener el nombre del usuario del localStorage
    const name = localStorage.getItem('userName');
    this.userName = name;
  }

  logout() {
    this.authService.logout();
    localStorage.removeItem('userName');
    this.router.navigate(['/login']);
  }
}
