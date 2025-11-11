import { Component, OnInit, inject } from '@angular/core';
import { NgFor, NgIf, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// === Tipos UI actuales (mantengo tu interfaz de la tabla) ===
type Contribuyente = {
  rut: string; // mapeado desde RUT_Emisor (sin DV, se muestra como número formateado)
  razonSocial: string; // Razon_Social
  giro: string; // Actividad_Economica
  score: number; // no disponible en backend -> fallback
  nivel: 'BAJO' | 'MEDIO' | 'ALTO'; // no disponible -> fallback
  comuna: string; // no disponible -> fallback
  fechaRegistro?: string; // extra para mostrar si quieres
};

// === Tipos de API ===
type ApiItem = {
  rut_emisor: number;
  razon_social: string;
  actividad_economica: string;
  max_score?: number;
  max_nivel_riesgo?: string; // "bajo" | "medio" | "alto"
  anio_max_riesgo_alto?: number | null;
  mes_max_riesgo_alto?: number | null;
  anio_max_score?: number | null;
  mes_max_score?: number | null;
};

type ApiResponse = {
  ok?: boolean;
  count?: number;
  page?: number;
  limit?: number;
  items: ApiItem[];
};

// Base directa (tu proyecto no usa environments)
const API_BASE = 'https://55duhjg8v9.execute-api.us-east-1.amazonaws.com/prod';

@Component({
  selector: 'app-busqueda',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, DatePipe, FormsModule],
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.scss'],
})
export class BusquedaComponent implements OnInit {
  private http = inject(HttpClient);

  // Estado
  contribuyentes: Contribuyente[] = [];
  loading = false;

  // Paginación real del servidor
  page = 1;
  limit = 10; // puedes setear 3 para calzar con tu ejemplo
  total = 0;
  pages = 0;

  // Filas de placeholder para mantener altura mientras no hay datos
  placeholders = Array.from({ length: 5 });

  // Filtros UI existentes (aún sin pegar al backend)
  periodos = ['Últimos 7 días', 'Últimos 30 días', 'Año en curso'];
  giros = [
    'Todos',
    'Servicios profesionales',
    'Comercio',
    'Construcción',
    'Agroindustria',
  ];
  rangosScore = ['400 - 550', '551 - 700', '701 - 850'];

  private router = inject(Router);

  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    this.loading = true;

    let params = new HttpParams()
      .set('page', this.page)
      .set('limit', this.limit);

