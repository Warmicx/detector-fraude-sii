import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="footer" role="contentinfo">
      <div class="container footer__grid">
        <div class="footer__column">
          <h4>Proyecto</h4>
          <p>
            Detector de Fraude SII es una maqueta visual orientada a mostrar la exploración
            de contribuyentes y alertas con un enfoque institucional.
          </p>
        </div>
        <div class="footer__column">
          <h4>Recursos</h4>
          <ul>
            <li><a href="#">Manual de uso</a></li>
            <li><a href="#">Glosario de variables</a></li>
            <li><a href="#">Lineamientos de datos</a></li>
          </ul>
        </div>
        <div class="footer__column">
          <h4>Soporte</h4>
          <ul>
            <li><a routerLink="/ayuda">Centro de ayuda</a></li>
            <li><a href="#">Preguntas frecuentes</a></li>
            <li><a href="#">Contacto interno</a></li>
          </ul>
        </div>
      </div>
      <div class="footer__bottom">
        © {{ year }} DF-SII — Uso interno demostrativo.
      </div>
    </footer>
  `,
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  protected readonly year = new Date().getFullYear();
}
