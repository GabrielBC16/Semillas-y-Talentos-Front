import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DomSanitizer,SafeHtml } from '@angular/platform-browser';

interface FooterLink {
  label: string;
  path?: string;
  external?: string;
}

interface SocialLink {
  name: string;
  url: string;
  icon: SafeHtml;
  ariaLabel: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="footer">
      <!-- Main Footer Content -->
      <div class="footer-main">
        <div class="footer-container">
          <!-- About Section -->
          <div class="footer-section footer-about">
            
            <h4 class="section-title">Conoce a Semillas & Talentos</h4>
            <p class="about-text">
              Somos una Asociación Civil sin fines de lucro que promueve el 
              <strong>empoderamiento de los jóvenes</strong>, la 
              <strong>igualdad de oportunidades</strong>, y la 
              <strong>superación personal</strong>.
            </p>
            <a routerLink="/nosotros" class="btn-learn-more">
              Conocer más sobre nosotros
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>

          <!-- Links Section -->
          <div class="footer-section">
            <h4 class="section-title">Enlaces de Interés</h4>
            <ul class="footer-links">
              @for (link of interestLinks; track link.label) {
                <li>
                  @if (link.external) {
                    <a [href]="link.external" target="_blank" rel="noopener noreferrer" class="footer-link">
                      {{ link.label }}
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </a>
                  } @else {
                    <a [routerLink]="link.path" class="footer-link">
                      {{ link.label }}
                    </a>
                  }
                </li>
              }
            </ul>
          </div>

          <!-- Quick Links Section -->
          <div class="footer-section">
            <h4 class="section-title">Acceso Rápido</h4>
            <ul class="footer-links">
              @for (link of quickLinks; track link.label) {
                <li>
                  <a [routerLink]="link.path" class="footer-link">
                    {{ link.label }}
                  </a>
                </li>
              }
            </ul>
          </div>

          <!-- Contact Section -->
          <div class="footer-section">
            <h4 class="section-title">Contáctanos</h4>
            <ul class="contact-list">
              <li class="contact-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <div class="contact-info">
                  <span class="contact-label">Correo</span>
                  <a href="mailto:coachsemillasytalentos@gmail.com" class="contact-link">
                    coachsemillasytalentos@gmail.com
                  </a>
                </div>
              </li>
              <li class="contact-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <div class="contact-info">
                  <span class="contact-label">Teléfono</span>
                  <a href="tel:+51916658609" class="contact-link">
                    +51 916 658 609
                  </a>
                </div>
              </li>
              <li class="contact-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <div class="contact-info">
                  <span class="contact-label">Ubicación</span>
                  <span class="contact-text">Lima, Perú</span>
                </div>
              </li>
            </ul>

            <!-- Social Media -->
            <div class="social-section">
              <h5 class="social-title">Síguenos</h5>
              <div class="social-links">
                @for (social of socialLinks; track social.name) {
                  <a 
                    [href]="social.url" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="social-link"
                    [attr.aria-label]="social.ariaLabel"
                    [title]="social.name">
                    <span [innerHTML]="social.icon"></span>
                  </a>
                }
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Banner (optional) -->
      <div class="footer-cta">
        <div class="footer-container">
          <div class="cta-content">
            <div class="cta-text">
              <h3 class="cta-title">¿Quieres ser parte del cambio?</h3>
              <p class="cta-subtitle">Únete como voluntario o haz una donación para apoyar nuestra misión</p>
            </div>
            <div class="cta-buttons">
              <a routerLink="/voluntariado" class="cta-btn cta-btn-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                Ser Voluntario
              </a>
              <a routerLink="/donar" class="cta-btn cta-btn-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                Donar Ahora
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="footer-bottom">
        <div class="footer-container">
          <div class="bottom-content">
            <p class="copyright">
              © {{ currentYear }} Semillas & Talentos. Todos los derechos reservados.
            </p>
            <div class="legal-links">
              <a routerLink="/privacidad" class="legal-link">Política de Privacidad</a>
              <span class="separator">•</span>
              <a routerLink="/terminos" class="legal-link">Términos de Uso</a>
              <span class="separator">•</span>
              <a routerLink="/cookies" class="legal-link">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    /* Variables */
    :host {
      --footer-bg: #1a202c;
      --footer-bg-light: #2d3748;
      --footer-text: #e2e8f0;
      --footer-text-muted: #a0aec0;
      --footer-border: #4a5568;
      --primary-gradient: linear-gradient(135deg, #667eea 0%, #4ba272ff 100%);
      --cta-bg: #2d3748;
    }

    /* Main Footer */
    .footer {
      background: var(--footer-bg);
      color: var(--footer-text);
    }

    .footer-main {
      padding: 4rem 0 2rem;
      border-bottom: 1px solid var(--footer-border);
    }

    .footer-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    .footer-main .footer-container {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1.5fr;
      gap: 3rem;
    }

    /* Footer Sections */
    .footer-section {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .section-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: white;
      margin: 0;
      position: relative;
      padding-bottom: 0.75rem;
    }

    .section-title::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 50px;
      height: 3px;
      background: var(--primary-gradient);
      border-radius: 2px;
    }

