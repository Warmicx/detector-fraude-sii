import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

type QuickLink = { title: string; description: string; path: string };
type Highlight = { title: string; detail: string; path: string };
type NewsItem = { title: string; date: string; path: string };
type Kpi = { label: string; value: string; trend: string };

type Notice = { title: string; description: string };

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, RouterLink],
  template: `
    <section class="hero">
      <div class="container hero__inner">
        <div class="hero__content">
          <h1>Monitor de riesgo tributario</h1>
          <p>
            Visualiza indicadores clave, consulta contribuyentes con mayor riesgo y accede a reportes estratégicos para priorizar tu gestión.
          </p>
          <div class="hero__actions">
            <a routerLink="/busqueda" class="btn btn-primary">Ir a búsqueda</a>
            <a routerLink="/reportes" class="btn btn-ghost">Ver reportes</a>
          </div>
          <div class="hero__notices" aria-label="Avisos relevantes">
            <article *ngFor="let notice of notices" class="hero__notice">
              <h3>{{ notice.title }}</h3>
              <p>{{ notice.description }}</p>
            </article>
          </div>
        </div>
        <div class="hero__kpis" aria-label="Indicadores principales">
          <div *ngFor="let kpi of kpis" class="hero__kpi card surface-muted">
            <span class="hero__kpi-label">{{ kpi.label }}</span>
            <strong class="hero__kpi-value">{{ kpi.value }}</strong>
            <span class="hero__kpi-trend">{{ kpi.trend }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="container access">
      <header class="section-header">
        <h2>Accesos rápidos</h2>
        <p>Encuentra las funcionalidades más consultadas por los equipos fiscalizadores.</p>
      </header>
      <div class="access__grid">
        <a *ngFor="let link of quickLinks" [routerLink]="link.path" class="access__tile">
          <div>
            <h3>{{ link.title }}</h3>
            <p>{{ link.description }}</p>
          </div>
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>

    <section class="container focus">
      <div class="focus__column">
        <header class="section-header">
          <h2>Destacados</h2>
        </header>
        <ul class="focus__list">
          <li *ngFor="let item of highlights">
            <a [routerLink]="item.path">
              <span class="focus__title">{{ item.title }}</span>
              <span class="focus__detail">{{ item.detail }}</span>
            </a>
          </li>
        </ul>
      </div>
      <div class="focus__column">
        <header class="section-header">
          <h2>Noticias</h2>
        </header>
        <ul class="focus__list">
          <li *ngFor="let news of newsItems">
            <a [routerLink]="news.path">
              <span class="focus__title">{{ news.title }}</span>
              <span class="focus__detail">Actualizado {{ news.date }}</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
        padding-bottom: 64px;
      }

      .hero {
        background: linear-gradient(130deg, rgba(11, 58, 120, 0.96) 0%, rgba(12, 91, 191, 0.9) 100%);
        color: #fff;
        padding: 64px 0 72px;
        position: relative;
        overflow: hidden;
      }

      .hero::after {
        content: '';
        position: absolute;
        inset: 0;
        background: radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.12), transparent 55%),
          radial-gradient(circle at 80% 30%, rgba(255, 255, 255, 0.18), transparent 60%);
        pointer-events: none;
      }

      .hero__inner {
        position: relative;
        display: grid;
        gap: 32px;
        align-items: stretch;
        z-index: 1;
      }

      @media (min-width: 900px) {
        .hero__inner {
          grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
        }
      }

      .hero__content h1 {
        font-size: clamp(2rem, 4vw, 3rem);
        margin-bottom: 12px;
      }

      .hero__content p {
        max-width: 520px;
        font-size: 1.05rem;
        margin-bottom: 24px;
      }

      .hero__actions {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        margin-bottom: 32px;
      }

      .hero__notices {
        display: grid;
        gap: 12px;
      }

      .hero__notice {
        padding: 16px;
        border-radius: var(--radius);
        background: rgba(255, 255, 255, 0.12);
        backdrop-filter: blur(6px);
      }

      .hero__notice h3 {
        margin: 0 0 6px;
        font-size: 16px;
      }

      .hero__notice p {
        margin: 0;
        font-size: 14px;
      }

      .hero__kpis {
        display: grid;
        gap: 16px;
      }

      .hero__kpi {
        color: var(--text);
        backdrop-filter: blur(10px);
      }

      .hero__kpi-label {
        font-size: 12px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: rgba(24, 34, 48, 0.7);
      }

      .hero__kpi-value {
        display: block;
        margin: 12px 0 6px;
        font-size: 32px;
      }

      .hero__kpi-trend {
        font-size: 13px;
        color: rgba(24, 34, 48, 0.7);
      }

      .section-header h2 {
        margin-bottom: 8px;
        font-size: 24px;
        color: var(--color-primary);
      }

      .section-header p {
        margin: 0 0 24px;
        color: #4f5d73;
        max-width: 620px;
      }

      .access {
        margin-top: -40px;
      }

      .access__grid {
        display: grid;
        gap: 18px;
      }

      @media (min-width: 700px) {
        .access__grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }

      @media (min-width: 1100px) {
        .access__grid {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }
      }

      .access__tile {
        background: var(--color-surface);
        border-radius: var(--radius);
        padding: 24px;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-between;
        gap: 24px;
        text-decoration: none;
        color: inherit;
        border: 1px solid transparent;
        transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
      }

      .access__tile h3 {
        margin: 0 0 8px;
        font-size: 18px;
      }

      .access__tile p {
        margin: 0;
        color: #5b6a80;
        font-size: 14px;
      }

      .access__tile span {
        font-size: 24px;
        line-height: 1;
        color: var(--color-secondary);
      }

      .access__tile:hover,
      .access__tile:focus-visible {
        transform: translateY(-4px);
        border-color: var(--color-secondary);
        box-shadow: var(--shadow);
      }

      .focus {
        margin-top: 56px;
        display: grid;
        gap: 32px;
      }

      @media (min-width: 900px) {
        .focus {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }

      .focus__column {
        background: var(--color-surface);
        border-radius: var(--radius);
        padding: 28px;
        border: 1px solid var(--ring);
        box-shadow: 0 18px 40px rgba(15, 41, 72, 0.08);
      }

      .focus__list {
        list-style: none;
        display: grid;
        gap: 18px;
      }

      .focus__list li {
        padding-bottom: 18px;
        border-bottom: 1px solid var(--muted);
      }

      .focus__list li:last-child {
        border-bottom: none;
        padding-bottom: 0;
      }

      .focus__list a {
        text-decoration: none;
        color: inherit;
        display: grid;
        gap: 4px;
      }

      .focus__title {
        font-weight: 600;
        font-size: 16px;
      }

      .focus__detail {
        color: #5b6a80;
        font-size: 14px;
      }
    `,
  ],
})
export class HomeComponent {
  notices: Notice[] = [
    {
      title: 'Nueva versión del score institucional',
      description: 'Se actualizó el modelo predictivo incorporando factores macroeconómicos del trimestre.',
    },
    {
      title: 'Agenda de fiscalización',
      description: 'Los equipos regionales deben cargar observaciones antes del viernes 17 a las 18:00 hrs.',
    },
  ];

