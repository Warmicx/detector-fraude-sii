import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="topbar">
      <div class="container topbar__inner">
        <a routerLink="/" class="brand" aria-label="Ir al inicio">DF-SII</a>
        <nav class="nav" aria-label="Navegación principal">
          <a routerLink="/" routerLinkActive="is-active" [routerLinkActiveOptions]="{ exact: true }" class="nav__link">Inicio</a>
          <div class="nav__group" (mouseenter)="openDropdown()" (mouseleave)="closeDropdown()">
            <button class="nav__link nav__trigger" type="button" aria-haspopup="true" [attr.aria-expanded]="dropdownOpen" (focusin)="openDropdown()">
              Servicios
            </button>
            <div class="nav__menu" [class.is-open]="dropdownOpen">
              <a routerLink="/busqueda" class="nav__menu-item">Búsqueda</a>
              <a routerLink="/contribuyente/11111111-1" class="nav__menu-item">Detalle contribuyente</a>
              <a routerLink="/alertas" class="nav__menu-item">Alertas</a>
              <a routerLink="/reportes" class="nav__menu-item">Reportes</a>
            </div>
          </div>
          <a routerLink="/ayuda" class="nav__link">Ayuda</a>
        </nav>
      </div>
    </header>
  `,
  styles: [
    `
      .topbar {
        background: var(--color-primary);
        color: #fff;
        border-bottom: 1px solid rgba(255, 255, 255, 0.12);
      }

      .topbar__inner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 70px;
      }

      .brand {
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        text-decoration: none;
        color: #fff;
        font-size: 20px;
      }

      .nav {
        display: flex;
        align-items: center;
        gap: 20px;
      }

      .nav__link {
        position: relative;
        text-decoration: none;
        color: #f4f8ff;
        font-weight: 600;
        padding: 6px 0;
      }

      .nav__link::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: -8px;
        width: 100%;
        height: 3px;
        background: transparent;
        border-radius: 999px;
        transition: background 0.2s ease;
      }

      .nav__link:hover::after,
      .nav__link:focus-visible::after,
      .nav__link.is-active::after {
        background: rgba(255, 255, 255, 0.9);
      }

      .nav__group {
        position: relative;
      }

      .nav__trigger {
        background: none;
        border: none;
        font: inherit;
        color: inherit;
        cursor: pointer;
      }

      .nav__trigger::after {
        content: '▾';
        margin-left: 6px;
        font-size: 12px;
      }

      .nav__menu {
        position: absolute;
        top: calc(100% + 16px);
        left: 0;
        min-width: 240px;
        background: #fff;
        color: var(--text);
        border-radius: var(--radius);
        box-shadow: var(--shadow);
        padding: 12px;
        display: none;
        z-index: 20;
      }

      .nav__menu.is-open {
        display: grid;
        gap: 4px;
      }

      .nav__menu-item {
        text-decoration: none;
        color: var(--text);
        padding: 10px 12px;
        border-radius: 8px;
        font-weight: 600;
      }

      .nav__menu-item:hover,
      .nav__menu-item:focus-visible {
        background: rgba(12, 91, 191, 0.08);
        color: var(--color-primary);
      }

      @media (max-width: 900px) {
        .nav {
          gap: 12px;
          font-size: 14px;
        }
      }
    `,
  ],
})
export class HeaderComponent {
  dropdownOpen = false;

  @HostListener('document:keydown.escape')
  closeDropdown(): void {
    this.dropdownOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.nav__group')) {
      this.dropdownOpen = false;
    }
  }

  openDropdown(): void {
    this.dropdownOpen = true;
  }
}
