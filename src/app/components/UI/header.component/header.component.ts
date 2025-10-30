import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface Breadcrumb {
  label: string;
  path: string;
}

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header 
      class="page-header" 
      [style.background-image]="'url(' + backgroundImage() + ')'"
      [style.min-height]="height()">
      
      <!-- Overlay -->
      <div 
        class="page-header-overlay" 
        [style.opacity]="overlayOpacity()">
      </div>

      <!-- Content -->
      <div class="page-header-content">
        <div class="header-container">
          <!-- Breadcrumbs (opcional) -->
          @if (breadcrumbs() && breadcrumbs().length > 0) {
            <nav class="breadcrumbs" aria-label="Breadcrumb">
              <ol class="breadcrumb-list">
                @for (crumb of breadcrumbs(); track $index) {
                  <li class="breadcrumb-item">
                    @if ($index < breadcrumbs().length - 1) {
                      <a [routerLink]="crumb.path" class="breadcrumb-link">
                        {{ crumb.label }}
                      </a>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="breadcrumb-separator">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    } @else {
                      <span class="breadcrumb-current">{{ crumb.label }}</span>
                    }
                  </li>
                }
              </ol>
            </nav>
          }

          <!-- Title -->
          <h1 class="page-title" [class.with-subtitle]="subtitle()">
            {{ title() }}
          </h1>

          <!-- Subtitle (opcional) -->
          @if (subtitle()) {
            <p class="page-subtitle">{{ subtitle() }}</p>
          }

          <!-- Description (opcional) -->
          @if (description()) {
            <p class="page-description">{{ description() }}</p>
          }

          <!-- CTA Button (opcional) -->
          @if (ctaText()) {
            <a 
              [routerLink]="ctaLink() || '#'" 
              class="header-cta-btn">
              {{ ctaText() }}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          }

          <!-- Decorative Element -->
          <div class="decorative-line"></div>
        </div>
      </div>

      <!-- Scroll Indicator (opcional) -->
      @if (showScrollIndicator()) {
        <div class="scroll-indicator">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
          </svg>
        </div>
      }
    </header>
  `,
  styles: [`
    /* Variables */
    :host {
      display: block;
    }

    /* Header Container */
    .page-header {
      position: relative;
      width: 100%;
      min-height: 400px;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    .page-header-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.5) 100%);
      z-index: 1;
    }

    .page-header-content {
      position: relative;
      z-index: 2;
      width: 100%;
      padding: 2rem;
    }

    .header-container {
      max-width: 1200px;
      margin: 0 auto;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
    }

    /* Breadcrumbs */
    .breadcrumbs {
      animation: fadeInDown 0.6s ease-out;
    }

    .breadcrumb-list {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      list-style: none;
      padding: 0;
      margin: 0;
      flex-wrap: wrap;
      justify-content: center;
    }

    .breadcrumb-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .breadcrumb-link {
      color: rgba(255, 255, 255, 0.8);
      text-decoration: none;
      font-size: 0.9rem;
      transition: color 0.3s ease;
      font-weight: 500;
    }

    .breadcrumb-link:hover {
      color: white;
    }

    .breadcrumb-separator {
      color: rgba(255, 255, 255, 0.5);
      flex-shrink: 0;
    }

    .breadcrumb-current {
      color: white;
      font-size: 0.9rem;
      font-weight: 600;
    }

    /* Title */
    .page-title {
      font-size: 4rem;
      font-weight: 800;
      color: white;
      margin: 0;
      line-height: 1.1;
      text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
      animation: fadeInUp 0.8s ease-out;
      letter-spacing: -1px;
    }

    .page-title.with-subtitle {
      margin-bottom: 0.5rem;
    }

    /* Subtitle */
    .page-subtitle {
      font-size: 1.75rem;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.95);
      margin: 0;
      text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
      animation: fadeInUp 0.8s ease-out 0.1s both;
    }

    /* Description */
    .page-description {
      font-size: 1.25rem;
      color: rgba(255, 255, 255, 0.9);
      margin: 0;
      max-width: 800px;
      line-height: 1.6;
      text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
      animation: fadeInUp 0.8s ease-out 0.2s both;
    }

    /* CTA Button */
    .header-cta-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem 2.5rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      text-decoration: none;
      border-radius: 50px;
      font-weight: 600;
      font-size: 1.1rem;
      transition: all 0.3s ease;
      box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
      animation: fadeInUp 0.8s ease-out 0.3s both;
    }

    .header-cta-btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 25px rgba(102, 126, 234, 0.5);
    }

    .header-cta-btn svg {
      transition: transform 0.3s ease;
    }

    .header-cta-btn:hover svg {
      transform: translateX(5px);
    }

    /* Decorative Line */
    .decorative-line {
      width: 100px;
      height: 4px;
      background: linear-gradient(135deg, #667eea 0%, #4ba272ff 100%);
      border-radius: 2px;
      animation: fadeInUp 0.8s ease-out 0.4s both;
    }

    /* Scroll Indicator */
    .scroll-indicator {
      position: absolute;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      z-index: 2;
      color: white;
      animation: bounce 2s infinite;
      cursor: pointer;
    }

    .scroll-indicator svg {
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
    }

    /* Animations */
    @keyframes fadeInDown {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% {
        transform: translateX(-50%) translateY(0);
      }
      40% {
        transform: translateX(-50%) translateY(-10px);
      }
      60% {
        transform: translateX(-50%) translateY(-5px);
      }
    }

    /* Responsive Design */
    @media (max-width: 1024px) {
      .page-title {
        font-size: 3rem;
      }

      .page-subtitle {
        font-size: 1.5rem;
      }

      .page-description {
        font-size: 1.1rem;
      }
    }

    @media (max-width: 768px) {
      .page-header {
        min-height: 350px;
      }

      .page-header-content {
        padding: 1.5rem;
      }

      .page-title {
        font-size: 2.5rem;
      }

      .page-subtitle {
        font-size: 1.25rem;
      }

      .page-description {
        font-size: 1rem;
      }

      .header-cta-btn {
        padding: 0.875rem 2rem;
        font-size: 1rem;
      }

      .breadcrumb-link,
      .breadcrumb-current {
        font-size: 0.85rem;
      }
    }

    @media (max-width: 480px) {
      .page-header {
        min-height: 300px;
      }

      .page-header-content {
        padding: 1rem;
      }

      .header-container {
        gap: 1.25rem;
      }

      .page-title {
        font-size: 2rem;
        letter-spacing: -0.5px;
      }

      .page-subtitle {
        font-size: 1.1rem;
      }

      .page-description {
        font-size: 0.95rem;
      }

      .header-cta-btn {
        padding: 0.75rem 1.75rem;
        font-size: 0.95rem;
      }

      .decorative-line {
        width: 80px;
        height: 3px;
      }

      .scroll-indicator {
        bottom: 1rem;
      }
    }
  `]
})
export class PageHeaderComponent {
  // Inputs requeridos
  title = input.required<string>();
  backgroundImage = input.required<string>();

  // Inputs opcionales
  subtitle = input<string>('');
  description = input<string>('');
  height = input<string>('400px');
  overlayOpacity = input<number>(0.65);
  breadcrumbs = input<Breadcrumb[]>([]);
  ctaText = input<string>('');
  ctaLink = input<string>('');
  showScrollIndicator = input<boolean>(false);
}