import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer">
      <div class="container footer__inner">
        <div class="footer__col">
          <h4>Proyecto</h4>
          <p><b>Sistema Predictivo de Auditoría Tributaria.</b></p>
          <p><b>Creado por: </b>Carlos Fuentes - Ricardo Medina - Genesis Piña - Marcelo Rozas.</p>
        </div>
        <div class="footer__col">
          <h4>Recursos</h4>
          <ul>
            <li><a href="#/reportes">Reportes de ejemplo</a></li>
            <li><a href="#/ayuda">Documentación interna</a></li>
          </ul>
        </div>
        <div class="footer__col">
          <h4>Soporte</h4>
          <ul>
            <li><a href="#/ayuda">Centro de ayuda</a></li>
            <li><a href="#">Mesa de servicio</a></li>
          </ul>
        </div>
      </div>
      <div class="footer__copy">© {{ year }} SIPAT</div>
    </footer>
  `,
  styles: [`
    :host { display: block; }
    .footer {
      background: #071b35;
      color: #d7deeb;
      padding: 40px 0 24px;
    }
    .footer__inner {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 24px;
    }
    h4 {
      margin: 0 0 12px;
      color: #fff;
      font-size: 1rem;
    }
    p {
      margin: 0;
      max-width: 280px;
      line-height: 1.5;
    }
    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      display: grid;
      gap: 8px;
    }
    a {
      color: inherit;
      text-decoration: none;
    }
    a:hover,
    a:focus-visible {
      color: #fff;
      text-decoration: underline;
      outline: none;
    }
    .footer__copy {
      margin-top: 32px;
      text-align: center;
      font-size: 0.85rem;
      opacity: 0.7;
    }
    @media (max-width: 900px) {
      .footer__inner {
        grid-template-columns: 1fr;
        text-align: center;
      }
      p { margin: 0 auto; }
    }
  `],
})
export class FooterComponent {
  readonly year = new Date().getFullYear();
}
