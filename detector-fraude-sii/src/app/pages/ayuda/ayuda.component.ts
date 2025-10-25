import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ayuda',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ayuda.component.html',
  styleUrls: ['./ayuda.component.scss']
})
export class AyudaComponent {
  protected readonly faq = [
    {
      pregunta: '¿Con qué frecuencia se actualizan los scores?',
      respuesta: 'Los scores se recalculan semanalmente utilizando la información declarada y los indicadores de comportamiento disponibles.'
    },
    {
      pregunta: '¿Puedo descargar la información de un contribuyente?',
      respuesta: 'La maqueta no contempla descargas, pero en un entorno productivo podrías generar reportes específicos desde la vista de detalle.'
    },
    {
      pregunta: '¿Qué niveles de severidad existen?',
      respuesta: 'Las alertas se clasifican en bajo, medio y alto según umbrales definidos por el área de analítica fiscal.'
    }
  ];
}
