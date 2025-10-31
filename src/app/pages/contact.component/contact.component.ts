// contact.component.ts
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from "../../components/UI/header.component/header.component";

type ContactType = 'empresa' | 'institucion' | 'alumno';

interface ContactOption {
  type: ContactType;
  icon: string;
  title: string;
  description: string;
  color: string;
}

interface FormData {
  contactType: ContactType;
  nombre: string;
  email: string;
  telefono: string;
  // Campos específicos para empresa
  nombreEmpresa?: string;
  cargo?: string;
  tipoApoyo?: string;
  // Campos específicos para institución
  nombreInstitucion?: string;
  tipoInstitucion?: string;
  numeroEstudiantes?: string;
  // Campos específicos para alumno
  edad?: string;
  grado?: string;
  colegio?: string;
  // Comunes
  mensaje: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, PageHeaderComponent],
  template: `
    <section class="contact-page">
      <!-- Contact Type Selection -->
      <div class="contact-types-section">
        <div class="container">
          <div class="section-header">
            <app-page-header [backgroundImage]="'imgPrincipal.webp'" [title]="'¿Como quieres contactarmos?'" [breadcrumbs]="[
        { label: 'Inicio', path: '/' },
        { label: 'Contacto', path: '/contact' }
      ]"/>
          </div>

          <div class="contact-types-grid">
            @for (option of contactOptions; track option.type) {
              <button
                class="contact-type-card"
                [class.active]="selectedType() === option.type"
                [style.border-color]="selectedType() === option.type ? option.color : 'transparent'"
                (click)="selectType(option.type)">
                <div class="card-icon" [style.color]="option.color" [innerHTML]="option.icon"></div>
                <h3 class="card-title">{{ option.title }}</h3>
                <p class="card-description">{{ option.description }}</p>
                <div class="card-check" [style.background]="option.color">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
              </button>
            }
          </div>
        </div>
      </div>

      <!-- Contact Form & Info -->
      <div class="contact-content-section">
        <div class="container">
          <div class="contact-grid">
            <!-- Contact Form -->
            <div class="form-column">
              <div class="form-card">
                <div class="form-header">
                  <h3 class="form-title">Envíanos tu mensaje</h3>
                  <p class="form-subtitle">
                    {{ getFormSubtitle() }}
                  </p>
                </div>

                <form class="contact-form" (ngSubmit)="handleSubmit()" #contactForm="ngForm">
                  <!-- Campos Comunes -->
                  <div class="form-row">
                    <div class="form-group">
                      <label class="form-label">
                        Nombre completo
                        <span class="required">*</span>
                      </label>
                      <input
                        type="text"
                        class="form-input"
                        [(ngModel)]="formData.nombre"
                        name="nombre"
                        placeholder="Ingresa tu nombre completo"
                        required>
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="form-group">
                      <label class="form-label">
                        Correo electrónico
                        <span class="required">*</span>
                      </label>
                      <input
                        type="email"
                        class="form-input"
                        [(ngModel)]="formData.email"
                        name="email"
                        placeholder="tucorreo@ejemplo.com"
                        required>
                    </div>

                    <div class="form-group">
                      <label class="form-label">
                        Teléfono
                        <span class="required">*</span>
                      </label>
                      <input
                        type="tel"
                        class="form-input"
                        [(ngModel)]="formData.telefono"
                        name="telefono"
                        placeholder="+51 999 999 999"
                        required>
                    </div>
                  </div>

                  <!-- Campos específicos para EMPRESA -->
                  @if (selectedType() === 'empresa') {
                    <div class="form-row">
                      <div class="form-group">
                        <label class="form-label">
                          Nombre de la empresa
                          <span class="required">*</span>
                        </label>
                        <input
                          type="text"
                          class="form-input"
                          [(ngModel)]="formData.nombreEmpresa"
                          name="nombreEmpresa"
                          placeholder="Nombre de tu empresa"
                          required>
                      </div>

                      <div class="form-group">
                        <label class="form-label">Cargo</label>
                        <input
                          type="text"
                          class="form-input"
                          [(ngModel)]="formData.cargo"
                          name="cargo"
                          placeholder="Tu cargo en la empresa">
                      </div>
                    </div>

                    <div class="form-row">
                      <div class="form-group">
                        <label class="form-label">Tipo de apoyo</label>
                        <select
                          class="form-input"
                          [(ngModel)]="formData.tipoApoyo"
                          name="tipoApoyo">
                          <option value="">Selecciona una opción</option>
                          <option value="donacion">Donación económica</option>
                          <option value="voluntariado">Voluntariado corporativo</option>
                          <option value="patrocinio">Patrocinio de evento</option>
                          <option value="alianza">Alianza estratégica</option>
                          <option value="otro">Otro</option>
                        </select>
                      </div>
                    </div>
                  }

                  <!-- Campos específicos para INSTITUCIÓN -->
                  @if (selectedType() === 'institucion') {
                    <div class="form-row">
                      <div class="form-group">
                        <label class="form-label">
                          Nombre de la institución
                          <span class="required">*</span>
                        </label>
                        <input
                          type="text"
                          class="form-input"
                          [(ngModel)]="formData.nombreInstitucion"
                          name="nombreInstitucion"
                          placeholder="Nombre del colegio o institución"
                          required>
                      </div>
                    </div>

                    <div class="form-row">
                      <div class="form-group">
                        <label class="form-label">Tipo de institución</label>
                        <select
                          class="form-input"
                          [(ngModel)]="formData.tipoInstitucion"
                          name="tipoInstitucion">
                          <option value="">Selecciona una opción</option>
                          <option value="colegio-publico">Colegio Público</option>
                          <option value="colegio-privado">Colegio Privado</option>
                          <option value="instituto">Instituto Técnico</option>
                          <option value="universidad">Universidad</option>
                          <option value="ong">ONG</option>
                          <option value="otro">Otro</option>
                        </select>
                      </div>

                      <div class="form-group">
                        <label class="form-label">Número de estudiantes</label>
                        <input
                          type="text"
                          class="form-input"
                          [(ngModel)]="formData.numeroEstudiantes"
                          name="numeroEstudiantes"
                          placeholder="Aprox. cuántos estudiantes">
                      </div>
                    </div>
                  }

                  <!-- Campos específicos para ALUMNO -->
                  @if (selectedType() === 'alumno') {
                    <div class="form-row">
                      <div class="form-group">
                        <label class="form-label">Edad</label>
                        <input
                          type="number"
                          class="form-input"
                          [(ngModel)]="formData.edad"
                          name="edad"
                          placeholder="Tu edad"
                          min="10"
                          max="30">
                      </div>

                      <div class="form-group">
                        <label class="form-label">Grado/Nivel</label>
                        <select
                          class="form-input"
                          [(ngModel)]="formData.grado"
                          name="grado">
                          <option value="">Selecciona tu grado</option>
                          <option value="1-secundaria">1° Secundaria</option>
                          <option value="2-secundaria">2° Secundaria</option>
                          <option value="3-secundaria">3° Secundaria</option>
                          <option value="4-secundaria">4° Secundaria</option>
                          <option value="5-secundaria">5° Secundaria</option>
                          <option value="universidad">Universidad</option>
                          <option value="instituto">Instituto</option>
                          <option value="otro">Otro</option>
                        </select>
                      </div>
                    </div>

                    <div class="form-row">
                      <div class="form-group">
                        <label class="form-label">Colegio/Institución</label>
                        <input
                          type="text"
                          class="form-input"
                          [(ngModel)]="formData.colegio"
                          name="colegio"
                          placeholder="Nombre de tu colegio o institución">
                      </div>
                    </div>
                  }

                  <!-- Mensaje (común para todos) -->
                  <div class="form-row">
                    <div class="form-group">
                      <label class="form-label">
                        Mensaje
                        <span class="required">*</span>
                      </label>
                      <textarea
                        class="form-textarea"
                        [(ngModel)]="formData.mensaje"
                        name="mensaje"
                        rows="5"
                        placeholder="{{ getMessagePlaceholder() }}"
                        required></textarea>
                    </div>
                  </div>

                  <!-- Submit Button -->
                  <button type="submit" class="submit-btn" [disabled]="isSubmitting()">
                    @if (isSubmitting()) {
                      <span class="spinner"></span>
                      Enviando...
                    } @else {
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                      </svg>
                      Enviar mensaje
                    }
                  </button>

                  @if (submitSuccess()) {
                    <div class="success-message">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      ¡Mensaje enviado con éxito! Nos contactaremos contigo pronto.
                    </div>
                  }
                </form>
              </div>
            </div>

            <!-- Contact Info -->
            <div class="info-column">
              <!-- Contact Details -->
              <div class="info-card">
                <h3 class="info-title">Información de contacto</h3>
                <div class="contact-details">
                  <div class="contact-item">
                    <div class="contact-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </div>
                    <div class="contact-text">
                      <span class="contact-label">Correo</span>
                      <a href="mailto:coachsemillasytalentos@gmail.com" class="contact-value">
                        coachsemillasytalentos@gmail.com
                      </a>
                    </div>
                  </div>

                  <div class="contact-item">
                    <div class="contact-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </div>
                    <div class="contact-text">
                      <span class="contact-label">Teléfono / WhatsApp</span>
                      <a href="tel:+51916658609" class="contact-value">+51 916 658 609</a>
                    </div>
                  </div>

                  <div class="contact-item">
                    <div class="contact-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                    </div>
                    <div class="contact-text">
                      <span class="contact-label">Ubicación</span>
                      <span class="contact-value">Lima, Perú</span>
                    </div>
                  </div>

                  <div class="contact-item">
                    <div class="contact-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                    </div>
                    <div class="contact-text">
                      <span class="contact-label">Horario de atención</span>
                      <span class="contact-value">Lun - Vie: 9:00 AM - 6:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>


              <!-- FAQ Quick Links -->
              <div class="info-card">
                <h3 class="info-title">Preguntas frecuentes</h3>
                <div class="faq-links">
                  <a href="#" class="faq-link">¿Cómo puedo hacer una donación?</a>
                  <a href="#" class="faq-link">¿Cómo solicitar una charla en mi colegio?</a>
                  <a href="#" class="faq-link">¿Cómo ser voluntario?</a>
                  <a href="#" class="faq-link">¿Los servicios tienen costo?</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    /* Variables */
    :host {
      display: block;
    }

    /* Contact Types Section */
    .contact-types-section {
      padding: 4rem 0;
      background: linear-gradient(180deg, #f7fafc 0%, #ffffff 100%);
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    .section-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .section-title {
      font-size: 2.5rem;
      font-weight: 800;
      color: #1a202c;
      margin: 0 0 1rem 0;
    }

    .section-subtitle {
      font-size: 1.25rem;
      color: #718096;
      margin: 0;
    }

    .contact-types-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
    }

    .contact-type-card {
      position: relative;
      padding: 2.5rem 2rem;
      background: white;
      border: 3px solid transparent;
      border-radius: 20px;
      cursor: pointer;
      transition: all 0.3s ease;
      text-align: center;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    }

    .contact-type-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12);
    }

    .contact-type-card.active {
      box-shadow: 0 15px 50px rgba(102, 126, 234, 0.25);
    }

    .card-icon {
      font-size: 3.5rem;
      margin-bottom: 1.5rem;
      display: flex;
      justify-content: center;
    }

    .card-icon :deep(svg) {
      width: 56px;
      height: 56px;
    }

    .card-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: #1a202c;
      margin: 0 0 0.75rem 0;
    }

    .card-description {
      font-size: 1rem;
      color: #718096;
      line-height: 1.6;
      margin: 0;
    }

    .card-check {
      position: absolute;
      top: 1rem;
      right: 1rem;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transform: scale(0.5);
      transition: all 0.3s ease;
    }

    .contact-type-card.active .card-check {
      opacity: 1;
      transform: scale(1);
    }

    /* Contact Content Section */
    .contact-content-section {
      padding: 4rem 0;
      background: white;
    }

    .contact-grid {
      display: grid;
      grid-template-columns: 1.5fr 1fr;
      gap: 3rem;
    }

    /* Form */
    .form-card {
      background: #f7fafc;
      border-radius: 20px;
      padding: 3rem;
    }

    .form-header {
      margin-bottom: 2rem;
    }

    .form-title {
      font-size: 2rem;
      font-weight: 700;
      color: #1a202c;
      margin: 0 0 0.5rem 0;
    }

    .form-subtitle {
      font-size: 1.05rem;
      color: #718096;
      margin: 0;
    }

    .contact-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .form-row:has(.form-group + .form-group) {
      grid-template-columns: 1fr 1fr;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .form-label {
      font-size: 0.95rem;
      font-weight: 600;
      color: #2d3748;
    }

    .required {
      color: #e53e3e;
      margin-left: 0.25rem;
    }

    .form-input,
    .form-textarea {
      padding: 0.875rem 1.25rem;
      border: 2px solid #e2e8f0;
      border-radius: 12px;
      font-size: 1rem;
      color: #2d3748;
      background: white;
      transition: all 0.3s ease;
      font-family: inherit;
    }

    .form-input:focus,
    .form-textarea:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .form-textarea {
      resize: vertical;
      min-height: 120px;
    }

    .submit-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      padding: 1.125rem 2.5rem;
      background: linear-gradient(135deg, #667eea 0%, #4ba272ff 100%);
      color: white;
      border: none;
      border-radius: 12px;
      font-size: 1.125rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
    }

    .submit-btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 6px 25px rgba(102, 126, 234, 0.5);
    }

    .submit-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .spinner {
      width: 20px;
      height: 20px;
      border: 3px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top-color: white;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .success-message {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem 1.25rem;
      background: #10b981;
      color: white;
      border-radius: 12px;
      font-weight: 500;
    }

    /* Info Column */
    .info-column {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .info-card {
      padding: 2rem;
      background: white;
      border-radius: 20px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    }

    .info-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: #1a202c;
      margin: 0 0 1.5rem 0;
    }

    .contact-details {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .contact-item {
      display: flex;
      gap: 1rem;
      align-items: flex-start;
    }

    .contact-icon {
      flex-shrink: 0;
      width: 48px;
      height: 48px;
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #667eea;
    }

    .contact-text {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .contact-label {
      font-size: 0.875rem;
      font-weight: 600;
      color: #718096;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .contact-value {
      font-size: 1.05rem;
      color: #2d3748;
      font-weight: 500;
      text-decoration: none;
      transition: color 0.3s ease;
    }

    a.contact-value:hover {
      color: #667eea;
    }



    /* FAQ Links */
    .faq-links {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .faq-link {
      display: flex;
      align-items: center;
      padding: 0.875rem 1rem;
      background: #f7fafc;
      border-radius: 10px;
      color: #2d3748;
      text-decoration: none;
      font-weight: 500;
      transition: all 0.3s ease;
      border: 2px solid transparent;
    }

    .faq-link::before {
      content: '→';
      margin-right: 0.75rem;
      color: #667eea;
      font-weight: bold;
      transition: transform 0.3s ease;
    }

    .faq-link:hover {
      background: white;
      border-color: #667eea;
      transform: translateX(5px);
    }

    .faq-link:hover::before {
      transform: translateX(3px);
    }

    /* Responsive Design */
    @media (max-width: 1024px) {
      .contact-types-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }

      .contact-grid {
        grid-template-columns: 1fr;
        gap: 2.5rem;
      }

      .form-card {
        padding: 2rem;
      }
    }

    @media (max-width: 768px) {
      .contact-types-section {
        padding: 3rem 0;
      }

      .section-title {
        font-size: 2rem;
      }

      .section-subtitle {
        font-size: 1.1rem;
      }

      .contact-type-card {
        padding: 2rem 1.5rem;
      }

      .card-icon {
        font-size: 3rem;
      }

      .card-title {
        font-size: 1.25rem;
      }

      .form-row:has(.form-group + .form-group) {
        grid-template-columns: 1fr;
      }

      .form-title {
        font-size: 1.75rem;
      }

      .contact-content-section {
        padding: 3rem 0;
      }
    }

    @media (max-width: 480px) {
      .container {
        padding: 0 1rem;
      }

      .contact-types-section {
        padding: 2rem 0;
      }

      .section-header {
        margin-bottom: 2rem;
      }

      .section-title {
        font-size: 1.75rem;
      }

      .form-card {
        padding: 1.5rem;
      }

      .form-title {
        font-size: 1.5rem;
      }

      .info-card {
        padding: 1.5rem;
      }

      .submit-btn {
        padding: 1rem 2rem;
        font-size: 1rem;
      }
    }
  `]
})
export class ContactComponent {
  // Contact type options
  contactOptions: ContactOption[] = [
    {
      type: 'empresa',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
      </svg>`,
      title: 'Empresa',
      description: 'Quiero apoyar con donaciones o establecer una alianza estratégica',
      color: '#3b82f6'
    },
    {
      type: 'institucion',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
      </svg>`,
      title: 'Institución Educativa',
      description: 'Represento un colegio o institución que requiere nuestros servicios',
      color: '#10b981'
    },
    {
      type: 'alumno',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
        <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
      </svg>`,
      title: 'Alumno',
      description: 'Soy estudiante y necesito asesoría o quiero participar en los programas',
      color: '#f59e0b'
    }
  ];

  // Signals
  selectedType = signal<ContactType>('empresa');
  isSubmitting = signal(false);
  submitSuccess = signal(false);

  // Form data
  formData: FormData = {
    contactType: 'empresa',
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  };

  selectType(type: ContactType): void {
    this.selectedType.set(type);
    this.formData.contactType = type;
    this.submitSuccess.set(false);
  }

  getFormSubtitle(): string {
    const subtitles = {
      empresa: 'Cuéntanos cómo tu empresa puede contribuir a nuestra misión',
      institucion: 'Explícanos las necesidades de tu institución y cómo podemos ayudar',
      alumno: 'Comparte tus inquietudes y te brindaremos la orientación que necesitas'
    };
    return subtitles[this.selectedType()];
  }

  getMessagePlaceholder(): string {
    const placeholders = {
      empresa: 'Cuéntanos sobre tu empresa y cómo te gustaría colaborar con nosotros...',
      institucion: 'Describe las necesidades de tu institución, número de estudiantes que podrían beneficiarse, fechas disponibles, etc...',
      alumno: 'Cuéntanos sobre tus metas, desafíos o preguntas. ¿En qué área necesitas orientación?'
    };
    return placeholders[this.selectedType()];
  }

  handleSubmit(): void {
    this.isSubmitting.set(true);

    // Simular envío (aquí conectarías con tu backend)
    setTimeout(() => {
      console.log('Form submitted:', this.formData);
      this.isSubmitting.set(false);
      this.submitSuccess.set(true);

      // Reset form después de 5 segundos
      setTimeout(() => {
        this.submitSuccess.set(false);
        this.resetForm();
      }, 5000);
    }, 2000);
  }

  resetForm(): void {
    this.formData = {
      contactType: this.selectedType(),
      nombre: '',
      email: '',
      telefono: '',
      mensaje: ''
    };

  }
}
