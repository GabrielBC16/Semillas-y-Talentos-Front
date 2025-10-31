// card.component.ts
import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export type CardSize = 'small' | 'medium' | 'large';
export type CardVariant = 'default' | 'horizontal' | 'minimal' | 'featured';

export interface CardTag {
  label: string;
  color?: string;
}

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <article
      class="card"
      [class]="'card-' + variant() + ' card-' + size()"
      [class.clickable]="link() || clickable()"
      (click)="handleClick()">

      <!-- Image Section -->
      @if (image()) {
        <div class="card-image-wrapper">
          @if (link()) {
            <a [routerLink]="link()" class="card-image-link">
              <img
                [src]="image()"
                [alt]="imageAlt()"
                class="card-image"
                loading="lazy">
              <div class="card-image-overlay"></div>
            </a>
          } @else {
            <div class="card-image-container">
              <img
                [src]="image()"
                [alt]="imageAlt()"
                class="card-image"
                loading="lazy">
              <div class="card-image-overlay"></div>
            </div>
          }

          <!-- Tags/Badges on Image -->
          @if (tags() && tags().length > 0) {
            <div class="card-tags">
              @for (tag of tags(); track tag.label) {
                <span
                  class="card-tag"
                  [style.background-color]="tag.color || '#667eea'">
                  {{ tag.label }}
                </span>
              }
            </div>
          }

          <!-- Icon Badge (opcional) -->
          @if (icon()) {
            <div class="card-icon-badge" [innerHTML]="icon()"></div>
          }
        </div>
      }

      <!-- Content Section -->
      <div class="card-content">
        <!-- Category/Meta -->
        @if (category()) {
          <span class="card-category">{{ category() }}</span>
        }

        <!-- Title -->
        @if (link()) {
          <a [routerLink]="link()" class="card-title-link">
            <h3 class="card-title">{{ title() }}</h3>
          </a>
        } @else {
          <h3 class="card-title">{{ title() }}</h3>
        }

        <!-- Subtitle -->
        @if (subtitle()) {
          <p class="card-subtitle">{{ subtitle() }}</p>
        }

        <!-- Description -->
        @if (description()) {
          <p class="card-description">{{ description() }}</p>
        }

        <!-- Meta Information -->
        @if (showMeta() && (date() || author() || metaItems().length > 0)) {
          <div class="card-meta">
            @if (date()) {
              <span class="meta-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                {{ date() }}
              </span>
            }
            @if (author()) {
              <span class="meta-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                {{ author() }}
              </span>
            }
            @for (item of metaItems(); track item) {
              <span class="meta-item">{{ item }}</span>
            }
          </div>
        }

        <!-- Footer Actions -->
        @if (showFooter()) {
          <div class="card-footer">
            <!-- Custom Footer Content via ng-content -->
            <ng-content select="[card-footer]"></ng-content>

            <!-- Default CTA Button -->
            @if (!hasFooterContent() && link()) {
              <a [routerLink]="link()" class="card-link-btn">
                {{ ctaText() }}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            }
          </div>
        }
      </div>
    </article>
  `,
  styles: [`
    /* Base Card Styles */
    .card {
      display: flex;
      flex-direction: column;
      background: white;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      transition: all 0.3s ease;
      height: 100%;
      border: 1px solid #e2e8f0;
    }

    .card.clickable {
      cursor: pointer;
    }

    .card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12);
    }

    /* Image Section */
    .card-image-wrapper {
      position: relative;
      overflow: hidden;
      background: #f7fafc;
    }

    .card-image-link,
    .card-image-container {
      display: block;
      position: relative;
      width: 100%;
    }

    .card-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.5s ease;
    }

    .card:hover .card-image {
      transform: scale(1.08);
    }

    .card-image-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.3) 100%);
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .card:hover .card-image-overlay {
      opacity: 1;
    }

    /* Tags on Image */
    .card-tags {
      position: absolute;
      top: 1rem;
      left: 1rem;
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      z-index: 2;
    }

    .card-tag {
      padding: 0.375rem 0.75rem;
      background: #667eea;
      color: white;
      border-radius: 50px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    }

    /* Icon Badge */
    .card-icon-badge {
      position: absolute;
      top: 1rem;
      right: 1rem;
      width: 50px;
      height: 50px;
      background: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
      z-index: 2;
    }

    .card-icon-badge :deep(svg) {
      width: 24px;
      height: 24px;
      color: #667eea;
    }

    /* Content Section */
    .card-content {
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      flex: 1;
    }

    .card-category {
      display: inline-block;
      color: #667eea;
      font-size: 0.875rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .card-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: #1a202c;
      margin: 0;
      line-height: 1.3;
      transition: color 0.3s ease;
    }

    .card-title-link {
      text-decoration: none;
      color: inherit;
    }

    .card:hover .card-title {
      color: #1557fdc0;
    }

    .card-subtitle {
      font-size: 1.125rem;
      font-weight: 600;
      color: #4a5568;
      margin: 0;
      line-height: 1.4;
    }

    .card-description {
      font-size: 1rem;
      color: #718096;
      line-height: 1.6;
      margin: 0;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    /* Meta Information */
    .card-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      padding-top: 0.5rem;
      border-top: 1px solid #e2e8f0;
      margin-top: auto;
    }

    .meta-item {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      font-size: 0.875rem;
      color: #718096;
    }

    .meta-item svg {
      flex-shrink: 0;
      color: #a0aec0;
    }

    /* Footer */
    .card-footer {
      padding-top: 1rem;
      margin-top: auto;
    }

    .card-link-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      color: #0d4cd4ff;
      font-weight: 600;
      font-size: 0.95rem;
      text-decoration: none;
      transition: all 0.3s ease;
    }

    .card-link-btn:hover {
      gap: 0.75rem;
      color: #5568d3;
    }

    .card-link-btn svg {
      transition: transform 0.3s ease;
    }

    .card-link-btn:hover svg {
      transform: translateX(3px);
    }

    /* Size Variants */
    .card-small .card-image-wrapper {
      height: 180px;
    }

    .card-small .card-content {
      padding: 1rem;
    }

    .card-small .card-title {
      font-size: 1.125rem;
    }

    .card-small .card-description {
      font-size: 0.9rem;
      -webkit-line-clamp: 2;
    }

    .card-medium .card-image-wrapper {
      height: 240px;
    }

    .card-large .card-image-wrapper {
      height: 320px;
    }

    .card-large .card-content {
      padding: 2rem;
    }

    .card-large .card-title {
      font-size: 1.75rem;
    }

    /* Variant: Horizontal */
    .card-horizontal {
      flex-direction: row;
    }

    .card-horizontal .card-image-wrapper {
      width: 40%;
      height: auto;
      min-height: 280px;
    }

    .card-horizontal .card-content {
      width: 60%;
    }

    /* Variant: Minimal */
    .card-minimal {
      box-shadow: none;
      border: none;
      background: transparent;
    }

    .card-minimal:hover {
      transform: none;
      box-shadow: none;
    }

    .card-minimal .card-image-wrapper {
      border-radius: 12px;
      overflow: hidden;
    }

    /* Variant: Featured */
    .card-featured {
      border: 2px solid #667eea;
      position: relative;
    }

    .card-featured::before {
      content: '⭐ DESTACADO';
      position: absolute;
      top: -12px;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(135deg, #667eea 0%, #1bb335ff 100%);
      color: white;
      padding: 0.375rem 1rem;
      border-radius: 50px;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.5px;
      z-index: 3;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .card-horizontal {
        flex-direction: column;
      }

      .card-horizontal .card-image-wrapper {
        width: 100%;
        height: 200px;
      }

      .card-horizontal .card-content {
        width: 100%;
      }

      .card-large .card-image-wrapper {
        height: 240px;
      }

      .card-large .card-content {
        padding: 1.5rem;
      }

      .card-large .card-title {
        font-size: 1.5rem;
      }
    }

    @media (max-width: 480px) {
      .card-content {
        padding: 1.25rem;
      }

      .card-title {
        font-size: 1.25rem;
      }

      .card-small .card-title {
        font-size: 1rem;
      }

      .card-description {
        font-size: 0.9rem;
      }

      .card-medium .card-image-wrapper,
      .card-large .card-image-wrapper {
        height: 200px;
      }
    }
  `]
})
export class CardComponent {
  // Inputs requeridos
  title = input.required<string>();

  // Inputs de contenido
  image = input<string>('');
  imageAlt = input<string>('');
  subtitle = input<string>('');
  description = input<string>('');
  category = input<string>('');
  icon = input<string>('');

  // Inputs de navegación
  link = input<string>('');
  clickable = input<boolean>(false);

  // Inputs de estilo
  size = input<CardSize>('medium');
  variant = input<CardVariant>('default');

  // Inputs de metadata
  tags = input<CardTag[]>([]);
  date = input<string>('');
  author = input<string>('');
  metaItems = input<string[]>([]);
  showMeta = input<boolean>(true);

  // Inputs de footer
  showFooter = input<boolean>(true);
  ctaText = input<string>('Ver más');

  // Output events
  cardClick = output<void>();

  // Internal state
  hasFooterContent = input<boolean>(false);

  handleClick(): void {
    if (this.clickable() && !this.link()) {
      this.cardClick.emit();
    }
  }
}
