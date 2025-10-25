import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

type GlosarioItem = {
  termino: string;
  descripcion: string;
};

type FaqItem = {
  pregunta: string;
  respuesta: string;
};

@Component({
  selector: 'app-ayuda',
  standalone: true,
  imports: [NgFor],
  template: `
    <section class="container help">
      <header class="section-header">
        <h1>Centro de ayuda</h1>
        <p>Encuentra orientación para interpretar los resultados del modelo, comprender las variables y resolver dudas frecuentes sobre el uso de la plataforma.</p>
      </header>

      <article class="card help__section">
        <h2>Cómo interpretar el score</h2>
        <p>
          El score de riesgo se calcula en una escala de 0 a 1.000 puntos. Valores sobre 750 representan casos críticos que requieren revisión prioritaria. Entre 500 y 749 se ubican los contribuyentes en seguimiento medio, donde se recomienda revisar tendencia y aplicar filtros adicionales. Los valores bajo 500 se consideran estables, aunque se monitorean alertas activas o variaciones abruptas.
        </p>
        <p>
          Cada score combina información histórica de cumplimiento, comportamiento tributario reciente y reglas específicas según giro. La interpretación debe hacerse junto a los detalles de reglas activadas y la línea de tiempo de eventos.
        </p>
      </article>

      <article class="card help__section">
        <h2>Glosario de variables</h2>
        <ul>
          <li *ngFor="let item of glosario">
            <h3>{{ item.termino }}</h3>
            <p>{{ item.descripcion }}</p>
          </li>
        </ul>
      </article>

      <article class="card help__section">
        <h2>Preguntas frecuentes</h2>
        <div class="faq">
          <details *ngFor="let faq of faqs">
            <summary>{{ faq.pregunta }}</summary>
            <p>{{ faq.respuesta }}</p>
          </details>
        </div>
      </article>
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
        padding: 48px 0 72px;
      }

      .help h1 {
        font-size: 32px;
        margin-bottom: 12px;
        color: var(--color-primary);
      }

      .help p {
        margin: 0 0 24px;
        color: #4f5d73;
        max-width: 720px;
      }

      .help__section + .help__section {
        margin-top: 24px;
      }

      .help__section h2 {
        margin-top: 0;
        color: var(--color-primary);
        font-size: 22px;
      }

      .help__section ul {
        list-style: none;
        padding: 0;
        margin: 24px 0 0;
        display: grid;
        gap: 18px;
      }

      .help__section li {
        border-top: 1px solid var(--muted);
        padding-top: 18px;
      }

      .help__section h3 {
        margin: 0 0 8px;
        font-size: 16px;
      }

      .faq {
        display: grid;
        gap: 12px;
        margin-top: 16px;
      }

      details {
        border: 1px solid var(--ring);
        border-radius: 12px;
        padding: 16px 20px;
        background: var(--color-surface);
      }

      summary {
        font-weight: 600;
        cursor: pointer;
        outline: none;
      }

      summary::marker {
        color: var(--color-secondary);
      }

      details[open] {
        box-shadow: 0 12px 32px rgba(15, 41, 72, 0.1);
      }

      details p {
        margin: 12px 0 0;
        color: #4f5d73;
      }
    `,
  ],
})
export class AyudaComponent {
  glosario: GlosarioItem[] = [
    {
      termino: 'Score global',
      descripcion: 'Indicador compuesto que evalúa riesgo tributario general considerando comportamiento histórico y reglas activas.',
    },
    {
      termino: 'Delta de ventas',
      descripcion: 'Variación porcentual de ventas declaradas respecto al promedio del segmento y al historial propio.',
    },
    {
      termino: 'Cumplimiento IVA',
      descripcion: 'Medición de pagos y declaraciones de IVA dentro de los plazos establecidos por normativa.',
    },
    {
      termino: 'Alertas colaborativas',
      descripcion: 'Alertas generadas mediante integración con organismos externos como Aduanas o Tesorería.',
    },
  ];

  faqs: FaqItem[] = [
    {
      pregunta: '¿Cada cuánto se recalcula el score?',
      respuesta: 'El score se recalcula diariamente incorporando información tributaria y alertas recibidas durante la jornada anterior.',
    },
    {
      pregunta: '¿Puedo descargar los datos de un contribuyente?',
      respuesta: 'La plataforma permite exportar un resumen en formato CSV desde la sección de reportes. Esta función está restringida a perfiles con permisos avanzados.',
    },
    {
      pregunta: '¿Qué hacer cuando una alerta se marca como alta severidad?',
      respuesta: 'Debe asignarse un responsable y registrar la acción inicial en la actividad reciente del contribuyente antes de 48 horas.',
    },
    {
      pregunta: '¿Cómo se actualiza el glosario de variables?',
      respuesta: 'El glosario se revisa trimestralmente por el equipo analítico y se publica en esta sección con un registro de cambios.',
    },
  ];
}
