import { Component } from '@angular/core';
import { NgClass, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

type Severidad = 'BAJA' | 'MEDIA' | 'ALTA';

type Alerta = {
  rut: string;
  razonSocial: string;
  severidad: Severidad;
  estado: 'Pendiente' | 'En curso' | 'Cerrada';
  fecha: string;
  regla: string;
};

@Component({
  selector: 'app-alertas',
  standalone: true,
  imports: [NgFor, NgClass, RouterLink],
  template: `
    <section class="container alerts">
      <header class="section-header">
        <h1>Alertas y seguimiento</h1>
        <p>Gestiona las alertas priorizadas según su severidad y estado. Usa los filtros visuales para enfocar la revisión.</p>
      </header>

      <div class="alerts__filters card" aria-label="Filtros de alertas">
        <div class="filters__group">
          <span class="filters__label">Estado</span>
          <div class="chip-group">
            <button type="button" class="chip" disabled>Todos</button>
            <button type="button" class="chip" disabled>Pendiente</button>
            <button type="button" class="chip" disabled>En curso</button>
            <button type="button" class="chip" disabled>Cerrada</button>
          </div>
        </div>
        <div class="filters__group">
          <span class="filters__label">Severidad</span>
          <div class="chip-group">
            <button type="button" class="chip chip--low" disabled>Baja</button>
            <button type="button" class="chip chip--medium" disabled>Media</button>
            <button type="button" class="chip chip--high" disabled>Alta</button>
          </div>
        </div>
      </div>

      <div class="alerts__list">
        <article *ngFor="let alerta of alertas" class="alerts__item" [class.alerts__item--high]="alerta.severidad === 'ALTA'" [class.alerts__item--medium]="alerta.severidad === 'MEDIA'">
          <header>
            <p class="alerts__rut">{{ alerta.rut }} · {{ alerta.razonSocial }}</p>
            <span class="badge" [ngClass]="{
              'badge-high': alerta.severidad === 'ALTA',
              'badge-mid': alerta.severidad === 'MEDIA',
              'badge-low': alerta.severidad === 'BAJA'
            }">{{ alerta.severidad }}</span>
          </header>
          <p class="alerts__rule">Regla: {{ alerta.regla }}</p>
          <div class="alerts__meta">
            <span>{{ alerta.estado }}</span>
            <span>{{ alerta.fecha }}</span>
            <a [routerLink]="['/contribuyente', alerta.rut]" class="alerts__link">Ver contribuyente</a>
          </div>
        </article>
      </div>

      <nav class="pagination" aria-label="Paginación de alertas">
        <button type="button" disabled aria-disabled="true">Anterior</button>
        <span class="page-status">Página 1 de 5</span>
        <button type="button" disabled aria-disabled="true">Siguiente</button>
      </nav>
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
        padding: 48px 0 72px;
      }

      .alerts h1 {
        font-size: 32px;
        margin-bottom: 12px;
        color: var(--color-primary);
      }

      .alerts p {
        margin: 0 0 24px;
        color: #4f5d73;
        max-width: 680px;
      }

      .alerts__filters {
        display: grid;
        gap: 24px;
        margin-bottom: 32px;
      }

      .filters__group {
        display: grid;
        gap: 12px;
      }

      .filters__label {
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: #5b6a80;
      }

      .chip-group {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }

      .chip {
        border: 1px solid var(--ring);
        border-radius: 999px;
        padding: 8px 16px;
        background: #fff;
        font-weight: 600;
        color: var(--color-primary);
        cursor: not-allowed;
      }

      .chip--low {
        background: #e3f7e8;
        border-color: #c1e8cf;
        color: #21613a;
      }

      .chip--medium {
        background: #fff2d9;
        border-color: #f4d9a6;
        color: #7a4a00;
      }

      .chip--high {
        background: #fde3e3;
        border-color: #f2b9b9;
        color: #9b1c1c;
      }

      .alerts__list {
        display: grid;
        gap: 18px;
      }

      .alerts__item {
        background: var(--color-surface);
        border-radius: var(--radius);
        padding: 24px;
        border: 1px solid var(--ring);
        box-shadow: 0 12px 32px rgba(15, 41, 72, 0.08);
        display: grid;
        gap: 12px;
      }

      .alerts__item--medium {
        border-left: 6px solid #f4a640;
      }

      .alerts__item--high {
        border-left: 6px solid #d53c3c;
      }

      .alerts__item header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 12px;
      }

      .alerts__rut {
        margin: 0;
        font-weight: 600;
        color: var(--color-primary);
      }

      .alerts__rule {
        margin: 0;
        color: #4f5d73;
        font-size: 14px;
      }

      .alerts__meta {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
        font-size: 13px;
        color: #5b6a80;
      }

      .alerts__link {
        margin-left: auto;
        color: var(--color-secondary);
        text-decoration: none;
        font-weight: 600;
      }

      .alerts__link:hover,
      .alerts__link:focus-visible {
        text-decoration: underline;
      }
    `,
  ],
})
export class AlertasComponent {
  alertas: Alerta[] = [
    {
      rut: '11111111-1',
      razonSocial: 'Comercial Andina Ltda.',
      severidad: 'ALTA',
      estado: 'En curso',
      fecha: '14 marzo 2024',
      regla: 'Incremento abrupto de notas de crédito',
    },
    {
      rut: '22222222-2',
      razonSocial: 'Servicios Patria SpA',
      severidad: 'MEDIA',
      estado: 'Pendiente',
      fecha: '13 marzo 2024',
      regla: 'Variación en patrón de facturación',
    },
    {
      rut: '33333333-3',
      razonSocial: 'Constructora Horizonte S.A.',
      severidad: 'BAJA',
      estado: 'Cerrada',
      fecha: '12 marzo 2024',
      regla: 'Diferencias entre ventas y compras declaradas',
    },
    {
      rut: '44444444-4',
      razonSocial: 'Inversiones Norte Chico',
      severidad: 'ALTA',
      estado: 'En curso',
      fecha: '11 marzo 2024',
      regla: 'Uso intensivo de facturas no propias',
    },
    {
      rut: '55555555-5',
      razonSocial: 'Transporte Austral Ltda.',
      severidad: 'MEDIA',
      estado: 'Pendiente',
      fecha: '10 marzo 2024',
      regla: 'Cruce con guías electrónicas inconsistentes',
    },
    {
      rut: '66666666-6',
      razonSocial: 'Alimentos del Valle',
      severidad: 'BAJA',
      estado: 'Cerrada',
      fecha: '8 marzo 2024',
      regla: 'Regularización de declaraciones rectificatorias',
    },
  ];
}
