import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  template: `
    <header class="topbar">
      <div class="container">
        <div class="brand" routerLink="/">DF-SII</div>

        <nav class="nav">
          <a routerLink="/" class="link">Inicio</a>

          <div class="dropdown">
            <button class="link">Servicios</button>
            <div class="menu">
              <a routerLink="/busqueda">Búsqueda</a>
              <a routerLink="/contribuyente/11111111-1">Detalle Contribuyente</a>
              <a routerLink="/alertas">Alertas y Reglas</a>
              <a routerLink="/reportes">Reportes</a>
            </div>
          </div>

          <a routerLink="/ayuda" class="link">Ayuda</a>
        </nav>
      </div>
    </header>
  `,
  styles: [`
    .topbar { background: var(--color-primary); color: #fff; }
    .container {
      max-width: 1200px; margin: 0 auto; padding: 0 16px;
      height: 56px; display: flex; align-items: center; justify-content: space-between;
    }
    .brand { font-weight: 700; letter-spacing: .5px; cursor: pointer; }
    .nav { display: flex; align-items: center; gap: 16px; position: relative; }
    .link { color: #fff; text-decoration: none; font-weight: 500; }
    .dropdown { position: relative; }
    .dropdown .menu {
      display: none; position: absolute; top: 120%; left: 0;
      background: #fff; color: #222; border-radius: 8px; box-shadow: 0 8px 24px rgba(0,0,0,.12);
      min-width: 260px; padding: 8px; z-index: 10;
    }
    .dropdown:hover .menu { display: grid; }
    .menu a { padding: 10px 12px; border-radius: 6px; text-decoration: none; color: #222; }
    .menu a:hover { background: #f2f5f9; }
  `]
})
export class HeaderComponent {}
