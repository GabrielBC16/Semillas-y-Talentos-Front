import { Component, input, signal, effect, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Stat {
  number: number;
  label: string;
  suffix?: string;
  prefix?: string;
  duration?: number; // Duración de la animación en ms
}

@Component({
  selector: 'app-stats-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section 
      #statsSection
      class="stats-section" 
      [style.background-image]="'url(' + backgroundImage() + ')'"
      [style.min-height]="minHeight()">
      
      <!-- Overlay -->
      <div 
        class="stats-overlay" 
        [style.opacity]="overlayOpacity()">
      </div>

      <div class="stats-container">
        <!-- Title (opcional) -->
        @if (title()) {
          <h2 class="stats-title">{{ title() }}</h2>
        }

        @if (subtitle()) {
          <p class="stats-subtitle">{{ subtitle() }}</p>
        }

        <!-- Stats Grid -->
        <div class="stats-grid" [class]="'cols-' + stats().length">
          @for (stat of stats(); track $index) {
            <div class="stat-card">
              <div class="stat-number">
                {{ stat.prefix || '' }}{{ animatedValues()[$index] }}{{ stat.suffix || '' }}
              </div>
              <div class="stat-label">{{ stat.label }}</div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .stats-section {
      position: relative;
      width: 100%;
      height: 100vh;
      min-height: 500px;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      background-attachment: fixed;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    .stats-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.6) 100%);
      z-index: 1;
    }

    .stats-container {
      position: relative;
      z-index: 2;
      width: 100%;
      max-width: 1400px;
      padding: 4rem 2rem;
      text-align: center;
    }

    .stats-title {
      font-size: 3rem;
      font-weight: 700;
      color: white;
      margin: 0 0 2.5rem 0;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
      line-height: 1.2;
    }

    .stats-subtitle {
      font-size: 1.5rem;
      color: rgba(255, 255, 255, 0.9);
      margin: 0 0 3rem 0;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    }

    .stats-grid {
      display: grid;
      gap: 3rem;
      margin: 0 auto;
    }

    .stats-grid.cols-2 {
      grid-template-columns: repeat(2, 1fr);
      max-width: 800px;
    }

    .stats-grid.cols-3 {
      grid-template-columns: repeat(3, 1fr);
      max-width: 1200px;
    }

    .stats-grid.cols-4 {
      grid-template-columns: repeat(4, 1fr);
    }

    .stat-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    /*  background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      border: 2px solid rgba(255, 255, 255, 0.2);*/
      transition: all 0.4s ease;
      animation: fadeInUp 0.6s ease-out backwards;
    }

    .stat-card:nth-child(1) { animation-delay: 0.1s; }
    .stat-card:nth-child(2) { animation-delay: 0.2s; }
    .stat-card:nth-child(3) { animation-delay: 0.3s; }
    .stat-card:nth-child(4) { animation-delay: 0.4s; }

    .stat-card:hover {
      transform: translateY(-10px);
      background: rgba(255, 255, 255, 0.15);
      border-color: rgba(255, 255, 255, 0.4);
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
    }

    .stat-number {
      font-size: 4.5rem;
      font-weight: 800;
      color: white;
      line-height: 1;
      margin-bottom: 1rem;
      text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.5);
      background: linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%);
      -webkit-background-clip: text;

      background-clip: text;
    }

    .stat-label {
      font-size: 1.25rem;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.95);
      text-transform: lowercase;
      letter-spacing: 0.5px;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
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

    /* Responsive Design */
    @media (max-width: 1024px) {
      .stats-title {
        font-size: 2.5rem;
      }

      .stats-subtitle {
        font-size: 1.25rem;
      }

      .stat-number {
        font-size: 3.5rem;
      }

      .stat-label {
        font-size: 1.1rem;
      }

      .stats-grid {
        gap: 2rem;
      }
    }

    @media (max-width: 768px) {
      .stats-section {
        min-height: 400px;
        background-attachment: scroll;
      }

      .stats-container {
        padding: 3rem 1.5rem;
      }

      .stats-title {
        font-size: 2rem;
      }

      .stats-subtitle {
        font-size: 1rem;
        margin-bottom: 2rem;
      }

      .stats-grid.cols-2,
      .stats-grid.cols-3,
      .stats-grid.cols-4 {
        grid-template-columns: repeat(2, 1fr);
      }

      .stat-card {
        padding: 1.5rem;
      }

      .stat-number {
        font-size: 3rem;
      }

      .stat-label {
        font-size: 1rem;
      }

      .stats-grid {
        gap: 1.5rem;
      }
    }

    @media (max-width: 480px) {
      .stats-section {
        min-height: auto;
      }

      .stats-container {
        padding: 2rem 1rem;
      }

      .stats-title {
        font-size: 1.75rem;
        margin-bottom: 0.75rem;
      }

      .stats-subtitle {
        font-size: 0.95rem;
        margin-bottom: 1.5rem;
      }

      .stats-grid.cols-2,
      .stats-grid.cols-3,
      .stats-grid.cols-4 {
        grid-template-columns: 1fr;
        gap: 1.25rem;
      }

      .stat-card {
        padding: 1.25rem;
      }

      .stat-number {
        font-size: 2.5rem;
        margin-bottom: 0.75rem;
      }

      .stat-label {
        font-size: 0.95rem;
      }
    }
  `]
})
export class StatsSectionComponent implements AfterViewInit {
  @ViewChild('statsSection', { static: false }) statsSection!: ElementRef;

  // Inputs
  stats = input.required<Stat[]>();
  backgroundImage = input.required<string>();
  title = input<string>('');
  subtitle = input<string>('');
  minHeight = input<string>('500px');
  overlayOpacity = input<number>(0.7);
  animationDuration = input<number>(2000); // Duración por defecto

  // Estado para los valores animados
  animatedValues = signal<number[]>([]);
  private hasAnimated = false;
  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    // Inicializar valores en 0
    this.animatedValues.set(this.stats().map(() => 0));

    // Configurar Intersection Observer para animar cuando sea visible
    this.setupIntersectionObserver();
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupIntersectionObserver(): void {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3 // Animar cuando el 30% sea visible
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.hasAnimated) {
          this.hasAnimated = true;
          this.animateStats();
        }
      });
    }, options);

    if (this.statsSection) {
      this.observer.observe(this.statsSection.nativeElement);
    }
  }

  private animateStats(): void {
    this.stats().forEach((stat, index) => {
      const duration = stat.duration || this.animationDuration();
      const steps = 60; // Frames de animación
      const increment = stat.number / steps;
      const stepDuration = duration / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        const currentValue = Math.min(
          Math.round(increment * currentStep),
          stat.number
        );

        this.animatedValues.update(values => {
          const newValues = [...values];
          newValues[index] = currentValue;
          return newValues;
        });

        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, stepDuration);
    });
  }
}