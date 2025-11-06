import { Component, OnInit, inject } from '@angular/core';
import { NgFor, NgIf, DecimalPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';

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
  productos_unicos: string[];
  dte_6m: number;
  promedio_monto_6m: number;
};
type DetalleResponse = { count: number; items: DetalleItem[] };

// ===== Endpoint base del detalle =====
const API_DETALLE = 'https://yiszf5g611.execute-api.us-east-1.amazonaws.com/get';

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
  anio = new Date().getFullYear();
  mes = new Date().getMonth() + 1; // 1..12

  // === Resultados API ===
  detalle: DetalleItem | null = null;
  productos: string[] = [];

  ngOnInit(): void {
    // 1) Tomamos el rut desde la URL si existe (viene desde /contribuyente/:rut)
    const rutFromRoute = this.route.snapshot.paramMap.get('rut');
    if (rutFromRoute) {
      this.rutParam = rutFromRoute.replace(/\D+/g, ''); // ya debería venir numérico (p.ej. 74001442)
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
      },
      error: (err) => {
        console.error('Error detalle contribuyente', err);
        this.errorMsg = 'No se pudo cargar el detalle mensual.';
        this.loading = false;
      }
    });
  }

  cambiarPeriodo(deltaMes: number) {
    // mueve el mes (con rollover)
    let y = this.anio;
    let m = this.mes + deltaMes;
    if (m < 1) { m = 12; y -= 1; }
    if (m > 12) { m = 1; y += 1; }
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
}
