import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { noAuthGuard } from './guards/no-auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [noAuthGuard], // Aquí protege tanto a login como a sus rutas hijas,
    // quien está logueado no podrá acceder a ninguna de ellas
    children: [
      {
        path: 'register',
        loadComponent: () =>
          import('./auth/register/register.component').then((m) => m.RegisterComponent),
      },
    ],
  },
];
