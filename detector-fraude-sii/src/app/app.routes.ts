import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'busqueda',
    loadComponent: () => import('./pages/busqueda/busqueda.component').then(m => m.BusquedaComponent)
  },
  {
    path: 'contribuyente/:rut',
    loadComponent: () => import('./pages/contribuyente/contribuyente.component').then(m => m.ContribuyenteComponent)
  },
  {
    path: 'alertas',
    loadComponent: () => import('./pages/alertas/alertas.component').then(m => m.AlertasComponent)
  },
  {
    path: 'reportes',
    loadComponent: () => import('./pages/reportes/reportes.component').then(m => m.ReportesComponent)
  },
  {
    path: 'ayuda',
    loadComponent: () => import('./pages/ayuda/ayuda.component').then(m => m.AyudaComponent)
  },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];
