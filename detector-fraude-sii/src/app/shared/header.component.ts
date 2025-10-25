import { Component, HostListener } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass],
  template: `
    <header class="topbar">
      <div class="container topbar__inner">
        <a routerLink="/" class="brand" aria-label="Ir al inicio">SIPAT</a>
        <nav class="nav" aria-label="Navegación principal">
          <a routerLink="/" routerLinkActive="active" class="nav__link">Inicio</a>
          <div class="nav__group" [ngClass]="{ 'nav__group--open': servicesOpen }">
            <button
              type="button"
              class="nav__link nav__trigger"
              aria-haspopup="true"
              [attr.aria-expanded]="servicesOpen"
              (focus)="servicesOpen = true"
              (mouseenter)="servicesOpen = true"
            >
              Servicios
              <span class="nav__caret" aria-hidden="true">▾</span>
            </button>
            <div class="nav__menu" role="menu">
              <a routerLink="/busqueda" class="nav__menu-link" role="menuitem">Búsqueda</a>
              <a routerLink="/contribuyente/11111111-1" class="nav__menu-link" role="menuitem">Detalle contribuyente</a>
              <a routerLink="/alertas" class="nav__menu-link" role="menuitem">Alertas</a>
              <a routerLink="/reportes" class="nav__menu-link" role="menuitem">Reportes</a>
            </div>
          </div>
          <a routerLink="/ayuda" routerLinkActive="active" class="nav__link">Ayuda</a>
        </nav>
      </div>
    </header>
  `,
  styles: [`
    :host { display: block; }
    .topbar {
      background: var(--color-primary);
      color: #fff;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    .topbar__inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
      min-height: 64px;
    }
    .brand {
      font-weight: 700;
      font-size: 1.1rem;
      letter-spacing: 0.08em;
      text-decoration: none;
      color: #fff;
    }
    .nav {
      display: flex;
      align-items: center;
      gap: 16px;
      position: relative;
    }
    .nav__link {
      color: #f7fbff;
      text-decoration: none;
      font-weight: 500;
      padding: 6px 10px;
      border-radius: 999px;
      transition: background 0.2s ease, color 0.2s ease;
    }
    .nav__link:focus-visible {
      outline: 2px solid #fff;
      outline-offset: 2px;
    }
    .nav__link:hover,
    .nav__link.active {
      background: var(--color-highlight);
      color: #fff;
    }
    .nav__group {
      position: relative;
    }
    .nav__trigger {
      background: transparent;
      border: 0;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      cursor: pointer;
      font: inherit;
    }
    .nav__caret {
      font-size: 0.75rem;
      opacity: 0.8;
    }
    .nav__menu {
      position: absolute;
      left: 0;
      top: calc(100% + 12px);
      background: #fff;
      color: var(--text);
      border-radius: 12px;
      box-shadow: 0 20px 40px rgba(12, 31, 55, 0.15);
      padding: 12px;
      width: 220px;
      display: none;
      z-index: 20;
    }
    .nav__group:hover .nav__menu,
    .nav__group:focus-within .nav__menu,
    .nav__group--open .nav__menu {
      display: grid;
      gap: 4px;
    }
    .nav__menu-link {
      padding: 8px 10px;
      border-radius: 8px;
      color: inherit;
      text-decoration: none;
      font-weight: 500;
    }
    .nav__menu-link:hover,
    .nav__menu-link:focus-visible {
      background: var(--muted);
      color: var(--color-primary);
      outline: none;
    }
    @media (max-width: 768px) {
      .topbar__inner {
        flex-wrap: wrap;
        justify-content: center;
      }
      .nav {
        flex-wrap: wrap;
        justify-content: center;
      }
    }
  `],
})
export class HeaderComponent {
  servicesOpen = false;

  @HostListener('mouseleave')
  closeMenu(): void {
    this.servicesOpen = false;
  }
}
