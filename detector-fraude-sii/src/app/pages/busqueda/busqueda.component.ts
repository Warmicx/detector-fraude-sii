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
  RUT_Emisor: number;
  Actividad_Economica: string;
  Fecha_Registro: string;
  Razon_Social: string;
};

type ApiResponse = {
  items: ApiItem[];
  pagination?: { page: number; limit: number; total: number; pages: number };
  sort?: { by: string; order: 'asc' | 'desc' };
  filters?: Record<string, unknown>;
};

// Base directa (tu proyecto no usa environments)
const API_BASE = 'https://hl1gdqsvoj.execute-api.us-east-1.amazonaws.com/prod';

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
      .get<ApiResponse>(`${API_BASE}/contribuyentes`, { params })
      .subscribe({
        next: (res) => {
          // Mapear a tu modelo UI actual
          this.contribuyentes = (res.items ?? []).map(
            (it): Contribuyente => ({
              rut: String(it.RUT_Emisor), // sin DV (el backend no lo entrega)
              razonSocial: it.Razon_Social,
              giro: it.Actividad_Economica,
              score: 0, // placeholder (no viene en API)
              nivel: 'BAJO', // placeholder (no viene en API)
              comuna: '-', // placeholder (no viene en API)
              fechaRegistro: it.Fecha_Registro,
            })
          );

          // Meta de paginación
          this.total = res.pagination?.total ?? this.contribuyentes.length;
          this.pages = res.pagination?.pages ?? 1;
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
    const results = this.listaVisible();
    if (results.length === 1) {
      // Navega directo al detalle si hay 1 match
      const only = results[0];
      this.router.navigate(['/contribuyente', this.formatRut(only.rut)]);
    } else {
      // Si hay 0 o varios, se muestran en la tabla filtrada (ya ocurre por listaVisible)
    }
  }

  onLimpiar() {
    this.rutQuery = '';
  }
}
