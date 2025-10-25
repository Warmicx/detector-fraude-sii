import { Component } from '@angular/core';
import { NgClass, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

type Contribuyente = {
  rut: string;
  razonSocial: string;
  giro: string;
  score: string;
  nivel: 'BAJO' | 'MEDIO' | 'ALTO';
};

@Component({
  selector: 'app-busqueda',
  standalone: true,
  imports: [NgFor, NgClass, RouterLink],
  template: `
    <section class="container search">
      <header class="section-header">
        <h1>Búsqueda de contribuyentes</h1>
        <p>Ingresa un RUT o aplica filtros visuales para explorar contribuyentes según su nivel de riesgo.</p>
      </header>

      <div class="card search__filters" aria-label="Filtros de búsqueda">
        <div class="search__row">
          <label class="field">
            <span>RUT contribuyente</span>
            <input type="text" placeholder="12.345.678-9" />
          </label>
          <button class="btn btn-primary" type="button" disabled>Buscar</button>
        </div>
        <div class="search__grid">
          <label class="field">
            <span>Período</span>
            <select>
              <option>Últimos 30 días</option>
              <option>Últimos 90 días</option>
              <option>Este año</option>
            </select>
          </label>
          <label class="field">
            <span>Giro</span>
            <select>
              <option>Todos</option>
              <option>Comercio minorista</option>
              <option>Servicios profesionales</option>
              <option>Construcción</option>
            </select>
          </label>
          <label class="field">
            <span>Rango de score</span>
            <div class="range">
              <input type="number" min="0" max="999" value="300" />
              <span aria-hidden="true">a</span>
              <input type="number" min="0" max="999" value="850" />
            </div>
          </label>
        </div>
      </div>

      <div class="table-wrapper">
        <table class="table" aria-label="Resultados de búsqueda">
          <thead>
            <tr>
              <th scope="col">RUT</th>
              <th scope="col">Razón social</th>
              <th scope="col">Giro</th>
              <th scope="col">Score</th>
              <th scope="col">Nivel</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of contribuyentes">
              <td>{{ item.rut }}</td>
              <td>{{ item.razonSocial }}</td>
              <td>{{ item.giro }}</td>
              <td>{{ item.score }}</td>
              <td>
                <span class="badge" [ngClass]="{ 'badge-low': item.nivel === 'BAJO', 'badge-mid': item.nivel === 'MEDIO', 'badge-high': item.nivel === 'ALTO' }">
                  {{ item.nivel }}
                </span>
              </td>
              <td>
                <a [routerLink]="['/contribuyente', item.rut]" class="link">Ver detalle</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <nav class="pagination" aria-label="Paginación">
        <button type="button" disabled aria-disabled="true">Anterior</button>
        <span class="page-status">Página 1 de 12</span>
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

      .search h1 {
        font-size: 32px;
        margin-bottom: 12px;
        color: var(--color-primary);
      }

      .search p {
        margin: 0 0 24px;
        color: #4f5d73;
        max-width: 620px;
      }

      .search__filters {
        display: grid;
        gap: 24px;
        margin-bottom: 32px;
      }

      .search__row {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
        align-items: flex-end;
      }

      .search__row .btn {
        padding-inline: 28px;
      }

      .field {
        display: flex;
        flex-direction: column;
        gap: 8px;
        flex: 1 1 220px;
        font-size: 14px;
        color: #3e4b60;
      }

      .field span {
        font-weight: 600;
        letter-spacing: 0.03em;
        text-transform: uppercase;
        font-size: 12px;
      }

      input,
      select {
        border-radius: 10px;
        border: 1px solid var(--ring);
        background: #fff;
        padding: 12px 14px;
        transition: border 0.2s ease, box-shadow 0.2s ease;
      }

      input:focus-visible,
      select:focus-visible {
        border-color: var(--color-secondary);
        box-shadow: 0 0 0 4px rgba(12, 91, 191, 0.15);
      }

      .search__grid {
        display: grid;
        gap: 20px;
      }

      @media (min-width: 700px) {
        .search__grid {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }
      }

      .range {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .range input {
        width: 100%;
      }

      .table-wrapper {
        overflow-x: auto;
        border-radius: var(--radius);
        box-shadow: 0 8px 24px rgba(15, 41, 72, 0.08);
      }

      .table {
        min-width: 720px;
      }

      .link {
        color: var(--color-secondary);
        text-decoration: none;
        font-weight: 600;
      }

      .link:hover,
      .link:focus-visible {
        text-decoration: underline;
      }

      .page-status {
        color: #5b6a80;
        font-size: 14px;
      }
    `,
  ],
})
export class BusquedaComponent {
  contribuyentes: Contribuyente[] = [
    { rut: '11111111-1', razonSocial: 'Comercial Andina Ltda.', giro: 'Comercio minorista', score: '872', nivel: 'ALTO' },
    { rut: '22222222-2', razonSocial: 'Servicios Patria SpA', giro: 'Servicios profesionales', score: '745', nivel: 'MEDIO' },
    { rut: '33333333-3', razonSocial: 'Constructora Horizonte S.A.', giro: 'Construcción', score: '681', nivel: 'MEDIO' },
    { rut: '44444444-4', razonSocial: 'Inversiones Norte Chico', giro: 'Inversiones', score: '914', nivel: 'ALTO' },
    { rut: '55555555-5', razonSocial: 'Transporte Austral Ltda.', giro: 'Transporte', score: '523', nivel: 'MEDIO' },
    { rut: '66666666-6', razonSocial: 'Alimentos del Valle', giro: 'Alimentos', score: '412', nivel: 'BAJO' },
    { rut: '77777777-7', razonSocial: 'Tecnologías Pacífico', giro: 'Tecnología', score: '804', nivel: 'ALTO' },
    { rut: '88888888-8', razonSocial: 'Servicios Integrales Sur', giro: 'Servicios integrales', score: '358', nivel: 'BAJO' },
  ];
}