    this.http
      .get<ApiResponse>(`${API_BASE}/contribuyentes_detalle`, { params })
      .subscribe({
        next: (res) => {
          // Mapear a tu modelo UI actual, usando el nuevo servicio con score
          this.contribuyentes = (res.items ?? []).map(
            (it): Contribuyente => ({
              rut: String(it.rut_emisor),
              razonSocial: it.razon_social,
              giro: it.actividad_economica,
              score: it.max_score ?? 0,
              nivel: ((it.max_nivel_riesgo || '') as string).toString().toUpperCase() as any,
              comuna: '-',
              fechaRegistro: undefined,
            })
          );

          // Meta de paginación
          const count = res.count ?? this.contribuyentes.length;
          const limit = res.limit ?? this.limit;
          this.total = count;
          this.pages = count && limit ? Math.max(1, Math.ceil(count / limit)) : 1;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error al cargar contribuyentes', err);
          this.contribuyentes = [];
          this.total = 0;
          this.pages = 0;
          this.loading = false;
        },
      });
  }

  // Navegación de páginas (UI simple, sin librerías)
  nextPage(): void {
    if (this.page < this.pages) {
      this.page++;
      this.fetch();
    }
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.fetch();
    }
  }

  // El template usa este helper para armar la URL /contribuyente/:rut
  formatRut(rut: string): string {
    return rut.replace(/\./g, '');
  }

  // Estado buscador
  rutQuery = '';
  lastSearchTried = ''; // para recordar lo buscado

  // Normaliza a puros dígitos (para comparar con item.rut que ya es numérico sin DV)
  normalizeRut(v: string): string {
    return (v || '').toString().replace(/\D+/g, '');
  }

  // Valida un mínimo razonable (7–9 dígitos)
  isRutCandidate(v: string): boolean {
    const n = this.normalizeRut(v);
    return n.length >= 7 && n.length <= 9;
  }

  // Filtro local sobre la página actual
  listaVisible(): Contribuyente[] {
    const q = this.normalizeRut(this.rutQuery);
    if (!q) return this.contribuyentes;
    // Coincidencia por prefijo o exacta
    return this.contribuyentes.filter((c) => {
      const r = this.normalizeRut(c.rut);
      return r.startsWith(q) || r === q;
    });
  }

  // Eventos
  onRutInput() {
    // opcional: limitar caracteres visibles a dígitos y separadores
    // (a gusto, aquí no mutamos el valor para no interferir mientras escribe)
  }

  onBuscar() {
    this.lastSearchTried = this.rutQuery.trim();
    if (!this.isRutCandidate(this.rutQuery)) {
      // feedback sutil: podrías setear un flag si quieres mostrar error de formato
      return;
    }
    // Búsqueda remota por RUT para no depender de la página actual
    const rut = this.normalizeRut(this.rutQuery);
    this.loading = true;
    const params = new HttpParams().set('rut', rut).set('limit', 10);
    this.http
      .get<ApiResponse>(`${API_BASE}/contribuyentes_detalle`, { params })
      .subscribe({
        next: (res) => {
          const mapped = (res.items ?? []).map(
            (it): Contribuyente => ({
              rut: String(it.rut_emisor),
              razonSocial: it.razon_social,
              giro: it.actividad_economica,
              score: it.max_score ?? 0,
              nivel: ((it.max_nivel_riesgo || '') as string).toString().toUpperCase() as any,
              comuna: '-',
              fechaRegistro: undefined,
            })
          );
          if (mapped.length === 1) {
            this.router.navigate(['/contribuyente', this.formatRut(mapped[0].rut)]);
          } else {
            this.contribuyentes = mapped;
            this.total = mapped.length;
            this.pages = 1;
          }
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        },
      });
  }

  onLimpiar() {
    this.rutQuery = '';
  }

  adm = { rut: '', sospecha: 'monto' as 'monto'|'cantidad', mult: 10, loading: false, msg: '' };

private API_GEN = 'https://ythjq59t4l.execute-api.us-east-1.amazonaws.com/prod/generar_sospechoso';
private API_AGR = 'https://4i1wbsosqc.execute-api.us-east-1.amazonaws.com/prod/agregados';

generarSospechoso() {
  const rut = (this.adm.rut || '').replace(/\D+/g, '');
  if (!rut) { this.adm.msg = 'Ingresa un RUT válido (solo dígitos).'; return; }
  if (!this.adm.mult || this.adm.mult < 2) { this.adm.msg = 'Multiplicador ≥ 2.'; return; }

  this.adm.loading = true; this.adm.msg = 'Generando…';
  const params = new HttpParams()
    .set('rut', rut)
    .set('sospecha', this.adm.sospecha)
    .set('multiplicador', String(this.adm.mult));

  this.http.get(this.API_GEN, { params }).subscribe({
    next: () => { this.adm.msg = 'Listo: sospechoso generado. Ahora recalcula agregados.'; this.adm.loading = false; },
    error: () => { this.adm.msg = 'Error al generar sospechoso.'; this.adm.loading = false; }
  });
}

recalcularAgregados() {
  this.adm.loading = true; this.adm.msg = 'Recalculando agregados…';
  this.http.get(this.API_AGR).subscribe({
    next: () => { this.adm.msg = 'Agregados recalculados. Refrescando vista…'; this.adm.loading = false; this.fetch(); },
    error: () => { this.adm.msg = 'Error al recalcular agregados.'; this.adm.loading = false; }
  });
}

}
