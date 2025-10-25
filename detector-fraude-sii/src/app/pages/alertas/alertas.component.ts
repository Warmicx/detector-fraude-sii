import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

type Severidad = 'BAJA' | 'MEDIA' | 'ALTA';

interface Alerta {
  id: string;
  rut: string;
  razonSocial: string;
  fecha: string;
  severidad: Severidad;
  regla: string;
}

@Component({
  selector: 'app-alertas',
  standalone: true,
  imports: [NgFor],
  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.scss'],
})
export class AlertasComponent {
  estados = ['Abiertas', 'En seguimiento', 'Resueltas'];
  severidades: Severidad[] = ['ALTA', 'MEDIA', 'BAJA'];

  alertas: Alerta[] = [
    { id: 'ALT-00124', rut: '73.210.987-6', razonSocial: 'Tecnologías Integradas', fecha: '06 MAY 2024', severidad: 'ALTA', regla: 'Inconsistencia IVA compras/ventas' },
    { id: 'ALT-00112', rut: '11.111.111-1', razonSocial: 'Inversiones Andes SpA', fecha: '05 MAY 2024', severidad: 'MEDIA', regla: 'Incremento inusual de notas de crédito' },
    { id: 'ALT-00105', rut: '88.765.432-1', razonSocial: 'Hotelera Patagonia', fecha: '05 MAY 2024', severidad: 'BAJA', regla: 'Uso intensivo de facturación exenta' },
    { id: 'ALT-00098', rut: '79.456.123-5', razonSocial: 'AgroSur Exportaciones', fecha: '04 MAY 2024', severidad: 'ALTA', regla: 'Disminución abrupta de ventas declaradas' },
    { id: 'ALT-00092', rut: '95.321.456-7', razonSocial: 'Consultores Tributarios Ltda.', fecha: '03 MAY 2024', severidad: 'MEDIA', regla: 'Score supera umbral definido' },
  ];
}