    /* About Section */
    .footer-logo {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .footer-logo-img {
      height: 70px;
      width: auto;
    }

    .footer-logo-text {
      font-size: 1.5rem;
      font-weight: 700;
      background: var(--primary-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin: 0;
    }

    .about-text {
      line-height: 1.7;
      color: var(--footer-text-muted);
      margin: 0;
    }

    .about-text strong {
      color: var(--footer-text);
      font-weight: 600;
    }

    .btn-learn-more {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      background: transparent;
      color: white;
      border: 2px solid rgba(255, 255, 255, 0.2);
      border-radius: 50px;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.9rem;
      transition: all 0.3s ease;
      margin-top: 1rem;
      width: fit-content;
    }

    .btn-learn-more:hover {
      background: var(--primary-gradient);
      border-color: transparent;
      transform: translateX(5px);
    }

    /* Links */
    .footer-links {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .footer-link {
      color: var(--footer-text-muted);
      text-decoration: none;
      transition: all 0.3s ease;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.95rem;
    }

    .footer-link:hover {
      color: white;
      transform: translateX(5px);
    }

    .footer-link svg {
      opacity: 0;
      transition: opacity 0.3s ease;
      flex-shrink: 0;
    }

    .footer-link:hover svg {
      opacity: 1;
    }

    /* Contact Section */
    .contact-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .contact-item {
      display: flex;
      gap: 1rem;
      align-items: flex-start;
    }

    .contact-item svg {
      flex-shrink: 0;
      color: var(--footer-text-muted);
      margin-top: 0.25rem;
    }

    .contact-info {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .contact-label {
      font-size: 0.75rem;
      text-transform: uppercase;
      color: var(--footer-text-muted);
      font-weight: 600;
      letter-spacing: 0.5px;
    }

    .contact-link {
      color: var(--footer-text);
      text-decoration: none;
      font-size: 0.95rem;
      transition: color 0.3s ease;
    }

    .contact-link:hover {
      color: white;
    }

    .contact-text {
      color: var(--footer-text);
      font-size: 0.95rem;
    }

    /* Social Media */
    .social-section {
      margin-top: 1rem;
    }

    .social-title {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--footer-text);
      margin: 0 0 1rem 0;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .social-links {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
    }

    .social-link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      background: var(--footer-bg-light);
      border-radius: 12px;
      color: var(--footer-text);
      transition: all 0.3s ease;
      border: 1px solid transparent;
    }

    .social-link:hover {
      background: var(--primary-gradient);
      transform: translateY(-3px);
      box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
    }

    /* CTA Banner */
    .footer-cta {
      background: var(--cta-bg);
      padding: 3rem 0;
      border-bottom: 1px solid var(--footer-border);
    }

    .cta-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
    }

    .cta-text {
      flex: 1;
    }

    .cta-title {
      font-size: 2rem;
      font-weight: 700;
      color: white;
      margin: 0 0 0.5rem 0;
    }

    .cta-subtitle {
      font-size: 1.1rem;
      color: var(--footer-text-muted);
      margin: 0;
    }

    .cta-buttons {
      display: flex;
      gap: 1rem;
      flex-shrink: 0;
    }

    .cta-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem 2rem;
      border-radius: 50px;
      text-decoration: none;
      font-weight: 600;
      font-size: 1rem;
      transition: all 0.3s ease;
    }

    .cta-btn-primary {
      background: var(--primary-gradient);
      color: white;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    }

    .cta-btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
    }

    .cta-btn-secondary {
      background: transparent;
      color: white;
      border: 2px solid rgba(255, 255, 255, 0.2);
    }

