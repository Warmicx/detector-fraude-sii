import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

interface Pregunta {
  pregunta: string;
  respuesta: string;
}

@Component({
  selector: 'app-ayuda',
  standalone: true,
  imports: [NgFor],
  templateUrl: './ayuda.component.html',
  styleUrls: ['./ayuda.component.scss'],
})
export class AyudaComponent {
  secciones = [
    {
      titulo: 'Cómo interpretar el score',
      descripcion:
        'El score cuantifica la probabilidad de irregularidades tributarias en una escala de 0 a 900. Los umbrales institucionales definen tres niveles para orientar la priorización operativa.',
      puntos: [
        '0 a 500 · Riesgo bajo: monitoreo periódico y revisión documental básica.',
        '501 a 700 · Riesgo medio: seguimiento mensual y corroboración de fuentes externas.',
        '701 a 900 · Riesgo alto: fiscalización prioritaria y gestión coordinada con áreas regionales.',
      ],
    },
    {
      titulo: 'Glosario de variables',
      descripcion: 'Principales campos utilizados en el cálculo del score de riesgo.',
      puntos: [
        'Índice de consistencia IVA: compara la relación entre compras y ventas declaradas.',
        'Volatilidad de ingresos: mide la variación porcentual de ventas en los últimos seis meses.',
        'Nivel de documentación electrónica: porcentaje de documentos emitidos en formato electrónico.',
        'Alertas históricas: recuento ponderado de observaciones levantadas en los últimos 12 meses.',
      ],
    },
  ];

  preguntasFrecuentes: Pregunta[] = [
    {
      pregunta: '¿Cada cuánto se recalcula el score?',
      respuesta: 'El recalculo se realiza diariamente con datos consolidados al cierre del día anterior.',
    },
    {
      pregunta: '¿Puedo descargar la información en formatos externos?',
      respuesta: 'Las vistas de Reportes incluyen una opción de exportación a CSV que estará disponible en fases posteriores.',
    },
    {
      pregunta: '¿Cómo solicito soporte?',
      respuesta: 'Contacta a la mesa de servicio interna indicando el ID del contribuyente y el detalle de la consulta.',
    },
  ];
}
