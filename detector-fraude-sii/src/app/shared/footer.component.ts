import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer">
      <div class="container">
        <div class="cols">
          <div>
            <h4>Detector de Fraude SII</h4>
            <p>Proyecto académico — Frontend Angular 16</p>
          </div>
          <div>
            <h4>Recursos</h4>
            <ul>
              <li><a href="#" rel="nofollow">API Docs</a></li>
              <li><a href="#" rel="nofollow">Glosario</a></li>
            </ul>
          </div>
          <div>
            <h4>Soporte</h4>
            <ul>
              <li><a href="#/ayuda">Ayuda</a></li>
              <li><a href="#" rel="nofollow">Contacto</a></li>
            </ul>
          </div>
        </div>
        <div class="copy">© {{year}} — Demo académica</div>
      </div>
    </footer>
  `,
  styles: [`
    .footer { background: #0f1b2b; color: #cfd6e4; padding: 32px 0 16px; }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 16px; }
    .cols { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
    .cols h4 { color: #fff; margin: 0 0 8px; }
    .cols a { color: #cfd6e4; text-decoration: none; }
    .copy { margin-top: 24px; font-size: 12px; opacity: .8; }
    @media (max-width: 900px) { .cols { grid-template-columns: 1fr; } }
  `]
})
export class FooterComponent {
  year = new Date().getFullYear();
}
