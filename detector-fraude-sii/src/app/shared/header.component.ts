import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="topbar" role="banner">
      <div class="container topbar__content">
        <a routerLink="/" class="brand" aria-label="Ir al inicio">DF-SII</a>
        <nav class="nav" aria-label="Navegación principal">
          <a routerLink="/" routerLinkActive="is-active" class="nav__link">Inicio</a>
          <div class="nav__group">
            <button type="button" class="nav__link nav__trigger" aria-haspopup="true" aria-expanded="false">
              Servicios
            </button>
            <div class="nav__menu" role="menu">
              <a routerLink="/busqueda" class="nav__menu-link" role="menuitem">Búsqueda</a>
              <a routerLink="/contribuyente/11111111-1" class="nav__menu-link" role="menuitem">Detalle contribuyente</a>
              <a routerLink="/alertas" class="nav__menu-link" role="menuitem">Alertas</a>
              <a routerLink="/reportes" class="nav__menu-link" role="menuitem">Reportes</a>
            </div>
          </div>
          <a routerLink="/ayuda" routerLinkActive="is-active" class="nav__link">Ayuda</a>
        </nav>
      </div>
    </header>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {}
