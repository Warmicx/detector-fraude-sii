import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

interface Regla {
  nombre: string;
  descripcion: string;
}

interface Actividad {
  fecha: string;
  descripcion: string;
}

interface Historico {
  periodo: string;
  valor: number;
}

@Component({
  selector: 'app-contribuyente',
  standalone: true,
  imports: [NgFor],
  templateUrl: './contribuyente.component.html',
  styleUrls: ['./contribuyente.component.scss'],
})
export class ContribuyenteComponent {
  contribuyente = {
    rut: '11.111.111-1',
    razonSocial: 'Inversiones Andes SpA',
    giro: 'Servicios financieros',
    comuna: 'Santiago',
    score: 812,
    nivel: 'ALTO' as const,
  };

  reglas: Regla[] = [
    { nombre: 'Incremento inusual de notas de crédito', descripcion: 'Variación superior al 35% respecto del promedio trimestral.' },
    { nombre: 'Inconsistencia IVA compras/ventas', descripcion: 'Declaraciones de IVA sin correlación con ventas registradas.' },
    { nombre: 'Uso reiterado de facturación exenta', descripcion: 'Más del 60% del monto facturado corresponde a documentos exentos.' },
  ];

  actividades: Actividad[] = [
    { fecha: '06 MAY 2024', descripcion: 'Analista regional registró revisión manual de documentos respaldatorios.' },
    { fecha: '03 MAY 2024', descripcion: 'Se generó alerta de severidad alta por patrón de gastos atípicos.' },
    { fecha: '28 ABR 2024', descripcion: 'Score recalculado con actualización de variables de comportamiento mensual.' },
  ];

  historico: Historico[] = [
    { periodo: 'ENE', valor: 520 },
    { periodo: 'FEB', valor: 560 },
    { periodo: 'MAR', valor: 640 },
    { periodo: 'ABR', valor: 780 },
    { periodo: 'MAY', valor: 812 },
  ];
}
