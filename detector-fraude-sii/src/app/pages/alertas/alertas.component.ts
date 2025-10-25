import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface AlertaItem {
  id: string;
  rut: string;
  razonSocial: string;
  fecha: string;
  regla: string;
  severidad: 'BAJA' | 'MEDIA' | 'ALTA';
}

@Component({
  selector: 'app-alertas',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.scss']
})
export class AlertasComponent {
  protected readonly estados = ['Todas', 'Pendientes', 'En revisión', 'Resueltas'];
  protected readonly severidades = ['Todas', 'Baja', 'Media', 'Alta'];

  protected readonly alertas: AlertaItem[] = [
    { id: 'ALT-3267', rut: '11.111.111-1', razonSocial: 'Comercial Andina Ltda.', fecha: '12 mayo 2024', regla: 'Ventas atípicas', severidad: 'ALTA' },
    { id: 'ALT-3220', rut: '98.765.432-1', razonSocial: 'Construcciones Vanguardia', fecha: '11 mayo 2024', regla: 'Inconsistencias IVA', severidad: 'MEDIA' },
    { id: 'ALT-3195', rut: '76.543.210-5', razonSocial: 'Transportes del Sur S.A.', fecha: '10 mayo 2024', regla: 'Concentración de proveedores', severidad: 'MEDIA' },
    { id: 'ALT-3184', rut: '87.654.321-0', razonSocial: 'Agroexportadora Los Andes', fecha: '08 mayo 2024', regla: 'Declaraciones incompletas', severidad: 'ALTA' },
    { id: 'ALT-3162', rut: '65.432.187-4', razonSocial: 'Tecnologías Integradas', fecha: '06 mayo 2024', regla: 'Boletas anuladas', severidad: 'MEDIA' },
    { id: 'ALT-3107', rut: '90.123.456-7', razonSocial: 'Servicios Médicos Horizonte', fecha: '03 mayo 2024', regla: 'Gasto tributario elevado', severidad: 'BAJA' }
  ];

  formatRutPath(rut: string): string {
    return rut.replace(/\\./g, '');
  }

  severidadClass(severidad: AlertaItem['severidad']): string {
    switch (severidad) {
      case 'ALTA':
        return 'alerta alerta--alta';
      case 'MEDIA':
        return 'alerta alerta--media';
      default:
        return 'alerta alerta--baja';
    }
  }
}
