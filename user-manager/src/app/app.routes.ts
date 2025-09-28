import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

import { noAuthGuard } from './auth/guards/no-auth-guard';
import { HomePageComponent } from './pages/home-page/home-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomePageComponent,
    // Aquí podrías agregar un guard para solo autenticados si lo deseas
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
