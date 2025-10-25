import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface ContribuyenteItem {
  rut: string;
  razonSocial: string;
  giro: string;
  score: string;
  nivel: 'BAJO' | 'MEDIO' | 'ALTO';
}

@Component({
  selector: 'app-busqueda',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.scss']
})
export class BusquedaComponent {
  protected readonly periodos = ['Últimos 7 días', 'Últimos 30 días', 'Año en curso'];
  protected readonly giros = ['Comercio minorista', 'Servicios profesionales', 'Construcción', 'Transporte'];
  protected readonly niveles = ['0 - 39', '40 - 69', '70 - 100'];

  protected readonly resultados: ContribuyenteItem[] = [
    { rut: '11.111.111-1', razonSocial: 'Comercial Andina Ltda.', giro: 'Comercio minorista', score: '82', nivel: 'ALTO' },
    { rut: '12.345.678-9', razonSocial: 'Servicios Tributarios SPA', giro: 'Servicios profesionales', score: '68', nivel: 'MEDIO' },
    { rut: '76.543.210-5', razonSocial: 'Transportes del Sur S.A.', giro: 'Transporte y logística', score: '74', nivel: 'ALTO' },
    { rut: '98.765.432-1', razonSocial: 'Construcciones Vanguardia', giro: 'Construcción', score: '59', nivel: 'MEDIO' },
    { rut: '87.654.321-0', razonSocial: 'Agroexportadora Los Andes', giro: 'Exportaciones agrícolas', score: '35', nivel: 'BAJO' },
    { rut: '65.432.187-4', razonSocial: 'Tecnologías Integradas', giro: 'Servicios profesionales', score: '47', nivel: 'MEDIO' },
    { rut: '72.001.456-6', razonSocial: 'Distribuidora Austral', giro: 'Comercio mayorista', score: '88', nivel: 'ALTO' },
    { rut: '60.345.987-2', razonSocial: 'Consultora Horizonte', giro: 'Servicios profesionales', score: '41', nivel: 'MEDIO' }
  ];

  formatRutPath(rut: string): string {
    return rut.replace(/\\./g, '');
  }

  badgeClass(nivel: ContribuyenteItem['nivel']): string {
    switch (nivel) {
      case 'ALTO':
        return 'badge badge-high';
      case 'MEDIO':
        return 'badge badge-mid';
      default:
        return 'badge badge-low';
    }
  }
}
