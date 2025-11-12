import { Component, OnInit, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RouterLink } from '@angular/router';

type Severidad = 'BAJA' | 'MEDIA' | 'ALTA';

interface Alerta {
  id: string;
  rut: string; // formateado con puntos
  rutParam: string; // solo dígitos para la ruta
  razonSocial: string;
  fecha: string; // mm/yyyy
  severidad: Severidad;
  regla: string;
  score?: number | null;
}

// API contribuyentes_detalle
type ApiItem = {
  rut_emisor: number;
  razon_social?: string;
  actividad_economica?: string;
  max_score?: number | null;
  max_nivel_riesgo?: string | null; // 'alto'|'medio'|'bajo'
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
const API_BASE = 'https://55duhjg8v9.execute-api.us-east-1.amazonaws.com/prod';

@Component({
  selector: 'app-alertas',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.scss'],
})
export class AlertasComponent implements OnInit {
  private http = inject(HttpClient);

  estados = ['Abiertas', 'En seguimiento', 'Resueltas'];
  severidades: Severidad[] = ['ALTA', 'MEDIA', 'BAJA'];

  // Estado de API/paginación
  loading = false;
  error: string | null = null;
  page = 1;
  limit = 10;
  total = 0;
  pages = 0;

  // Filtro local por severidad
  filtroSeveridad: Set<Severidad> = new Set(); // vacío = todas

  alertas: Alerta[] = [];

  ngOnInit(): void {
    this.fetch();
  }

  private normalizaSeveridad(v?: string | null): Severidad {
    const s = (v || '').toString().trim().toUpperCase();
    if (s === 'ALTO') return 'ALTA';
    if (s === 'MEDIO' || s === 'MEDIA') return 'MEDIA';
    if (s === 'BAJO' || s === 'BAJA') return 'BAJA';
    return 'BAJA';
  }

  private formatRut(n: number | string): string {
    const s = String(n).replace(/\D+/g, '');
    return s.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  fetch(): void {
    this.loading = true;
    this.error = null;
    const params = new HttpParams().set('page', this.page).set('limit', this.limit);
    this.http
      .get<ApiResponse>(`${API_BASE}/contribuyentes_detalle`, { params })
      .subscribe({
        next: (res) => {
          const items = res.items || [];
          this.alertas = items.map((it): Alerta => {
            const sev = this.normalizaSeveridad(it.max_nivel_riesgo);
            const y = it.anio_max_score || new Date().getFullYear();
            const m = it.mes_max_score || new Date().getMonth() + 1;
            const fecha = `${String(m).padStart(2, '0')}/${y}`;
            return {
              id: `ALR-${it.rut_emisor}-${y}${String(m).padStart(2, '0')}`,
              rut: this.formatRut(it.rut_emisor),
              rutParam: String(it.rut_emisor),
              razonSocial: it.razon_social || '-',
              fecha,
              severidad: sev,
              regla:
                sev === 'ALTA'
                  ? 'Riesgo alto detectado'
                  : sev === 'MEDIA'
                  ? 'Riesgo medio historico'
                  : 'Riesgo bajo historico',
              score: it.max_score ?? null,
            };
          });
          const count = res.count ?? this.alertas.length;
          const limit = res.limit ?? this.limit;
          this.total = count;
          this.pages = count && limit ? Math.max(1, Math.ceil(count / limit)) : 1;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error alertas', err);
          this.error = 'No se pudieron cargar las alertas.';
          this.alertas = [];
          this.loading = false;
        },
      });
  }

  toggleSeveridad(s: Severidad) {
    if (this.filtroSeveridad.has(s)) this.filtroSeveridad.delete(s);
    else this.filtroSeveridad.add(s);
  }

  visibles(): Alerta[] {
    const arr = this.alertas.slice();
    const filtered = this.filtroSeveridad.size
      ? arr.filter((a) => this.filtroSeveridad.has(a.severidad))
      : arr;
    // Ordenar: ALTA > MEDIA > BAJA, y por score desc si hay
    const order: Record<Severidad, number> = { ALTA: 0, MEDIA: 1, BAJA: 2 };
    return filtered.sort((a, b) => {
      const s = order[a.severidad] - order[b.severidad];
      if (s !== 0) return s;
      return (b.score || 0) - (a.score || 0);
    });
  }

  nextPage() {
    if (this.page < this.pages) {
      this.page++;
      this.fetch();
    }
  }
  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.fetch();
    }
  }
}
