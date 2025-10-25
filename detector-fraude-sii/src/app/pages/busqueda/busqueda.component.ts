import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

type Contribuyente = {
  rut: string;
  razonSocial: string;
  giro: string;
  score: number;
  nivel: 'BAJO' | 'MEDIO' | 'ALTO';
  comuna: string;
};

@Component({
  selector: 'app-busqueda',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.scss'],
})
export class BusquedaComponent {
  contribuyentes: Contribuyente[] = [
    { rut: '11.111.111-1', razonSocial: 'Cabañas EcoLazos SpA', giro: 'Cabañas', score: 812, nivel: 'ALTO', comuna: 'Santiago' },
    { rut: '12.345.678-9', razonSocial: 'Momentos Que Importan Ltda.', giro: 'Servicios sociales', score: 645, nivel: 'MEDIO', comuna: 'Puerto Montt' },
    { rut: '76.543.210-4', razonSocial: 'Eco Market S.A.', giro: 'Comercio al por menor', score: 588, nivel: 'MEDIO', comuna: 'Viña del Mar' },
    { rut: '95.321.456-7', razonSocial: 'Descubre QR Chile Limitada', giro: 'Servicios profesionales', score: 432, nivel: 'BAJO', comuna: 'Concepción' },
    { rut: '81.203.405-2', razonSocial: 'Constructora Horizonte', giro: 'Construcción', score: 701, nivel: 'ALTO', comuna: 'Antofagasta' },
    { rut: '79.456.123-5', razonSocial: 'AgroSur Exportaciones', giro: 'Agroindustria', score: 569, nivel: 'MEDIO', comuna: 'Talca' },
    { rut: '88.765.432-1', razonSocial: 'Hotelera Patagonia', giro: 'Hotelería', score: 483, nivel: 'BAJO', comuna: 'Coyhaique' },
    { rut: '73.210.987-6', razonSocial: 'Tecnologías Integradas', giro: 'Tecnología', score: 758, nivel: 'ALTO', comuna: 'Las Condes' },
  ];

  periodos = ['Últimos 7 días', 'Últimos 30 días', 'Año en curso'];
  giros = ['Todos', 'Servicios profesionales', 'Comercio', 'Construcción', 'Agroindustria'];
  rangosScore = ['400 - 550', '551 - 700', '701 - 850'];

  formatRut(rut: string): string {
    return rut.replace(/\./g, '');
  }
}
