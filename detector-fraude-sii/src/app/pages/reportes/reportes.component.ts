import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ResumenItem {
  label: string;
  value: string;
  description: string;
}

interface DistribucionItem {
  nivel: 'Alto' | 'Medio' | 'Bajo';
  porcentaje: number;
}

interface EvolucionItem {
  semana: string;
  casos: number;
}

interface TablaItem {
  periodo: string;
  total: number;
  alto: number;
  medio: number;
  bajo: number;
}

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent {
  protected readonly resumen: ResumenItem[] = [
    { label: 'Total de casos analizados', value: '12.480', description: 'Incluye todos los contribuyentes monitoreados esta semana.' },
    { label: 'Casos de riesgo alto', value: '1.125', description: 'Casos que requieren seguimiento prioritario.' },
    { label: 'Casos en observación', value: '3.487', description: 'En seguimiento por equipos regionales.' }
  ];

  protected readonly distribucion: DistribucionItem[] = [
    { nivel: 'Alto', porcentaje: 27 },
    { nivel: 'Medio', porcentaje: 44 },
    { nivel: 'Bajo', porcentaje: 29 }
  ];

  protected readonly evolucion: EvolucionItem[] = [
    { semana: 'Semana 1', casos: 980 },
    { semana: 'Semana 2', casos: 1_120 },
    { semana: 'Semana 3', casos: 1_180 },
    { semana: 'Semana 4', casos: 1_260 }
  ];

  protected readonly tabla: TablaItem[] = [
    { periodo: 'Abril 2024', total: 4800, alto: 1080, medio: 2040, bajo: 1680 },
    { periodo: 'Marzo 2024', total: 4625, alto: 980, medio: 1995, bajo: 1650 },
    { periodo: 'Febrero 2024', total: 4380, alto: 905, medio: 1860, bajo: 1615 }
  ];
}
