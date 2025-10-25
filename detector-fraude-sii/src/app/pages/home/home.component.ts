import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

interface QuickLink {
  title: string;
  description: string;
  path: string;
}

interface HighlightItem {
  title: string;
  summary: string;
  path: string;
}

interface NoticeItem {
  title: string;
  description: string;
}

interface KpiItem {
  label: string;
  value: string;
  description: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, RouterLink],
  template: `
    <section class="hero">
      <div class="container hero__content">
        <div class="hero__text">
          <span class="hero__eyebrow">Monitor de riesgo tributario</span>
          <h1>Detector de Fraude SII</h1>
          <p>
            Prioriza la fiscalización con indicadores claros, reglas activadas y reportes
            listos para compartir con tu equipo.
          </p>
          <div class="hero__actions">
            <a routerLink="/busqueda" class="btn">Iniciar búsqueda</a>
            <a routerLink="/reportes" class="btn btn-ghost">Ver reportes</a>
          </div>
          <div class="hero__notices" role="list">
            <article class="notice" *ngFor="let notice of notices" role="listitem">
              <h3>{{ notice.title }}</h3>
              <p>{{ notice.description }}</p>
            </article>
          </div>
        </div>
        <aside class="hero__metrics" aria-label="Indicadores principales">
          <div class="kpi-grid">
            <div class="kpi-card" *ngFor="let kpi of kpis">
              <h4>{{ kpi.label }}</h4>
              <strong>{{ kpi.value }}</strong>
              <p>{{ kpi.description }}</p>
            </div>
          </div>
        </aside>
      </div>
    </section>

    <section class="container quick-links" aria-labelledby="accesos-title">
      <div class="section-heading">
        <h2 id="accesos-title">Accesos rápidos</h2>
        <p>Accede rápidamente a las vistas clave del monitoreo tributario.</p>
      </div>
      <div class="quick-links__grid" role="list">
        <a
          *ngFor="let link of quickLinks"
          [routerLink]="link.path"
          class="tile"
          role="listitem"
          attr.aria-label="{{ link.title }}"
        >
          <div class="tile__content">
            <h3>{{ link.title }}</h3>
            <p>{{ link.description }}</p>
          </div>
          <span class="tile__icon" aria-hidden="true">→</span>
        </a>
      </div>
    </section>

    <section class="container highlights" aria-labelledby="resumen-title">
      <div class="section-heading">
        <h2 id="resumen-title">Destacados recientes</h2>
      </div>
      <div class="highlights__grid">
        <div class="highlights__column" aria-labelledby="destacados-title">
          <h3 id="destacados-title">Destacados</h3>
          <ul>
            <li *ngFor="let item of highlights">
              <a [routerLink]="item.path">
                <span class="item-title">{{ item.title }}</span>
                <span class="item-summary">{{ item.summary }}</span>
              </a>
            </li>
          </ul>
        </div>
        <div class="highlights__column" aria-labelledby="noticias-title">
          <h3 id="noticias-title">Noticias</h3>
          <ul>
            <li *ngFor="let item of news">
              <a [routerLink]="item.path">
                <span class="item-title">{{ item.title }}</span>
                <span class="item-summary">{{ item.summary }}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  protected readonly notices: NoticeItem[] = [
    {
      title: 'Nueva versión de reglas 2024',
      description: 'Se incorporan 4 reglas para giros de servicios profesionales y exportadores.'
    },
    {
      title: 'Actualización del modelo semanal',
      description: 'La calibración del score considera datos hasta el cierre del último viernes.'
    }
  ];

  protected readonly kpis: KpiItem[] = [
    {
      label: 'Casos monitoreados',
      value: '12.480',
      description: 'Contribuyentes analizados en el período actual.'
    },
    {
      label: 'Alertas activas',
      value: '327',
      description: 'Reglas con seguimiento prioritario por equipos regionales.'
    },
    {
      label: 'Tiempo promedio',
      value: '2,4 días',
      description: 'Demora en revisar casos críticos luego de su detección.'
    }
  ];

  protected readonly quickLinks: QuickLink[] = [
    {
      title: 'Búsqueda de contribuyentes',
      description: 'Consulta por RUT y filtra por período o giro.',
      path: '/busqueda'
    },
    {
      title: 'Detalle del contribuyente',
      description: 'Analiza reglas activas y comportamiento histórico.',
      path: '/contribuyente/11111111-1'
    },
    {
      title: 'Panel de alertas',
      description: 'Supervisa señales críticas según severidad.',
      path: '/alertas'
    },
    {
      title: 'Reportes ejecutivos',
      description: 'Resumen por nivel de riesgo y evolución temporal.',
      path: '/reportes'
    },
    {
      title: 'Centro de ayuda',
      description: 'Revisa guías, glosario y preguntas frecuentes.',
      path: '/ayuda'
    }
  ];

  protected readonly highlights: HighlightItem[] = [
    {
      title: 'Segmento comercio minorista con tendencia al alza',
      summary: 'Los casos con score alto aumentaron 12% respecto a la semana anterior.',
      path: '/reportes'
    },
    {
      title: 'Checklist sugerido para revisiones exprés',
      summary: 'Incorpora verificaciones de cumplimiento y documentación cruzada.',
      path: '/ayuda'
    },
    {
      title: 'Prioriza contribuyentes con historial recurrente',
      summary: 'Se recomiendan 25 RUT con reincidencia en incumplimientos formales.',
      path: '/busqueda'
    }
  ];

  protected readonly news: HighlightItem[] = [
    {
      title: 'Informe semanal de score actualizado',
      summary: 'Disponible en el panel de reportes para revisión regional.',
      path: '/reportes'
    },
    {
      title: 'Nueva guía sobre interpretación de alertas',
      summary: 'Consulta buenas prácticas y definiciones clave del sistema.',
      path: '/ayuda'
    },
    {
      title: 'Capacitación virtual de fiscalización asistida',
      summary: 'Agenda sesiones para equipos zonales durante junio.',
      path: '/ayuda'
    }
  ];
}
