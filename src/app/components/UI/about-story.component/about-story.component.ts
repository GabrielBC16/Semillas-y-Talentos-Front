// about-story.component.ts
import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHtmlPipe } from '../../pipes/safe-html-pipe';

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface ValueItem {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-about-story',
  standalone: true,
  imports: [CommonModule, SafeHtmlPipe],
  template: `
    <section class="about-story-section">
      <div class="container">
        <!-- Main Story Section -->
        <div class="story-grid">
          <!-- Image Column -->
          <div class="image-column">
            <div class="image-wrapper">
              <img 
                [src]="mainImage()" 
                [alt]="imageAlt()"
                class="main-image">
              <div class="image-overlay"></div>
              
              <!-- Stats Badge (opcional) -->
              @if (showStats()) {
                <div class="stats-badge">
                  <div class="stat-item">
                    <span class="stat-number">{{ yearsActive() }}</span>
                    <span class="stat-label">Años</span>
                  </div>
                  <div class="stat-divider"></div>
                  <div class="stat-item">
                    <span class="stat-number">{{ beneficiaries() }}+</span>
                    <span class="stat-label">Vidas</span>
                  </div>
                </div>
              }

              <!-- Decorative Shape -->
              <div class="decorative-shape"></div>
            </div>
          </div>

          <!-- Content Column -->
          <div class="content-column">
            <!-- Section Tag -->
            @if (sectionTag()) {
              <span class="section-tag">{{ sectionTag() }}</span>
            }

            <h2 class="section-title">{{ title() }}</h2>
            
            @if (subtitle()) {
              <p class="section-subtitle">{{ subtitle() }}</p>
            }

            <div class="story-content">
              @for (paragraph of paragraphs(); track $index) {
                <p class="story-paragraph">{{ paragraph }}</p>
              }
            </div>

            <!-- Key Points (opcional) -->
            @if (keyPoints() && keyPoints().length > 0) {
              <div class="key-points">
                @for (point of keyPoints(); track $index) {
                  <div class="key-point">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="check-icon">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>{{ point }}</span>
                  </div>
                }
              </div>
            }
          </div>
        </div>

        <!-- Mission & Vision Section -->
        @if (showMissionVision()) {
          <div class="mission-vision-section">
            <div class="mission-vision-grid">
              <!-- Mission -->
              <div class="mv-card mission-card">
                <div class="mv-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="12" r="6"></circle>
                  <circle cx="12" cy="12" r="2"></circle>
                  <path d="M12 2v4M12 18v4M2 12h4M18 12h4"></path>
                </svg>
                </div>
                <h3 class="mv-title">Nuestra Misión</h3>
                <p class="mv-text">{{ mission() }}</p>
              </div>

              <!-- Vision -->
              <div class="mv-card vision-card">
                <div class="mv-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </div>
                <h3 class="mv-title">Nuestra Visión</h3>
                <p class="mv-text">{{ vision() }}</p>
              </div>
            </div>
          </div>
        }

        <!-- Values Section -->
        @if (values() && values().length > 0) {
          <div class="values-section">
            <h3 class="values-title">Nuestros Valores</h3>
            <div class="values-grid">
              @for (value of values(); track $index) {
                <div class="value-card">
                  <div class="value-icon" [innerHTML]="value.icon | safeHtml"></div>
                  <h4 class="value-title">{{ value.title }}</h4>
                  <p class="value-description">{{ value.description }}</p>
                </div>
              }
            </div>
          </div>
        }

        <!-- Timeline Section (opcional) -->
        @if (timeline() && timeline().length > 0) {
          <div class="timeline-section">
            <h3 class="timeline-title">Nuestra Trayectoria</h3>
            <div class="timeline">
              @for (item of timeline(); track $index) {
                <div class="timeline-item" [class.reverse]="$index % 2 !== 0">
                  <div class="timeline-marker"></div>
                  <div class="timeline-content">
                    <span class="timeline-year">{{ item.year }}</span>
                    <h4 class="timeline-item-title">{{ item.title }}</h4>
                    <p class="timeline-description">{{ item.description }}</p>
                  </div>
                </div>
              }
            </div>
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    /* Container */
    .about-story-section {
      padding: 6rem 0;
      background: linear-gradient(180deg, #ffffff 0%, #f7fafc 100%);
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    /* Story Grid */
    .story-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
      margin-bottom: 5rem;
    }

    /* Image Column */
    .image-column {
      position: relative;
    }

    .image-wrapper {
      position: relative;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    }

    .main-image {
      width: 100%;
      height: auto;
      display: block;
      transition: transform 0.5s ease;
    }

    .image-wrapper:hover .main-image {
      transform: scale(1.05);
    }

    .image-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%);
      pointer-events: none;
    }

    /* Stats Badge */
    .stats-badge {
      position: absolute;
      bottom: 2rem;
      right: 2rem;
      background: white;
      padding: 1.5rem 2rem;
      border-radius: 16px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
      display: flex;
      gap: 1.5rem;
      align-items: center;
      animation: slideInUp 0.8s ease-out 0.3s both;
    }

    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .stat-number {
      font-size: 2rem;
      font-weight: 800;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      line-height: 1;
    }

    .stat-label {
      font-size: 0.875rem;
      color: #718096;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-top: 0.25rem;
    }

    .stat-divider {
      width: 1px;
      height: 40px;
      background: #e2e8f0;
    }

    /* Decorative Shape */
    .decorative-shape {
      position: absolute;
      top: -20px;
      left: -20px;
      width: 150px;
      height: 150px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 30px;
      opacity: 0.15;
      z-index: -1;
      animation: float 6s ease-in-out infinite;
    }

    @keyframes float {
      0%, 100% { transform: translate(0, 0) rotate(0deg); }
      50% { transform: translate(10px, 10px) rotate(5deg); }
    }

    /* Content Column */
    .content-column {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .section-tag {
      display: inline-block;
      padding: 0.5rem 1rem;
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
      color: #667eea;
      border-radius: 50px;
      font-size: 0.875rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      width: fit-content;
    }

    .section-title {
      font-size: 3rem;
      font-weight: 800;
      color: #1a202c;
      margin: 0;
      line-height: 1.2;
      letter-spacing: -1px;
    }

    .section-subtitle {
      font-size: 1.5rem;
      font-weight: 600;
      color: #667eea;
      margin: 0;
      line-height: 1.4;
    }

    .story-content {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .story-paragraph {
      font-size: 1.125rem;
      color: #4a5568;
      line-height: 1.8;
      margin: 0;
    }

    /* Key Points */
    .key-points {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-top: 1rem;
    }

    .key-point {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 1.05rem;
      color: #2d3748;
      font-weight: 500;
    }

    .check-icon {
      color: #667eea;
      flex-shrink: 0;
      background: rgba(102, 126, 234, 0.1);
      border-radius: 50%;
      padding: 0.25rem;
    }

    /* Mission & Vision Section */
    .mission-vision-section {
      margin-bottom: 5rem;
    }

    .mission-vision-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
    }

    .mv-card {
      padding: 3rem;
      border-radius: 20px;
      text-align: center;
      transition: all 0.3s ease;
      border: 2px solid transparent;
    }

    .mission-card {
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
    }

    .vision-card {
      background: linear-gradient(135deg, rgba(118, 75, 162, 0.05) 0%, rgba(102, 126, 234, 0.05) 100%);
    }

    .mv-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 40px rgba(102, 126, 234, 0.15);
      border-color: rgba(102, 126, 234, 0.3);
    }

    .mv-icon {
      width: 80px;
      height: 80px;
      margin: 0 auto 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background: white;
      border-radius: 20px;
      box-shadow: 0 10px 30px rgba(102, 126, 234, 0.2);
      color: #667eea;
    }

    .mv-title {
      font-size: 1.75rem;
      font-weight: 700;
      color: #1a202c;
      margin: 0 0 1rem 0;
    }

    .mv-text {
      font-size: 1.125rem;
      color: #4a5568;
      line-height: 1.7;
      margin: 0;
    }

    /* Values Section */
    .values-section {
      margin-bottom: 5rem;
    }

    .values-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: #1a202c;
      text-align: center;
      margin: 0 0 3rem 0;
    }

    .values-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
    }

    .value-card {
      padding: 2rem;
      background: white;
      border-radius: 16px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      transition: all 0.3s ease;
      text-align: center;
      border: 2px solid transparent;
    }

    .value-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(102, 126, 234, 0.15);
      border-color: rgba(102, 126, 234, 0.3);
    }

    .value-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .value-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: #1a202c;
      margin: 0 0 0.75rem 0;
    }

    .value-description {
      font-size: 1rem;
      color: #718096;
      line-height: 1.6;
      margin: 0;
    }

    /* Timeline Section */
    .timeline-section {
      position: relative;
    }

    .timeline-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: #1a202c;
      text-align: center;
      margin: 0 0 3rem 0;
    }

    .timeline {
      position: relative;
      padding: 2rem 0;
    }

    .timeline::before {
      content: '';
      position: absolute;
      left: 50%;
      top: 0;
      bottom: 0;
      width: 3px;
      background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
      transform: translateX(-50%);
    }

    .timeline-item {
      position: relative;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      margin-bottom: 3rem;
    }

    .timeline-item.reverse .timeline-content {
      grid-column: 1;
      text-align: right;
    }

    .timeline-item:not(.reverse) .timeline-content {
      grid-column: 2;
    }

    .timeline-marker {
      position: absolute;
      left: 50%;
      top: 0;
      transform: translateX(-50%);
      width: 20px;
      height: 20px;
      background: #667eea;
      border: 4px solid white;
      border-radius: 50%;
      box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.2);
      z-index: 2;
    }

    .timeline-content {
      background: white;
      padding: 2rem;
      border-radius: 16px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    }

    .timeline-year {
      display: inline-block;
      padding: 0.5rem 1rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 50px;
      font-size: 0.875rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }

    .timeline-item-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: #1a202c;
      margin: 0 0 0.75rem 0;
    }

    .timeline-description {
      font-size: 1rem;
      color: #718096;
      line-height: 1.6;
      margin: 0;
    }

    /* Animations */
    @keyframes slideInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* Responsive Design */
    @media (max-width: 1024px) {
      .story-grid {
        gap: 3rem;
      }

      .section-title {
        font-size: 2.5rem;
      }

      .section-subtitle {
        font-size: 1.25rem;
      }

      .timeline::before {
        left: 30px;
      }

      .timeline-item {
        grid-template-columns: 1fr;
        padding-left: 80px;
      }

      .timeline-marker {
        left: 30px;
      }

      .timeline-item .timeline-content {
        grid-column: 1;
        text-align: left;
      }

      .timeline-item.reverse .timeline-content {
        grid-column: 1;
        text-align: left;
      }
    }

    @media (max-width: 768px) {
      .about-story-section {
        padding: 4rem 0;
      }

      .story-grid {
        grid-template-columns: 1fr;
        gap: 2.5rem;
        margin-bottom: 3rem;
      }

      .stats-badge {
        bottom: 1rem;
        right: 1rem;
        padding: 1rem 1.5rem;
        gap: 1rem;
      }

      .stat-number {
        font-size: 1.5rem;
      }

      .section-title {
        font-size: 2rem;
      }

      .section-subtitle {
        font-size: 1.1rem;
      }

      .story-paragraph {
        font-size: 1rem;
      }

      .mission-vision-grid {
        grid-template-columns: 1fr;
      }

      .mv-card {
        padding: 2rem;
      }

      .values-title,
      .timeline-title {
        font-size: 2rem;
      }

      .values-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 480px) {
      .container {
        padding: 0 1rem;
      }

      .about-story-section {
        padding: 3rem 0;
      }

      .section-title {
        font-size: 1.75rem;
      }

      .stats-badge {
        position: relative;
        bottom: auto;
        right: auto;
        margin-top: 1rem;
      }

      .decorative-shape {
        width: 100px;
        height: 100px;
      }
    }
  `]
})
export class AboutStoryComponent {
  // Inputs requeridos
  title = input.required<string>();
  mainImage = input.required<string>();
  paragraphs = input.required<string[]>();

  // Inputs opcionales
  sectionTag = input<string>('');
  subtitle = input<string>('');
  imageAlt = input<string>('Semillas & Talentos');
  keyPoints = input<string[]>([]);
  
  // Stats
  showStats = input<boolean>(false);
  yearsActive = input<number>(0);
  beneficiaries = input<number>(0);

  // Mission & Vision
  showMissionVision = input<boolean>(false);
  mission = input<string>('');
  vision = input<string>('');

  // Values
  values = input<ValueItem[]>([]);

  // Timeline
  timeline = input<TimelineItem[]>([]);
}