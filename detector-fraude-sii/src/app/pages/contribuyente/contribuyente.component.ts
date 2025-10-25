import { Component } from '@angular/core';
import { NgClass, NgFor } from '@angular/common';

interface Regla {
  tag: string;
  descripcion: string;
  categoria: 'Modelo' | 'Declaraciones' | 'Pagos';
}

interface Evento {
  fecha: string;
  detalle: string;
  tipo: 'Gestión' | 'Alerta' | 'Actualización';
}

interface Historico {
  periodo: string;
  valor: number;
}

@Component({
  selector: 'app-contribuyente',
  standalone: true,
  imports: [NgFor, NgClass],
  template: `
    <section class="container profile">
      <header class="profile__header">
        <div>
          <p class="profile__rut">RUT {{ resumen.rut }}</p>
          <h1>{{ resumen.razonSocial }}</h1>
          <p class="profile__meta">{{ resumen.giro }} · {{ resumen.comuna }}</p>
        </div>
        <div class="profile__score">
          <span class="profile__score-label">Score</span>
          <span class="profile__score-value">{{ resumen.score }}</span>
          <span class="badge" [ngClass]="nivelBadge">{{ resumen.nivel }}</span>
        </div>
      </header>

      <div class="grid-2 profile__grid">
        <section class="card">
          <header class="card__header">
            <h2>Reglas activadas</h2>
            <p>Factores que incrementan el score de riesgo actual.</p>
          </header>
          <div class="pill-group">
            <span *ngFor="let regla of reglas" class="pill">{{ regla.tag }}</span>
          </div>
          <ul class="profile__rules">
            <li *ngFor="let regla of reglas">
              <h3>{{ regla.tag }}</h3>
              <p>{{ regla.descripcion }}</p>
              <span class="profile__rule-category">{{ regla.categoria }}</span>
            </li>
          </ul>
        </section>

        <section class="card">
          <header class="card__header">
            <h2>Actividad reciente</h2>
            <p>Eventos registrados en los últimos 30 días.</p>
          </header>
          <ol class="timeline" aria-label="Línea de tiempo de actividad">
            <li *ngFor="let evento of actividad" class="timeline-item">
              <p class="timeline__date">{{ evento.fecha }}</p>
              <p class="timeline__detail">{{ evento.detalle }}</p>
              <span class="timeline__type">{{ evento.tipo }}</span>
            </li>
          </ol>
        </section>
      </div>

      <section class="card profile__historico">
        <header class="card__header">
          <h2>Histórico de score</h2>
          <p>Comportamiento de los últimos 6 períodos reportados.</p>
        </header>
        <div class="chart" role="img" aria-label="Histórico de score del contribuyente">
          <div *ngFor="let item of historico" class="chart__bar" [style.--value]="item.valor">
            <span class="chart__label">{{ item.periodo }}</span>
            <span class="chart__value">{{ item.valor }}</span>
          </div>
        </div>
      </section>
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
        padding: 48px 0 72px;
      }

      .profile__header {
        background: var(--color-surface);
        border-radius: var(--radius);
        padding: 32px;
        border: 1px solid var(--ring);
        box-shadow: 0 16px 40px rgba(15, 41, 72, 0.08);
        display: flex;
        flex-direction: column;
        gap: 24px;
        margin-bottom: 32px;
      }

      @media (min-width: 900px) {
        .profile__header {
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
        }
      }

      .profile__rut {
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: #5b6a80;
        font-size: 12px;
        margin: 0 0 8px;
      }

      .profile__header h1 {
        margin: 0;
        font-size: clamp(2rem, 3vw, 2.8rem);
        color: var(--color-primary);
      }

      .profile__meta {
        margin: 12px 0 0;
        color: #4f5d73;
        font-size: 15px;
      }

      .profile__score {
        text-align: center;
        display: grid;
        gap: 6px;
      }

      .profile__score-label {
        letter-spacing: 0.08em;
        font-size: 12px;
        text-transform: uppercase;
        color: #5b6a80;
      }

      .profile__score-value {
        font-size: 48px;
        font-weight: 700;
        color: var(--color-secondary);
      }

      .profile__grid {
        margin-bottom: 32px;
      }

      .card__header h2 {
        margin: 0;
        font-size: 20px;
        color: var(--color-primary);
      }

      .card__header p {
        margin: 8px 0 24px;
        color: #4f5d73;
        font-size: 14px;
      }

      .profile__rules {
        list-style: none;
        margin: 24px 0 0;
        padding: 0;
        display: grid;
        gap: 16px;
      }

      .profile__rules li {
        border-top: 1px solid var(--muted);
        padding-top: 16px;
      }

      .profile__rules h3 {
        margin: 0 0 8px;
        font-size: 16px;
      }

      .profile__rules p {
        margin: 0 0 8px;
        color: #4f5d73;
      }

      .profile__rule-category {
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: #8a96a8;
      }

      .timeline {
        margin: 0;
      }

      .timeline__date {
        margin: 0 0 6px;
        font-weight: 600;
        color: var(--color-primary);
      }

      .timeline__detail {
        margin: 0 0 4px;
        color: #4f5d73;
        font-size: 14px;
      }

      .timeline__type {
        font-size: 12px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: #8a96a8;
      }

      .profile__historico {
        margin-top: 24px;
      }

      .chart {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
        gap: 16px;
        align-items: end;
        margin-top: 12px;
      }

      .chart__bar {
        position: relative;
        background: rgba(12, 91, 191, 0.08);
        border-radius: 12px;
        padding: 0 16px 16px;
        overflow: hidden;
        min-height: 180px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        gap: 8px;
      }

      .chart__bar::before {
        content: '';
        position: absolute;
        left: 16px;
        right: 16px;
        bottom: 56px;
        height: calc((var(--value) / 10) * 1%);
        min-height: 24px;
        max-height: calc(100% - 72px);
        background: linear-gradient(180deg, rgba(12, 91, 191, 0.85), rgba(11, 58, 120, 0.95));
        border-radius: 12px 12px 0 0;
      }

      .chart__label {
        font-size: 12px;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: #5b6a80;
      }

      .chart__value {
        font-size: 18px;
        font-weight: 700;
        color: var(--color-primary);
      }
    `,
  ],
})
export class ContribuyenteComponent {
  resumen = {
    rut: '11.111.111-1',
    razonSocial: 'Comercial Andina Ltda.',
    giro: 'Comercio al por menor',
    comuna: 'Santiago Centro',
    score: '872',
    nivel: 'ALTO',
  };

