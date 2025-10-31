// donations.component.ts
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface DonationAmount {
  value: number;
  label: string;
  description: string;
  icon: string;
}

interface DonorData {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  tipoDocumento: string;
  numeroDocumento: string;
  monto: number;
  montoPersonalizado?: number;
  frecuencia: 'unica' | 'mensual';
  dedicatoria?: string;
  anonimo: boolean;
}

@Component({
  selector: 'app-donations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="donations-page">
      <!-- Impact Section -->
      <div class="impact-section">
        <div class="container">
          <div class="impact-header">
            <h2 class="impact-title">Tu donación transforma vidas</h2>
            <p class="impact-subtitle">
              Cada aporte hace la diferencia. Conoce el impacto que puedes generar.
            </p>
          </div>

          <div class="impact-grid">
            <div class="impact-card">
              <div class="impact-icon">💰</div>
              <h3 class="impact-amount">S/ 50</h3>
              <p class="impact-description">Materiales educativos para un estudiante durante un mes</p>
            </div>
            <div class="impact-card">
              <div class="impact-icon">📚</div>
              <h3 class="impact-amount">S/ 100</h3>
              <p class="impact-description">Taller de desarrollo personal para 10 jóvenes</p>
            </div>
            <div class="impact-card">
              <div class="impact-icon">🎓</div>
              <h3 class="impact-amount">S/ 200</h3>
              <p class="impact-description">Programa completo de mentoría para un estudiante</p>
            </div>
            <div class="impact-card">
              <div class="impact-icon">🌟</div>
              <h3 class="impact-amount">S/ 500</h3>
              <p class="impact-description">Charla motivacional completa en una institución</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Donation Form -->
      <div class="donation-form-section">
        <div class="container">
          <div class="form-wrapper">
            <div class="form-header">
              <h2 class="form-title">Realiza tu donación</h2>
              <p class="form-subtitle">
                Completa los siguientes datos para proceder con tu donación segura
              </p>
            </div>

            <form class="donation-form" (ngSubmit)="handleDonation()" #donationForm="ngForm">
              <!-- Donation Amount Selection -->
              <div class="section-block">
                <h3 class="section-title">
                  <span class="step-number">1</span>
                  Elige el monto de tu donación
                </h3>

                <!-- Frequency Toggle -->
                <div class="frequency-toggle">
                  <button
                    type="button"
                    class="frequency-btn"
                    [class.active]="donorData.frecuencia === 'unica'"
                    (click)="donorData.frecuencia = 'unica'">
                    Donación Única
                  </button>
                  <button
                    type="button"
                    class="frequency-btn"
                    [class.active]="donorData.frecuencia === 'mensual'"
                    (click)="donorData.frecuencia = 'mensual'">
                    Donación Mensual
                    <span class="badge">Más impacto</span>
                  </button>
                </div>

                <!-- Predefined Amounts -->
                <div class="amounts-grid">
                  @for (amount of donationAmounts; track amount.value) {
                    <button
                      type="button"
                      class="amount-card"
                      [class.active]="selectedAmount() === amount.value"
                      (click)="selectAmount(amount.value)">
                      <div class="amount-icon">{{ amount.icon }}</div>
                      <div class="amount-value">S/ {{ amount.value }}</div>
                      <div class="amount-label">{{ amount.label }}</div>
                    </button>
                  }
                </div>

                <!-- Custom Amount -->
                <div class="custom-amount-wrapper">
                  <div class="custom-amount-toggle">
                    <button
                      type="button"
                      class="amount-card custom"
                      [class.active]="isCustomAmount()"
                      (click)="enableCustomAmount()">
                      <div class="amount-icon">✏️</div>
                      <div class="amount-label">Otro monto</div>
                    </button>
                  </div>

                  @if (isCustomAmount()) {
                    <div class="custom-amount-input-wrapper">
                      <label class="form-label">Ingresa tu monto personalizado</label>
                      <div class="currency-input">
                        <span class="currency-symbol">S/</span>
                        <input
                          type="number"
                          class="form-input"
                          [(ngModel)]="donorData.montoPersonalizado"
                          name="montoPersonalizado"
                          placeholder="100"
                          min="10"
                          step="10"
                          required>
                      </div>
                      <small class="input-hint">Monto mínimo: S/ 10</small>
                    </div>
                  }
                </div>
              </div>

              <!-- Personal Information -->
              <div class="section-block">
                <h3 class="section-title">
                  <span class="step-number">2</span>
                  Tus datos personales
                </h3>

                <div class="form-grid">
                  <div class="form-group">
                    <label class="form-label">
                      Nombre <span class="required">*</span>
                    </label>
                    <input
                      type="text"
                      class="form-input"
                      [(ngModel)]="donorData.nombre"
                      name="nombre"
                      placeholder="Tu nombre"
                      required>
                  </div>

                  <div class="form-group">
                    <label class="form-label">
                      Apellido <span class="required">*</span>
                    </label>
                    <input
                      type="text"
                      class="form-input"
                      [(ngModel)]="donorData.apellido"
                      name="apellido"
                      placeholder="Tu apellido"
                      required>
                  </div>

                  <div class="form-group">
                    <label class="form-label">
                      Correo electrónico <span class="required">*</span>
                    </label>
                    <input
                      type="email"
                      class="form-input"
                      [(ngModel)]="donorData.email"
                      name="email"
                      placeholder="correo@ejemplo.com"
                      required>
                    <small class="input-hint">Recibirás tu recibo de donación aquí</small>
                  </div>

                  <div class="form-group">
                    <label class="form-label">
                      Teléfono <span class="required">*</span>
                    </label>
                    <input
                      type="tel"
                      class="form-input"
                      [(ngModel)]="donorData.telefono"
                      name="telefono"
                      placeholder="+51 999 999 999"
                      required>
                  </div>

                  <div class="form-group">
                    <label class="form-label">
                      Tipo de documento <span class="required">*</span>
                    </label>
                    <select
                      class="form-input"
                      [(ngModel)]="donorData.tipoDocumento"
                      name="tipoDocumento"
                      required>
                      <option value="">Selecciona</option>
                      <option value="DNI">DNI</option>
                      <option value="CE">Carnet de Extranjería</option>
                      <option value="Pasaporte">Pasaporte</option>
                    </select>
                  </div>

                  <div class="form-group">
                    <label class="form-label">
                      Número de documento <span class="required">*</span>
                    </label>
                    <input
                      type="text"
                      class="form-input"
                      [(ngModel)]="donorData.numeroDocumento"
                      name="numeroDocumento"
                      placeholder="12345678"
                      required>
                  </div>
                </div>
              </div>

              <!-- Optional: Dedication -->
              <div class="section-block">
                <h3 class="section-title">
                  <span class="step-number">3</span>
                  Dedicatoria (Opcional)
                </h3>

                <div class="form-group">
                  <label class="form-label">Dedica tu donación a alguien especial</label>
                  <textarea
                    class="form-textarea"
                    [(ngModel)]="donorData.dedicatoria"
                    name="dedicatoria"
                    rows="3"
                    placeholder="Ej: En memoria de mi profesor Juan Pérez, quien siempre creyó en la educación..."></textarea>
                </div>

                <div class="checkbox-wrapper">
                  <label class="checkbox-label">
                    <input
                      type="checkbox"
                      [(ngModel)]="donorData.anonimo"
                      name="anonimo">
                    <span class="checkbox-text">Quiero que mi donación sea anónima</span>
                  </label>
                </div>
              </div>

              <!-- Summary -->
              <div class="donation-summary">
                <div class="summary-content">
                  <div class="summary-row">
                    <span class="summary-label">Monto a donar:</span>
                    <span class="summary-value">S/ {{ getFinalAmount() }}</span>
                  </div>
                  <div class="summary-row">
                    <span class="summary-label">Frecuencia:</span>
                    <span class="summary-value">{{ donorData.frecuencia === 'unica' ? 'Pago único' : 'Mensual' }}</span>
                  </div>
                  @if (donorData.frecuencia === 'mensual') {
                    <div class="summary-highlight">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                      </svg>
                      <span>Con tu donación mensual impactarás a {{ Math.floor(getFinalAmount() / 20) }} jóvenes cada año</span>
                    </div>
                  }
                </div>
              </div>

              <!-- Submit Button -->
              <div class="form-actions">
                <button
                  type="submit"
                  class="submit-btn"
                  [disabled]="!donationForm.valid || isProcessing()">
                  @if (isProcessing()) {
                    <span class="spinner"></span>
                    Procesando...
                  } @else {
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                      <line x1="1" y1="10" x2="23" y2="10"></line>
                    </svg>
                    Proceder al pago seguro
                  }
                </button>

                <div class="security-badges">
                  <div class="security-badge">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    <span>Pago 100% seguro</span>
                  </div>
                  <div class="security-badge">
                    <img src="assets/images/culqi-logo.png" alt="Culqi" style="height: 20px;">
                    <span>Procesado por Culqi</span>
                  </div>
                </div>

                <p class="terms-text">
                  Al continuar, aceptas nuestros 
                  <a href="/terminos" target="_blank">términos y condiciones</a> y 
                  <a href="/privacidad" target="_blank">política de privacidad</a>
                </p>
              </div>
            </form>
          </div>

          <!-- Side Info -->
          <div class="side-info">
            <!-- Trust Indicators -->
            <div class="info-card">
              <h3 class="info-title">¿Por qué donar?</h3>
              <div class="benefits-list">
                <div class="benefit-item">
                  <div class="benefit-icon">✅</div>
                  <div class="benefit-text">
                    <strong>100% transparente</strong>
                    <p>Recibe reportes de cómo se usa tu donación</p>
                  </div>
                </div>
                <div class="benefit-item">
                  <div class="benefit-icon">🧾</div>
                  <div class="benefit-text">
                    <strong>Deducible de impuestos</strong>
                    <p>Recibirás un recibo oficial para tu declaración</p>
                  </div>
                </div>
                <div class="benefit-item">
                  <div class="benefit-icon">🔒</div>
                  <div class="benefit-text">
                    <strong>Pago seguro</strong>
                    <p>Procesamos pagos con Culqi, certificado PCI-DSS</p>
                  </div>
                </div>
                <div class="benefit-item">
                  <div class="benefit-icon">💝</div>
                  <div class="benefit-text">
                    <strong>Impacto real</strong>
                    <p>Cada sol llega directamente a los beneficiarios</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Recent Donations 
            <div class="info-card">
              <h3 class="info-title">Donaciones recientes</h3>
              <div class="recent-donations">
                <div class="donation-item">
                  <div class="donor-avatar">M</div>
                  <div class="donor-info">
                    <strong>María L.</strong>
                    <span>S/ 100 - Hace 2 horas</span>
                  </div>
                </div>
                <div class="donation-item">
                  <div class="donor-avatar">J</div>
                  <div class="donor-info">
                    <strong>Juan P.</strong>
                    <span>S/ 50 - Hace 5 horas</span>
                  </div>
                </div>
                <div class="donation-item">
                  <div class="donor-avatar">A</div>
                  <div class="donor-info">
                    <strong>Anónimo</strong>
                    <span>S/ 200 - Hace 1 día</span>
                  </div>
                </div>
              </div>
            </div>
            -->

            <!-- Contact -->
            <div class="info-card">
              <h3 class="info-title">¿Necesitas ayuda?</h3>
              <p class="info-text">
                Si tienes preguntas sobre el proceso de donación, contáctanos:
              </p>
              <a href="mailto:coachsemillasytalentos@gmail.com" class="contact-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                coachsemillasytalentos@gmail.com
              </a>
              <a href="tel:+51916658609" class="contact-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                +51 933 734 545
              </a>
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

    .Math = Math;

    /* Container */
    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    /* Impact Section */
    .impact-section {
      padding-top: 30px;
      padding: 6rem 0;
      background: linear-gradient(135deg, #667eea 0%, #1bb335ff 100%);
      color: white;
    }

    .impact-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .impact-title {
      font-size: 2.5rem;
      font-weight: 800;
      margin: 0 0 1rem 0;
    }

    .impact-subtitle {
      font-size: 1.25rem;
      opacity: 0.95;
      margin: 0;
    }

    .impact-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 2rem;
    }

    .impact-card {
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(10px);
      padding: 2rem;
      border-radius: 16px;
      text-align: center;
      border: 2px solid rgba(255, 255, 255, 0.2);
      transition: all 0.3s ease;
    }

    .impact-card:hover {
      transform: translateY(-5px);
      background: rgba(255, 255, 255, 0.25);
    }

    .impact-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .impact-amount {
      font-size: 2rem;
      font-weight: 800;
      margin: 0 0 0.5rem 0;
    }

    .impact-description {
      font-size: 0.95rem;
      opacity: 0.9;
      margin: 0;
      line-height: 1.5;
    }

    /* Donation Form Section */
    .donation-form-section {
      padding: 4rem 0;
      background: #f7fafc;
    }

    .donation-form-section .container {
      display: grid;
      grid-template-columns: 1.5fr 1fr;
      gap: 3rem;
    }

    .form-wrapper {
      background: white;
      border-radius: 20px;
      padding: 3rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    }

    .form-header {
      margin-bottom: 2.5rem;
      text-align: center;
    }

    .form-title {
      font-size: 2rem;
      font-weight: 800;
      color: #1a202c;
      margin: 0 0 0.75rem 0;
    }

    .form-subtitle {
      font-size: 1.05rem;
      color: #718096;
      margin: 0;
    }

    /* Section Blocks */
    .section-block {
      margin-bottom: 2.5rem;
      padding-bottom: 2.5rem;
      border-bottom: 2px solid #e2e8f0;
    }

    .section-block:last-of-type {
      border-bottom: none;
      margin-bottom: 2rem;
    }

    .section-title {
      display: flex;
      align-items: center;
      gap: 1rem;
      font-size: 1.5rem;
      font-weight: 700;
      color: #1a202c;
      margin: 0 0 1.5rem 0;
    }

    .step-number {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      background: linear-gradient(135deg, #667eea 0%, #1bb335ff 100%);
      color: white;
      border-radius: 50%;
      font-size: 1.125rem;
      font-weight: 700;
      flex-shrink: 0;
    }

    /* Frequency Toggle */
    .frequency-toggle {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .frequency-btn {
      flex: 1;
      padding: 1rem 1.5rem;
      background: white;
      border: 2px solid #e2e8f0;
      border-radius: 12px;
      font-size: 1rem;
      font-weight: 600;
      color: #2d3748;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }

    .frequency-btn:hover {
      border-color: #667eea;
    }

    .frequency-btn.active {
      background: linear-gradient(135deg, #667eea 0%, #1bb335ff 100%);
      color: white;
      border-color: transparent;
    }

    .badge {
      padding: 0.25rem 0.5rem;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50px;
      font-size: 0.75rem;
      font-weight: 700;
    }

    /* Amounts Grid */
    .amounts-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .amount-card {
      padding: 1.5rem 1rem;
      background: white;
      border: 2px solid #e2e8f0;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.3s ease;
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .amount-card:hover {
      border-color: #667eea;
      transform: translateY(-2px);
    }

    .amount-card.active {
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
      border-color: #1cd064ff;
      border-width: 3px;
    }

    .amount-icon {
      font-size: 2rem;
    }

    .amount-value {
      font-size: 1.5rem;
      font-weight: 800;
      color: #1a202c;
    }

    .amount-label {
      font-size: 0.875rem;
      color: #718096;
      font-weight: 500;
    }

    /* Custom Amount */
    .custom-amount-wrapper {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .custom-amount-toggle {
      display: flex;
    }

    .amount-card.custom {
      flex: 1;
    }

    .custom-amount-input-wrapper {
      animation: slideDown 0.3s ease;
    }

    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .currency-input {
      position: relative;
      display: flex;
      align-items: center;
    }

    .currency-symbol {
      position: absolute;
      left: 1.25rem;
      font-size: 1.125rem;
      font-weight: 700;
      color: #4a5568;
    }

    .currency-input .form-input {
      padding-left: 3rem;
      font-size: 1.25rem;
      font-weight: 700;
    }

    /* Form Elements */
    .form-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
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
      min-height: 100px;
    }

    .input-hint {
      font-size: 0.875rem;
      color: #718096;
    }

    /* Checkbox */
    .checkbox-wrapper {
      margin-top: 1rem;
    }

    .checkbox-label {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      cursor: pointer;
      font-size: 0.95rem;
      color: #2d3748;
    }

    .checkbox-label input[type="checkbox"] {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }

    /* Donation Summary */
    .donation-summary {
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
      padding: 2rem;
      border-radius: 16px;
      margin-bottom: 2rem;
    }

    .summary-content {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .summary-label {
      font-size: 1.05rem;
      color: #4a5568;
      font-weight: 500;
    }

    .summary-value {
      font-size: 1.5rem;
      font-weight: 800;
      color: #1a202c;
    }

    .summary-highlight {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem;
      background: white;
      border-radius: 10px;
      margin-top: 0.5rem;
      color: #667eea;
      font-weight: 600;
    }

    .summary-highlight svg {
      flex-shrink: 0;
    }

    /* Form Actions */
    .form-actions {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .submit-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      padding: 1.25rem 2.5rem;
      background: linear-gradient(135deg, #667eea 0%, #1bb335ff 100%);
      color: white;
      border: none;
      border-radius: 12px;
      font-size: 1.25rem;
      font-weight: 700;
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

    .security-badges {
      display: flex;
      justify-content: center;
      gap: 2rem;
      flex-wrap: wrap;
    }

    .security-badge {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #718096;
      font-size: 0.875rem;
    }

    .security-badge svg {
      color: #10b981;
    }

    .terms-text {
      text-align: center;
      font-size: 0.875rem;
      color: #718096;
      margin: 0;
    }

    .terms-text a {
      color: #667eea;
      text-decoration: none;
      font-weight: 600;
    }

    .terms-text a:hover {
      text-decoration: underline;
    }

    /* Side Info */
    .side-info {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .info-card {
      background: white;
      padding: 2rem;
      border-radius: 20px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    }

    .info-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: #1a202c;
      margin: 0 0 1.5rem 0;
    }

    /* Benefits List */
    .benefits-list {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .benefit-item {
      display: flex;
      gap: 1rem;
      align-items: flex-start;
    }

    .benefit-icon {
      font-size: 1.5rem;
      flex-shrink: 0;
    }

    .benefit-text strong {
      display: block;
      color: #1a202c;
      margin-bottom: 0.25rem;
      font-size: 1rem;
    }

    .benefit-text p {
      color: #718096;
      font-size: 0.9rem;
      margin: 0;
      line-height: 1.5;
    }

    /* Recent Donations */
    .recent-donations {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .donation-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: #f7fafc;
      border-radius: 12px;
    }

    .donor-avatar {
      width: 48px;
      height: 48px;
      background: linear-gradient(135deg, #667eea 0%, #1bb335ff 100%);  
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      font-weight: 700;
      flex-shrink: 0;
    }

    .donor-info {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .donor-info strong {
      color: #1a202c;
      font-size: 0.95rem;
    }

    .donor-info span {
      color: #718096;
      font-size: 0.875rem;
    }

    /* Contact Links */
    .info-text {
      color: #718096;
      font-size: 0.95rem;
      line-height: 1.6;
      margin: 0 0 1rem 0;
    }

    .contact-link {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.875rem 1rem;
      background: #f7fafc;
      border-radius: 10px;
      color: #2d3748;
      text-decoration: none;
      font-size: 0.9rem;
      font-weight: 500;
      margin-bottom: 0.75rem;
      transition: all 0.3s ease;
    }

    .contact-link:hover {
      background: #e2e8f0;
      color: #1bb335ff;
    }

    .contact-link svg {
      color: #1bb335ff;
      flex-shrink: 0;
    }

    /* Responsive Design */
    @media (max-width: 1200px) {
      .impact-grid {
        grid-template-columns: repeat(2, 1fr);
      }

      .amounts-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    @media (max-width: 1024px) {
      .donation-form-section .container {
        grid-template-columns: 1fr;
      }

      .side-info {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem;
      }
    }

    @media (max-width: 768px) {
      .impact-section {
        padding: 7rem 0;
      }

      .impact-title {
        font-size: 2rem;
      }

      .impact-grid {
        grid-template-columns: 1fr;
      }

      .form-wrapper {
        padding: 2rem;
      }

      .form-title {
        font-size: 1.75rem;
      }

      .amounts-grid {
        grid-template-columns: repeat(2, 1fr);
      }

      .form-grid {
        grid-template-columns: 1fr;
      }

      .frequency-toggle {
        flex-direction: column;
      }

      .side-info {
        grid-template-columns: 1fr;
      }

      .section-title {
        font-size: 1.25rem;
      }
    }

    @media (max-width: 480px) {
      .container {
        padding: 0 1rem;
      }

      .impact-section {
        padding: 2rem 0;
      }

      .impact-title {
        font-size: 1.75rem;
      }

      .form-wrapper {
        padding: 1.5rem;
      }

      .amounts-grid {
        grid-template-columns: 1fr;
      }

      .security-badges {
        flex-direction: column;
        gap: 1rem;
      }

      .submit-btn {
        font-size: 1.125rem;
        padding: 1.125rem 2rem;
      }
    }
  `]
})
export class DonationsComponent {
  Math = Math; // Para usar Math.floor en el template

  // Predefined donation amounts
  donationAmounts: DonationAmount[] = [
    {
      value: 50,
      label: 'Básico',
      description: '',
      icon: ''
    },
    {
      value: 100,
      label: 'Estándar',
      description: '',
      icon: ''
    },
    {
      value: 200,
      label: 'Avanzado',
      description: '',
      icon: ''
    },
    {
      value: 500,
      label: 'Premium',
      description: '',
      icon: ''
    }
  ];

  // Signals
  selectedAmount = signal<number>(100);
  isProcessing = signal(false);

  // Form data
  donorData: DonorData = {
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    tipoDocumento: '',
    numeroDocumento: '',
    monto: 100,
    frecuencia: 'unica',
    anonimo: false
  };

  selectAmount(amount: number): void {
    this.selectedAmount.set(amount);
    this.donorData.monto = amount;
    this.donorData.montoPersonalizado = undefined;
  }

  enableCustomAmount(): void {
    this.selectedAmount.set(-1); // -1 indica monto personalizado
  }

  isCustomAmount(): boolean {
    return this.selectedAmount() === -1;
  }

  getFinalAmount(): number {
    if (this.isCustomAmount() && this.donorData.montoPersonalizado) {
      return this.donorData.montoPersonalizado;
    }
    return this.donorData.monto;
  }

  handleDonation(): void {
    this.isProcessing.set(true);

    // preparar datos para enviar al backend
    const donationData = {
      ...this.donorData,
      montoFinal: this.getFinalAmount()
    };

    console.log('Datos de donación:', donationData);

    // Simular proceso (aquí integra con el backend)
    setTimeout(() => {
      // Aquí normalmente:
      // 1. Envías los datos al backend
      // 2. El backend crea una orden de pago
      // 3. Recibes el token de Culqi
      // 4. Abres el formulario de Culqi

      this.openCulqiCheckout(donationData);
    }, 1500);
  }

  openCulqiCheckout(donationData: any): void {
    // Esta función abrirá el checkout de Culqi
    // Por ahora solo logeamos y mostramos un alert
    this.isProcessing.set(false);
    
    console.log('Abriendo Culqi Checkout con:', donationData);
    
    // Aquí integrarás Culqi:
    /*
    Culqi.open();
    
    Culqi.publicKey = 'TU_PUBLIC_KEY';
    
    Culqi.settings({
      title: 'Semillas & Talentos',
      currency: 'PEN',
      amount: donationData.montoFinal * 100, // Culqi usa centavos
      order: donationData.ordenId
    });
    
    Culqi.options({
      lang: 'es',
      style: {
        logo: 'https://tu-logo.png',
        maincolor: '#667eea',
        buttontext: 'Donar',
        maintext: 'Ingresa los datos de tu tarjeta',
      }
    });
    */
    
    alert(`Donación procesada:\n\nMonto: S/ ${donationData.montoFinal}\nDonante: ${donationData.nombre} ${donationData.apellido}\n\nEn producción, aquí se abrirá el formulario de Culqi.`);
  }
}