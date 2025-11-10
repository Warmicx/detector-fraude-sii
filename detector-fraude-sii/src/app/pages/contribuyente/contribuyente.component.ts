import { Component, OnInit, inject } from '@angular/core';
import { NgFor, NgIf, DecimalPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { forkJoin } from 'rxjs';

// ===== Tipos de la API nueva =====
type DetalleItem = {
  _id: string;
  suma_monto_neto: number;
  suma_monto_iva: number;
  suma_monto_total: number;
  suma_dte: number;
  monto_promedio: number;
  RUT_Emisor: number;
  anio: number;
  mes: number;
  // Nuevos campos
  productos_unicos?: string[];
  promedio_dte_6m?: number;
  promedio_monto_total_6m?: number;
  razon_social?: string;
  actividad_economica?: string;
  score?: number;
  score_glosas?: string[] | string;
  pct_incremento?: number;
  tipo_incremento?: string;
  nivel_riesgo?: string; // 'ALTO' | 'MEDIO' | 'BAJO'
  update_timestamp?: string; // ISO
  // Compatibilidad con versiones previas
  dte_6m?: number;
  promedio_monto_6m?: number;
};

type MesResumen = {
  anio: number;
  mes: number;
  suma_monto_total: number | null;
  suma_dte: number | null;
  monto_promedio: number | null;
  productos_unicos?: string[];
};

type DetalleResponse = { count: number; items: DetalleItem[] };

// ===== Endpoint base del detalle =====
const API_DETALLE =
  'https://yiszf5g611.execute-api.us-east-1.amazonaws.com/get';

@Component({
  selector: 'app-contribuyente',
  standalone: true,
  imports: [NgFor, NgIf, DecimalPipe],
  templateUrl: './contribuyente.component.html',
  styleUrls: ['./contribuyente.component.scss'],
})
export class ContribuyenteComponent implements OnInit {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);

  // === Estado UI ===
  loading = false;
  errorMsg: string | null = null;

  // === Parámetros para el backend (por defecto: ruta o fecha actual) ===
  rutParam!: string; // numérico sin puntos; viene desde la ruta
  rutDisplay: string | null = null; // como venía en la ruta (con DV)
  anio = new Date().getFullYear();
  mes = new Date().getMonth() + 1; // 1..12

  // === Resultados API ===
  detalle: DetalleItem | null = null;
  productos: string[] = [];

  ngOnInit(): void {
    // 1) Tomamos el rut desde la URL si existe (viene desde /contribuyente/:rut)
    const rutFromRoute = this.route.snapshot.paramMap.get('rut');
    if (rutFromRoute) {
      this.rutDisplay = rutFromRoute;
      this.rutParam = rutFromRoute.replace(/\D+/g, ''); // p.ej. 74001442
    } else {
      // Si no hay rut en la ruta, no intentamos cargar
      this.rutParam = '';
    }
    if (this.rutParam) {
      this.fetchDetalle();
    }
  }

  fetchDetalle(): void {
    this.loading = true;
    this.errorMsg = null;
    this.detalle = null;
    this.productos = [];

    let params = new HttpParams()
      .set('rut', this.rutParam)
      .set('anio', String(this.anio))
      .set('mes', String(this.mes))
      .set('limit', '10'); // opcional

    this.http.get<DetalleResponse>(API_DETALLE, { params }).subscribe({
      next: (res) => {
        const item = res.items?.[0] ?? null;
        this.detalle = item;
        this.productos = item?.productos_unicos ?? [];
        this.loading = false;
        this.fetchSerie6m();
      },
      error: (err) => {
        console.error('Error detalle contribuyente', err);
        this.errorMsg = 'No se pudo cargar el detalle mensual.';
        this.loading = false;
      },
    });
  }

  cambiarPeriodo(deltaMes: number) {
    // mueve el mes (con rollover)
    let y = this.anio;
    let m = this.mes + deltaMes;
    if (m < 1) {
      m = 12;
      y -= 1;
    }
    if (m > 12) {
      m = 1;
      y += 1;
    }
    this.anio = y;
    this.mes = m;
    this.fetchDetalle();
  }

  formateaRutSimple(n: string | number): string {
    const s = String(n).replace(/\D+/g, '');
    return s.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  monto(v?: number | null): string {
    if (v == null) return '-';
    return v.toLocaleString('es-CL');
  }

  promedioDte6m(det?: DetalleItem | null): number | null {
    if (!det) return null;
    return (det.promedio_dte_6m ?? det.dte_6m ?? null) as number | null;
  }

  promedioMontoTotal6m(det?: DetalleItem | null): number | null {
    if (!det) return null;
    return (det.promedio_monto_total_6m ?? det.promedio_monto_6m ?? null) as
      | number
      | null;
  }

  riesgoBadgeClass(nivel?: string | null): string {
    const n = (nivel || '').toString().toLowerCase();
    return n === 'alto'
      ? 'summary__badge summary__badge--alto'
      : 'summary__badge';
  }

  fechaActualizacion(det?: DetalleItem | null): string | null {
    if (!det?.update_timestamp) return null;
    const d = new Date(det.update_timestamp);
    return isNaN(d.getTime())
      ? det.update_timestamp
      : d.toLocaleString('es-CL');
  }

  scoreGlosas(det?: DetalleItem | null): string[] {
    if (!det?.score_glosas) return [];
    if (Array.isArray(det.score_glosas)) return det.score_glosas as string[];
    const s = String(det.score_glosas);
    // Si viene como string separado por ; o \n
    return s.includes('\n')
      ? s
          .split('\n')
          .map((t) => t.trim())
          .filter(Boolean)
      : s
          .split(';')
          .map((t) => t.trim())
          .filter(Boolean);
  }

  deltaPct(actual?: number | null, ref?: number | null): number | null {
    if (actual == null || ref == null || ref === 0) return null;
    return ((actual - ref) / ref) * 100;
  }

  // Señalética (flecha y clase)
  trendInfo(delta: number | null) {
    if (delta == null)
      return { icon: '≈', cls: 'trend trend--flat', label: 'Sin cambio' };
    if (delta > 2)
      return {
        icon: '▲',
        cls: 'trend trend--up',
        label: `+${delta.toFixed(1)}%`,
      };
    if (delta < -2)
      return {
        icon: '▼',
        cls: 'trend trend--down',
        label: `${delta.toFixed(1)}%`,
      };
    return {
      icon: '≈',
      cls: 'trend trend--flat',
      label: `${delta.toFixed(1)}%`,
    };
  }

  onMonthPick(ev: Event) {
    const v = (ev.target as HTMLInputElement).value; // "2025-10"
    if (!v) return;
    const [y, m] = v.split('-').map(Number);
    if (!y || !m) return;
    this.anio = y;
    this.mes = m;
    this.fetchDetalle();
  }

  serie6m: MesResumen[] = [];
  loadingSerie = false;

  private mesesHaciaAtras(
    count: number,
    baseAnio = this.anio,
    baseMes = this.mes
  ) {
    const out: { anio: number; mes: number }[] = [];
    let y = baseAnio,
      m = baseMes;
    for (let i = 0; i < count; i++) {
      out.push({ anio: y, mes: m });
      m -= 1;
      if (m < 1) {
        m = 12;
        y -= 1;
      }
    }
    return out.reverse(); // cronológico
  }

  fetchSerie6m(): void {
    if (!this.rutParam) return;
    this.loadingSerie = true;
    const meses = this.mesesHaciaAtras(6, this.anio, this.mes);

    const reqs = meses.map(({ anio, mes }) => {
      const params = new HttpParams()
        .set('rut', this.rutParam)
        .set('anio', String(anio))
        .set('mes', String(mes))
        .set('limit', '1');
      return this.http.get<DetalleResponse>(API_DETALLE, { params });
    });
    forkJoin(reqs).subscribe({
      next: (respuestas: DetalleResponse[]) => {
        this.serie6m = respuestas.map((r, i) => {
          const it = r.items?.[0];
          const { anio, mes } = meses[i];
          return {
            anio,
            mes,
            suma_monto_total: it?.suma_monto_total ?? null,
            suma_dte: it?.suma_dte ?? null,
            monto_promedio: it?.monto_promedio ?? null,
            productos_unicos: it?.productos_unicos ?? [],
          };
        });
        this.loadingSerie = false;
      },
      error: () => {
        this.loadingSerie = false;
      },
    });
  }

  getMaxMonto(): number {
    return Math.max(
      ...(this.serie6m || []).map((m) => m.suma_monto_total || 0)
    );
  }

  deltaMoM() {
    if (this.serie6m.length < 2) return null;
    const cur = this.serie6m[this.serie6m.length - 1];
    const prev = this.serie6m[this.serie6m.length - 2];
    const dMonto = this.deltaPct(
      cur.suma_monto_total ?? null,
      prev.suma_monto_total ?? null
    );
    const dDte = this.deltaPct(cur.suma_dte ?? null, prev.suma_dte ?? null);
    return { dMonto, dDte };
  }
}
