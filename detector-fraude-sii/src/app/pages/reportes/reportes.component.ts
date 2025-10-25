import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

interface Resumen {
  periodo: string;
  total: number;
  alto: number;
  medio: number;
  bajo: number;
}

interface GraficoBarra {
  label: string;
  value: number;
}

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [NgFor],
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss'],
})
export class ReportesComponent {
  tarjetas = [
    { titulo: 'Casos totales monitoreados', valor: '5.842', detalle: '+8,4% vs. semana anterior' },
    { titulo: 'Riesgo alto', valor: '1.126', detalle: '19,3% del total' },
    { titulo: 'Riesgo medio', valor: '2.941', detalle: '50,3% del total' },
    { titulo: 'Riesgo bajo', valor: '1.775', detalle: '30,4% del total' },
  ];

  distribucion: GraficoBarra[] = [
    { label: 'Alto', value: 1126 },
    { label: 'Medio', value: 2941 },
    { label: 'Bajo', value: 1775 },
  ];

  evolucion: GraficoBarra[] = [
    { label: 'Semana 1', value: 860 },
    { label: 'Semana 2', value: 910 },
    { label: 'Semana 3', value: 1024 },
    { label: 'Semana 4', value: 1126 },
  ];

  resumen: Resumen[] = [
    { periodo: 'Abril 2024', total: 5210, alto: 1021, medio: 2650, bajo: 1539 },
    { periodo: 'Marzo 2024', total: 4980, alto: 945, medio: 2543, bajo: 1492 },
    { periodo: 'Febrero 2024', total: 4725, alto: 886, medio: 2380, bajo: 1459 },
  ];
}
