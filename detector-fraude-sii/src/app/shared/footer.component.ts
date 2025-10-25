import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer">
      <div class="container footer__inner">
        <div class="footer__cols">
          <div class="footer__col">
            <h4>Proyecto</h4>
            <p>Detector de fraude SII es un prototipo interno orientado a exploración analítica.</p>
          </div>
          <div class="footer__col">
            <h4>Recursos</h4>
            <ul>
              <li><a href="#">Manual de uso</a></li>
              <li><a href="#">Guía de estilos</a></li>
              <li><a href="#">Cronograma</a></li>
            </ul>
          </div>
          <div class="footer__col">
            <h4>Soporte</h4>
            <ul>
              <li><a href="#/ayuda">Centro de ayuda</a></li>
              <li><a href="#">Preguntas frecuentes</a></li>
              <li><a href="#">Mesa de servicio</a></li>
            </ul>
          </div>
        </div>
        <div class="footer__copy">© {{ year }} DF-SII — Uso interno de referencia</div>
      </div>
    </footer>
  `,
  styles: [
    `
      .footer {
        background: #0f1926;
        color: #d6deeb;
        padding: 48px 0 24px;
      }

      .footer__cols {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 32px;
      }

      .footer__col h4 {
        color: #fff;
        margin-bottom: 12px;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        font-size: 14px;
      }

      .footer__col p {
        margin: 0;
        font-size: 14px;
        line-height: 1.6;
      }

      .footer__col ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        gap: 8px;
      }

      .footer__col a {
        color: inherit;
        text-decoration: none;
      }

      .footer__col a:hover,
      .footer__col a:focus-visible {
        color: #fff;
      }

      .footer__copy {
        margin-top: 32px;
        font-size: 12px;
        letter-spacing: 0.03em;
      }

      @media (max-width: 900px) {
        .footer__cols {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class FooterComponent {
  year = new Date().getFullYear();
}
