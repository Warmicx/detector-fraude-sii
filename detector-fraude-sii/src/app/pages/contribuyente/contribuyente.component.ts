import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface RuleItem {
  tag: string;
  description: string;
  category: 'Operaciones' | 'Declaraciones' | 'Cumplimiento';
}

interface TimelineItem {
  date: string;
  detail: string;
  channel: string;
}

interface HistoricalPoint {
  label: string;
  value: number;
}

@Component({
  selector: 'app-contribuyente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contribuyente.component.html',
  styleUrls: ['./contribuyente.component.scss']
})
export class ContribuyenteComponent {
  protected readonly rut = '11.111.111-1';
  protected readonly razonSocial = 'Comercial Andina Ltda.';
  protected readonly giro = 'Comercio al por mayor de abarrotes';
  protected readonly comuna = 'Providencia';
  protected readonly score = 82;
  protected readonly nivel: 'ALTO' | 'MEDIO' | 'BAJO' = 'ALTO';

  protected readonly reglas: RuleItem[] = [
    {
      tag: 'Ventas atípicas',
      description: 'Variación mensual de ventas mayor al 45% respecto a promedio trimestral.',
      category: 'Operaciones'
    },
    {
      tag: 'Inconsistencia IVA',
      description: 'Diferencias entre IVA débito y crédito superiores a umbral definido.',
      category: 'Declaraciones'
    },
    {
      tag: 'Boletas anuladas',
      description: 'Anulación del 18% de boletas emitidas en los últimos 30 días.',
      category: 'Cumplimiento'
    },
    {
      tag: 'Importaciones',
      description: 'Declaraciones de importación sin respaldo de ventas equivalentes.',
      category: 'Operaciones'
    }
  ];

  protected readonly actividad: TimelineItem[] = [
    {
      date: '12 may 2024',
      detail: 'Analista regional revisa documentación de respaldo enviada por contribuyente.',
      channel: 'Gestión interna'
    },
    {
      date: '09 may 2024',
      detail: 'Se solicita complementar antecedentes sobre declaración mensual de IVA.',
      channel: 'Comunicaciones SII'
    },
    {
      date: '05 may 2024',
      detail: 'Se activa alerta por incremento abrupto de ventas electrónicas.',
      channel: 'Motor de reglas'
    },
    {
      date: '27 abr 2024',
      detail: 'Se cierra revisión anterior sin observaciones graves.',
      channel: 'Gestión interna'
    }
  ];

  protected readonly historico: HistoricalPoint[] = [
    { label: 'Dic', value: 52 },
    { label: 'Ene', value: 60 },
    { label: 'Feb', value: 63 },
    { label: 'Mar', value: 70 },
    { label: 'Abr', value: 78 },
    { label: 'May', value: 82 }
  ];

  badgeClass(): string {
    switch (this.nivel) {
      case 'ALTO':
        return 'badge badge-high';
      case 'MEDIO':
        return 'badge badge-mid';
      default:
        return 'badge badge-low';
    }
  }
}
