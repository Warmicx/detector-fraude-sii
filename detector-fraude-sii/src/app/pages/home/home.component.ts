import { Component } from '@angular/core';
import { NgFor, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from "src/app/shared/header.component";
import { FooterComponent } from "src/app/shared/footer.component";

type QuickLink = { title: string; path: string; icon?: string; };
type Highlight = { title: string; path: string; };
type News = { title: string; path: string; };

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, RouterLink, NgOptimizedImage, HeaderComponent, FooterComponent],
  template: `
  <app-header></app-header>

  <section class="hero">
    <div class="container">
      <div class="hero-text">
        <h1>Prioriza fiscalizaciones con datos</h1>
        <p>Consulta el score de riesgo, revisa reglas activadas y genera reportes.</p>
        <div class="cta">
          <a routerLink="/busqueda" class="btn">Ir a Búsqueda</a>
          <a routerLink="/reportes" class="btn ghost">Ver Reportes</a>
        </div>
      </div>
      <div class="hero-aside">
        <!-- espacio para carrusel/avisos -->
        <div class="notice">⚠️ Aviso: nuevas reglas de riesgo disponibles.</div>
        <div class="notice">ℹ️ Guía rápida de uso y glosario.</div>
      </div>
    </div>
  </section>

  <section class="quick container">
    <h2>Accesos rápidos</h2>
    <div class="grid">
      <a *ngFor="let l of quickLinks" [routerLink]="l.path" class="tile">
        <div class="tile-title">{{ l.title }}</div>
        <div class="tile-icon">➜</div>
      </a>
    </div>
  </section>

  <section class="container highlights">
    <div class="row">
      <div class="col">
        <h3>Destacados</h3>
        <ul>
          <li *ngFor="let h of highlights"><a [routerLink]="h.path">{{ h.title }}</a></li>
        </ul>
      </div>
      <div class="col">
        <h3>Noticias</h3>
        <ul>
          <li *ngFor="let n of news"><a [routerLink]="n.path">{{ n.title }}</a></li>
        </ul>
      </div>
    </div>
  </section>

  <app-footer></app-footer>
  `,
  styles: [`
    :host { display: block; }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 16px; }
    .hero {
      background: linear-gradient(120deg, var(--color-primary) 0%, #0b4a9f 50%, #0c5bbf 100%);
      color: #fff; padding: 32px 0;
    }
    .hero .container { display: grid; grid-template-columns: 1.4fr .8fr; gap: 24px; align-items: center; }
    .hero h1 { margin: 0 0 8px; font-size: 32px; }
    .cta { display: flex; gap: 12px; margin-top: 12px; }
    .btn { background: #fff; color: #0b3a78; padding: 10px 14px; border-radius: 8px; font-weight: 600; text-decoration: none; }
    .btn.ghost { background: transparent; color: #fff; border: 1px solid rgba(255,255,255,.6); }
    .hero-aside .notice {
      background: rgba(255,255,255,.12); padding: 10px 12px; border-radius: 8px; margin-bottom: 8px; backdrop-filter: blur(4px);
    }

    .quick h2 { margin: 24px 0 12px; }
    .grid {
      display: grid; grid-template-columns: repeat(5, minmax(0,1fr)); gap: 12px;
    }
    .tile {
      background: #fff; border: 1px solid #e6ecf5; border-radius: 12px; padding: 16px;
      text-decoration: none; color: #182230; display: flex; justify-content: space-between; align-items: center;
      transition: transform .15s ease, box-shadow .15s ease;
    }
    .tile:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(0,0,0,.06); }
    .tile-title { font-weight: 600; }
    .tile-icon { opacity: .5; }

    .highlights .row { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin: 24px 0 32px; }
    .highlights h3 { margin-bottom: 8px; }
    .highlights ul { margin: 0; padding: 0; list-style: none; }
    .highlights li { padding: 8px 0; border-bottom: 1px dashed #e3e8f2; }
    .highlights a { text-decoration: none; color: #0b3a78; }

    @media (max-width: 900px) {
      .hero .container { grid-template-columns: 1fr; }
      .grid { grid-template-columns: repeat(2, minmax(0,1fr)); }
      .highlights .row { grid-template-columns: 1fr; }
    }
  `]
})
export class HomeComponent {
  quickLinks: QuickLink[] = [
    { title: 'Búsqueda de contribuyentes', path: '/busqueda' },
    { title: 'Detalle contribuyente', path: '/contribuyente/11111111-1' },
    { title: 'Alertas y reglas', path: '/alertas' },
    { title: 'Reportes', path: '/reportes' },
    { title: 'Ayuda', path: '/ayuda' },
  ];

  highlights: Highlight[] = [
    { title: 'Reglas nuevas para giro Comercio Minorista', path: '/alertas' },
    { title: 'Top 100 por score de riesgo (últimos 7 días)', path: '/reportes' },
  ];

  news: News[] = [
    { title: 'Actualización de métricas de modelo (MVP v1.1)', path: '/reportes' },
    { title: 'Guía de uso: filtros por período y segmento', path: '/ayuda' },
  ];
}
