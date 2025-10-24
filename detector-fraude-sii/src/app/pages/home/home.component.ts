import { Component } from '@angular/core';
import { NgFor, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

type QuickLink = { title: string; path: string; icon?: string };
type Highlight = { title: string; path: string };
type News = { title: string; path: string };

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, RouterLink, NgOptimizedImage],
  template: `
    <section class="hero">
      <div class="container hero-grid">
        <div class="hero-copy">
          <h1>Prioriza fiscalizaciones con datos</h1>
          <p>
            Consulta el score de riesgo, revisa reglas activadas y genera
            reportes.
          </p>
          <div class="cta">
            <a routerLink="/busqueda" class="btn">Ir a Búsqueda</a>
            <a routerLink="/reportes" class="btn ghost">Ver Reportes</a>
          </div>
        </div>
        <div class="hero-panel">
          <div class="notice warn">
            ⚠️ Aviso: nuevas reglas de riesgo disponibles.
          </div>
          <div class="notice info">ℹ️ Guía rápida de uso y glosario.</div>
          <div class="kpis">
            <div class="kpi">
              <div class="kpi-num">1.248</div>
              <div class="kpi-label">Casos priorizados</div>
            </div>
            <div class="kpi">
              <div class="kpi-num">36%</div>
              <div class="kpi-label">Riesgo alto</div>
            </div>
            <div class="kpi">
              <div class="kpi-num">7d</div>
              <div class="kpi-label">Ventana análisis</div>
            </div>
          </div>
        </div>
      </div>
      <div class="hero-wave"></div>
    </section>

    <section class="container quick">
      <h2>Accesos rápidos</h2>
      <div class="grid">
        <a *ngFor="let l of quickLinks" [routerLink]="l.path" class="tile">
          <div class="tile-title">{{ l.title }}</div>
          <div class="tile-icon">→</div>
        </a>
      </div>
    </section>

    <section class="container highlights">
      <div class="row">
        <div class="col">
          <h3>Destacados</h3>
          <ul>
            <li *ngFor="let h of highlights">
              <a [routerLink]="h.path">{{ h.title }}</a>
            </li>
          </ul>
        </div>
        <div class="col">
          <h3>Noticias</h3>
          <ul>
            <li *ngFor="let n of news">
              <a [routerLink]="n.path">{{ n.title }}</a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 16px;
      }

      /* ---------- HERO ---------- */
      .hero {
        position: relative;
        color: #fff;
        background: radial-gradient(
            1200px 400px at 20% -20%,
            rgba(255, 255, 255, 0.08),
            transparent
          ),
          linear-gradient(
            120deg,
            var(--color-primary) 0%,
            #0b4a9f 50%,
            #0c5bbf 100%
          );
        padding: 40px 0 56px;
        overflow: hidden;
      }
      .hero-grid {
        display: grid;
        gap: 28px;
        grid-template-columns: 1.2fr 0.8fr;
        align-items: center;
      }
      .hero-copy h1 {
        margin: 0 0 8px;
        font-size: 36px;
        letter-spacing: 0.2px;
      }
      .hero-copy p {
        opacity: 0.95;
      }
      .cta {
        display: flex;
        gap: 12px;
        margin-top: 14px;
      }
      .btn {
        background: #fff;
        color: #0b3a78;
        padding: 10px 14px;
        border-radius: 10px;
        font-weight: 600;
        text-decoration: none;
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
      }
      .btn.ghost {
        background: transparent;
        color: #fff;
        border: 1px solid rgba(255, 255, 255, 0.6);
        box-shadow: none;
      }

      .hero-panel {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .notice {
        padding: 10px 12px;
        border-radius: 10px;
        backdrop-filter: blur(4px);
        background: rgba(255, 255, 255, 0.12);
      }
      .notice.warn {
        border: 1px solid rgba(255, 230, 0, 0.35);
      }
      .notice.info {
        border: 1px solid rgba(180, 210, 255, 0.35);
      }

      .kpis {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
        margin-top: 4px;
      }
      .kpi {
        background: rgba(255, 255, 255, 0.12);
        border: 1px solid rgba(255, 255, 255, 0.18);
        border-radius: 12px;
        padding: 12px;
      }
      .kpi-num {
        font-weight: 800;
        font-size: 22px;
        line-height: 1;
      }
      .kpi-label {
        opacity: 0.85;
        font-size: 12px;
      }

      .hero-wave {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: -1px;
        height: 40px;
        background: linear-gradient(
          to bottom,
          rgba(255, 255, 255, 0.2),
          transparent
        );
        opacity: 0.35;
      }

      /* ---------- QUICK ---------- */
      .quick h2 {
        margin: 24px 0 12px;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(5, minmax(0, 1fr));
        gap: 12px;
      }
      .tile {
        background: #fff;
        border: 1px solid #e6ecf5;
        border-radius: 12px;
        padding: 16px;
        text-decoration: none;
        color: #182230;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: transform 0.15s ease, box-shadow 0.15s ease,
          border-color 0.15s ease;
      }
      .tile:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 28px rgba(0, 0, 0, 0.07);
        border-color: #d9e2ef;
      }
      .tile-title {
        font-weight: 600;
      }
      .tile-icon {
        opacity: 0.5;
      }

      /* ---------- HIGHLIGHTS ---------- */
      .highlights .row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 24px;
        margin: 24px 0 40px;
      }
      .highlights h3 {
        margin-bottom: 8px;
      }
      .highlights ul {
        margin: 0;
        padding: 0;
        list-style: none;
      }
      .highlights li {
        padding: 10px 0;
        border-bottom: 1px dashed #e3e8f2;
      }
      .highlights a {
        text-decoration: none;
        color: #0b3a78;
      }

      @media (max-width: 900px) {
        .hero-grid {
          grid-template-columns: 1fr;
        }
        .grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
        .kpis {
          grid-template-columns: repeat(3, 1fr);
        }
        .highlights .row {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
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
    {
      title: 'Top 100 por score de riesgo (últimos 7 días)',
      path: '/reportes',
    },
  ];

  news: News[] = [
    {
      title: 'Actualización de métricas de modelo (MVP v1.1)',
      path: '/reportes',
    },
    { title: 'Guía de uso: filtros por período y segmento', path: '/ayuda' },
  ];
}