  kpis: Kpi[] = [
    { label: 'Contribuyentes monitoreados', value: '18.240', trend: '+6,2% vs mes anterior' },
    { label: 'Casos críticos activos', value: '124', trend: '18 casos nuevos esta semana' },
    { label: 'Alertas gestionadas', value: '92%', trend: 'Cierre promedio 3,4 días' },
  ];

  quickLinks: QuickLink[] = [
    {
      title: 'Búsqueda de contribuyentes',
      description: 'Consulta por RUT o razón social y navega al detalle completo.',
      path: '/busqueda',
    },
    {
      title: 'Detalle contribuyente',
      description: 'Revisa score, reglas activadas y actividad reciente del contribuyente.',
      path: '/contribuyente/11111111-1',
    },
    {
      title: 'Alertas priorizadas',
      description: 'Filtra alertas por severidad y asigna responsables rápidamente.',
      path: '/alertas',
    },
    {
      title: 'Reportes ejecutivos',
      description: 'Visualiza indicadores agregados y descarga información de seguimiento.',
      path: '/reportes',
    },
    {
      title: 'Centro de ayuda',
      description: 'Accede a orientaciones, glosarios y preguntas frecuentes.',
      path: '/ayuda',
    },
  ];

  highlights: Highlight[] = [
    {
      title: 'Ranking de riesgo por actividades económicas',
      detail: 'Revisa la priorización semanal de sectores con mayor concentración de alertas.',
      path: '/reportes',
    },
    {
      title: 'Casos con revisión conjunta SII - Aduanas',
      detail: 'Listado de contribuyentes en seguimiento coordinado interinstitucional.',
      path: '/alertas',
    },
    {
      title: 'Checklist de documentación requerida',
      detail: 'Orientación para solicitudes de antecedentes a contribuyentes críticos.',
      path: '/ayuda',
    },
  ];

  newsItems: NewsItem[] = [
    { title: 'Se incorpora información de facturación electrónica diaria', date: '12 de marzo', path: '/reportes' },
    { title: 'Nueva guía para interpretar el score de riesgo operativo', date: '7 de marzo', path: '/ayuda' },
    { title: 'Actualización de parámetros de alertas por giro transporte', date: '2 de marzo', path: '/alertas' },
  ];
}
