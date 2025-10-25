import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

type QuickLink = { label: string; description: string; path: string };
type Notice = { title: string; description: string };
type Kpi = { label: string; value: string; trend: string };
type Highlight = { title: string; date: string };
type NewsItem = { title: string; source: string };

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  quickLinks: QuickLink[] = [
    { label: 'Búsqueda de contribuyentes', description: 'Consultas rápidas por RUT y filtros clave.', path: '/busqueda' },
    { label: 'Detalle contribuyente', description: 'Resumen integral del perfil de riesgo.', path: '/contribuyente/11111111-1' },
    { label: 'Alertas activas', description: 'Monitorea eventos recientes por severidad.', path: '/alertas' },
    { label: 'Reportes agregados', description: 'Indicadores de riesgo por segmento.', path: '/reportes' },
    { label: 'Centro de ayuda', description: 'Guías, preguntas frecuentes y glosario.', path: '/ayuda' },
  ];

  notices: Notice[] = [
    { title: 'Actualización de modelo', description: 'Se incorporaron variables de comportamiento mensual desde abril.' },
    { title: 'Mantenimiento programado', description: 'La plataforma estará en modo lectura el domingo entre 08:00 y 10:00 hrs.' },
  ];

  kpis: Kpi[] = [
    { label: 'Contribuyentes con riesgo alto', value: '2.341', trend: '+4,2% vs. semana anterior' },
    { label: 'Alertas revisadas', value: '786', trend: '68% resueltas en 48h' },
    { label: 'Cobertura de datos', value: '98,5%', trend: 'Registros con score vigente' },
  ];

  highlights: Highlight[] = [
    { title: 'Seguimiento especial para sector servicios profesionales', date: 'Actualizado 05 MAY' },
    { title: 'Top 50 contribuyentes con score crítico disponible en Reportes', date: 'Actualizado 02 MAY' },
    { title: 'Guía para interpretación de niveles de riesgo', date: 'Actualizado 29 ABR' },
  ];

  news: NewsItem[] = [
    { title: 'Campaña de verificación de facturación electrónica', source: 'Dirección Nacional' },
    { title: 'Integración con bases regionales completada', source: 'Equipo Tecnología' },
    { title: 'Nuevo tablero de evolución semanal disponible', source: 'Subdepartamento Analítica' },
  ];
}