    .cta-btn-secondary:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.4);
    }

    /* Bottom Bar */
    .footer-bottom {
      padding: 2rem 0;
      background: var(--footer-bg);
    }

    .bottom-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .copyright {
      color: var(--footer-text-muted);
      margin: 0;
      font-size: 0.9rem;
    }

    .legal-links {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .legal-link {
      color: var(--footer-text-muted);
      text-decoration: none;
      font-size: 0.9rem;
      transition: color 0.3s ease;
    }

    .legal-link:hover {
      color: white;
    }

    .separator {
      color: var(--footer-border);
    }

    /* Responsive Design */
    @media (max-width: 1200px) {
      .footer-main .footer-container {
        grid-template-columns: 1.5fr 1fr 1fr 1.5fr;
      }
    }

    @media (max-width: 1024px) {
      .footer-main .footer-container {
        grid-template-columns: repeat(2, 1fr);
        gap: 3rem 2rem;
      }

      .footer-about {
        grid-column: span 2;
      }

      .cta-content {
        flex-direction: column;
        text-align: center;
      }

      .cta-title {
        font-size: 1.75rem;
      }

      .cta-buttons {
        width: 100%;
        justify-content: center;
      }
    }

    @media (max-width: 768px) {
      .footer-main {
        padding: 3rem 0 1.5rem;
      }

      .footer-main .footer-container {
        grid-template-columns: 1fr;
        gap: 2.5rem;
      }

      .footer-about {
        grid-column: span 1;
      }

      .section-title {
        font-size: 1.1rem;
      }

      .footer-cta {
        padding: 2rem 0;
      }

      .cta-title {
        font-size: 1.5rem;
      }

      .cta-subtitle {
        font-size: 1rem;
      }

      .cta-buttons {
        flex-direction: column;
        width: 100%;
      }

      .cta-btn {
        width: 100%;
        justify-content: center;
      }

      .bottom-content {
        flex-direction: column;
        text-align: center;
      }

      .legal-links {
        flex-wrap: wrap;
        justify-content: center;
      }
    }

    @media (max-width: 480px) {
      .footer-container {
        padding: 0 1rem;
      }

      .footer-main {
        padding: 2rem 0 1rem;
      }

      .footer-logo-img {
        height: 40px;
      }

      .footer-logo-text {
        font-size: 1.25rem;
      }

      .cta-title {
        font-size: 1.25rem;
      }

      .cta-subtitle {
        font-size: 0.9rem;
      }

      .social-links {
        gap: 0.5rem;
      }

      .social-link {
        width: 40px;
        height: 40px;
      }
    }
  `]
})
export class FooterComponent implements OnInit{

   constructor(private sanitizer: DomSanitizer) {}
  
  socialLinks: SocialLink[] = [];
  currentYear = new Date().getFullYear();

  interestLinks: FooterLink[] = [
    { 
      label: 'Resultados charla en I.E. Micaela Bastidas', 
      external: 'https://example.com/resultados-micaela-bastidas' 
    },
    { 
      label: 'Resultados de charla Politécnico del Callao', 
      external: 'https://example.com/resultados-politecnico' 
    },
    { label: 'Términos Legales', path: '/terminos' },
    { label: 'Trabaja con Nosotros', path: '/trabaja-con-nosotros' }
  ];

  quickLinks: FooterLink[] = [
    { label: 'Inicio', path: '/' },
    { label: 'Programas', path: '/programas' },
    { label: 'Proyectos', path: '/proyectos' },
    { label: 'Testimonios', path: '/testimonios' },
    { label: 'Blog', path: '/blog' },
    { label: 'Galería', path: '/galeria' }
  ];

  ngOnInit(): void {
    this.socialLinks = [
    {
      name: 'Facebook',
      url: 'https://facebook.com/semillasytalentos',
      ariaLabel: 'Síguenos en Facebook',
      icon: this.sanitizer.bypassSecurityTrustHtml(`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>`)
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/semillasytalentos',
      ariaLabel: 'Síguenos en Instagram',
      icon: this.sanitizer.bypassSecurityTrustHtml(`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>`)
    },
    {
      name: 'WhatsApp',
      url: 'https://wa.me/51916658609',
      ariaLabel: 'Contáctanos por WhatsApp',
      icon: this.sanitizer.bypassSecurityTrustHtml(`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>`)
    },
    {
      name: 'YouTube',
      url: 'https://youtube.com/@semillasytalentos',
      ariaLabel: 'Suscríbete a nuestro canal de YouTube',
      icon: this.sanitizer.bypassSecurityTrustHtml(`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>`)
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/company/semillasytalentos',
      ariaLabel: 'Conéctate con nosotros en LinkedIn',
      icon: this.sanitizer.bypassSecurityTrustHtml(`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>`)
    },
    {
      name: 'TikTok',
      url: 'https://tiktok.com/@semillasytalentos',
      ariaLabel: 'Síguenos en TikTok',
      icon: this.sanitizer.bypassSecurityTrustHtml(`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
      </svg>`)
    }];
  }
  
  }