  get nivelBadge(): Record<string, boolean> {
    return {
      'badge-high': this.resumen.nivel === 'ALTO',
      'badge-mid': this.resumen.nivel === 'MEDIO',
      'badge-low': this.resumen.nivel === 'BAJO',
    };
  }

  reglas: Regla[] = [
    {
      tag: 'Pagos desfasados',
      descripcion: 'Acumulación de tres declaraciones de IVA con pagos fuera de plazo en los últimos 12 meses.',
      categoria: 'Pagos',
    },
    {
      tag: 'Ventas atípicas',
      descripcion: 'Variación del 65% en las ventas declaradas respecto al promedio del segmento.',
      categoria: 'Declaraciones',
    },
    {
      tag: 'Modelo riesgo sectorial',
      descripcion: 'Score sectorial en percentil 90 para giro comercio minorista.',
      categoria: 'Modelo',
    },
    {
      tag: 'Notas de crédito elevadas',
      descripcion: 'Incremento de 40% en notas de crédito emitidas respecto al trimestre anterior.',
      categoria: 'Declaraciones',
    },
  ];

  actividad: Evento[] = [
    {
      fecha: '14 marzo 2024',
      detalle: 'Analista regional revisa documentación y emite comentario en expediente digital.',
      tipo: 'Gestión',
    },
    {
      fecha: '11 marzo 2024',
      detalle: 'Alerta automática por inconsistencias en boletas electrónicas.',
      tipo: 'Alerta',
    },
    {
      fecha: '8 marzo 2024',
      detalle: 'Se adjuntan registros bancarios en carpeta compartida.',
      tipo: 'Actualización',
    },
    {
      fecha: '4 marzo 2024',
      detalle: 'Asignación del caso a equipo de fiscalización sector comercio.',
      tipo: 'Gestión',
    },
  ];

  historico: Historico[] = [
    { periodo: 'Oct', valor: 540 },
    { periodo: 'Nov', valor: 610 },
    { periodo: 'Dic', valor: 690 },
    { periodo: 'Ene', valor: 730 },
    { periodo: 'Feb', valor: 820 },
    { periodo: 'Mar', valor: 872 },
  ];
}
