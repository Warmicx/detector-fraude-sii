import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

type ResumenCard = {
  label: string;
  value: string;
  detail: string;
};

type Distribucion = {
  nivel: string;
  porcentaje: number;
};

type Evolucion = {
  semana: string;
  casos: number;
};

type TablaResumen = {
  periodo: string;
  casosAnalizados: number;
  alta: number;
  media: number;
  baja: number;
};

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [NgFor],
  template: `
    <section class="container reports">
      <header class="section-header">
        <h1>Reportes ejecutivos</h1>
        <p>Visualiza indicadores agregados del sistema de detección de fraude y analiza la evolución de los casos por nivel de riesgo.</p>
      </header>

      <div class="grid-3 reports__summary">
        <article *ngFor="let card of resumen" class="card reports__card">
          <span class="reports__label">{{ card.label }}</span>
          <strong class="reports__value">{{ card.value }}</strong>
          <span class="reports__detail">{{ card.detail }}</span>
        </article>
      </div>

      <div class="grid-2 reports__visuals">
        <section class="card reports__chart">
          <header class="card__header">
            <h2>Distribución por nivel</h2>
            <p>Porcentaje de contribuyentes según el último score calculado.</p>
          </header>
          <div class="bars" role="img" aria-label="Distribución de niveles">
            <div *ngFor="let item of distribucion" class="bars__item">
              <div class="bars__column" [style.--value]="item.porcentaje"></div>
              <span class="bars__label">{{ item.nivel }}</span>
              <span class="bars__value">{{ item.porcentaje }}%</span>
            </div>
          </div>
        </section>

        <section class="card reports__chart">
          <header class="card__header">
            <h2>Evolución semanal</h2>
            <p>Casos críticos ingresados en las últimas 6 semanas.</p>
          </header>
          <div class="line" role="img" aria-label="Evolución semanal de casos">
            <svg viewBox="0 0 260 140" preserveAspectRatio="none">
              <polyline
                [attr.points]="evolucionPoints"
                fill="none"
                stroke="url(#gradient)"
                stroke-width="4"
                stroke-linecap="round"
              ></polyline>
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#0b3a78" stop-opacity="0.2"></stop>
                  <stop offset="100%" stop-color="#0c5bbf" stop-opacity="0.9"></stop>
                </linearGradient>
              </defs>
            </svg>
            <div class="line__labels">
              <span *ngFor="let item of evolucion">{{ item.semana }}</span>
            </div>
          </div>
        </section>
      </div>

      <section class="card reports__table">
        <header class="card__header reports__table-header">
          <div>
            <h2>Resumen por período</h2>
            <p>Detalle de casos analizados, desglosados por nivel de riesgo declarado.</p>
          </div>
          <button type="button" class="btn btn-outline" disabled>Exportar CSV</button>
        </header>
        <div class="table-wrapper">
          <table class="table" aria-label="Resumen por período">
            <thead>
              <tr>
                <th scope="col">Período</th>
                <th scope="col">Casos analizados</th>
                <th scope="col">Alto</th>
                <th scope="col">Medio</th>
                <th scope="col">Bajo</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let fila of resumenTabla">
                <td>{{ fila.periodo }}</td>
                <td>{{ fila.casosAnalizados }}</td>
                <td>{{ fila.alta }}</td>
                <td>{{ fila.media }}</td>
                <td>{{ fila.baja }}</td>
              </tr>
            </tbody>
          </table>
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

      .reports h1 {
        font-size: 32px;
        margin-bottom: 12px;
        color: var(--color-primary);
      }

      .reports p {
        margin: 0 0 24px;
        color: #4f5d73;
        max-width: 680px;
      }

      .reports__card {
        display: grid;
        gap: 8px;
        text-align: left;
      }

      .reports__label {
        letter-spacing: 0.08em;
        text-transform: uppercase;
        font-size: 12px;
        color: #5b6a80;
      }

      .reports__value {
        font-size: 36px;
        color: var(--color-secondary);
      }

      .reports__detail {
        font-size: 14px;
        color: #4f5d73;
      }

      .reports__visuals {
        margin-top: 32px;
        align-items: stretch;
      }

      .reports__chart {
        display: flex;
        flex-direction: column;
      }

      .bars {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        gap: 16px;
        align-items: end;
      }

      .bars__item {
        display: grid;
        gap: 12px;
        justify-items: center;
      }

      .bars__column {
        width: 100%;
        height: 200px;
        border-radius: 12px 12px 4px 4px;
        background: linear-gradient(180deg, rgba(12, 91, 191, 0.9), rgba(11, 58, 120, 0.7));
        position: relative;
      }

      .bars__column::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: calc(var(--value) * 1%);
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.4), rgba(12, 91, 191, 0));
        border-radius: 12px 12px 0 0;
      }

      .bars__label {
        font-size: 14px;
        font-weight: 600;
        color: var(--color-primary);
      }

      .bars__value {
        font-size: 13px;
        color: #5b6a80;
      }

      .line {
        display: grid;
        gap: 16px;
      }

      svg {
        width: 100%;
        height: 140px;
        background: radial-gradient(circle at 10% 10%, rgba(12, 91, 191, 0.08), transparent 70%);
        border-radius: 16px;
      }

      .line__labels {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(40px, 1fr));
        font-size: 12px;
        color: #5b6a80;
        text-align: center;
      }

      .reports__table {
        margin-top: 32px;
      }

      .reports__table-header {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
      }

      .reports__table .table {
        margin-top: 12px;
      }
    `,
  ],
})
export class ReportesComponent {
  resumen: ResumenCard[] = [
    { label: 'Total casos analizados', value: '3.482', detail: '+12% vs mes anterior' },
    { label: 'Casos de riesgo alto', value: '428', detail: '35 casos cerrados esta semana' },
    { label: 'Resolución efectiva', value: '89%', detail: 'Promedio de cierre en 4,2 días' },
  ];

  distribucion: Distribucion[] = [
    { nivel: 'Alto', porcentaje: 28 },
    { nivel: 'Medio', porcentaje: 44 },
    { nivel: 'Bajo', porcentaje: 28 },
  ];

  evolucion: Evolucion[] = [
    { semana: 'Sem 1', casos: 48 },
    { semana: 'Sem 2', casos: 62 },
    { semana: 'Sem 3', casos: 55 },
    { semana: 'Sem 4', casos: 71 },
    { semana: 'Sem 5', casos: 64 },
    { semana: 'Sem 6', casos: 78 },
  ];

  resumenTabla: TablaResumen[] = [
    { periodo: 'Octubre 2023', casosAnalizados: 482, alta: 96, media: 226, baja: 160 },
    { periodo: 'Noviembre 2023', casosAnalizados: 515, alta: 102, media: 240, baja: 173 },
    { periodo: 'Diciembre 2023', casosAnalizados: 563, alta: 118, media: 258, baja: 187 },
    { periodo: 'Enero 2024', casosAnalizados: 602, alta: 134, media: 278, baja: 190 },
    { periodo: 'Febrero 2024', casosAnalizados: 574, alta: 112, media: 266, baja: 196 },
    { periodo: 'Marzo 2024', casosAnalizados: 746, alta: 166, media: 328, baja: 252 },
  ];

  get evolucionPoints(): string {
    const maxCasos = Math.max(...this.evolucion.map((item) => item.casos));
    return this.evolucion
      .map((item, index) => {
        const x = (index / (this.evolucion.length - 1)) * 260;
        const y = 130 - (item.casos / maxCasos) * 120;
        return `${x},${y}`;
      })
      .join(' ');
  }
}
