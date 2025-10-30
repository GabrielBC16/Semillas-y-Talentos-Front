import { Component, input, signal, effect, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface CarouselSlide {
  image: string;
  title: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
  textPosition?: 'left' | 'center' | 'right';
  overlayOpacity?: number;
}

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="carousel-container" [style.height]="height()">
      <!-- Slides -->
      <div class="carousel-slides">
        @for (slide of slides(); track $index) {
          <div 
            class="carousel-slide"
            [class.active]="currentIndex() === $index"
            [style.background-image]="'url(' + slide.image + ')'">
            
            <!-- Overlay -->
            <div 
              class="carousel-overlay" 
              [style.opacity]="slide.overlayOpacity ?? 0.4">
            </div>
            
            <!-- Content -->
            <div class="carousel-content" [class]="'text-' + (slide.textPosition ?? 'center')">
              <div class="content-wrapper">
                <h1 class="carousel-title">{{ slide.title }}</h1>
                <p class="carousel-description">{{ slide.description }}</p>
                @if (slide.buttonText) {
                  <a 
                    [href]="slide.buttonLink ?? '#'"
                    class="carousel-button">
                    {{ slide.buttonText }}
                  </a>
                }
              </div>
            </div>
          </div>
        }
      </div>

      <!-- Navigation Arrows -->
      @if (showArrows()) {
        <button 
          class="carousel-arrow carousel-arrow-left" 
          (click)="previousSlide()"
          aria-label="Slide anterior">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        
        <button 
          class="carousel-arrow carousel-arrow-right" 
          (click)="nextSlide()"
          aria-label="Siguiente slide">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      }

      <!-- Indicators -->
      @if (showIndicators()) {
        <div class="carousel-indicators">
          @for (slide of slides(); track $index) {
            <button
              class="carousel-indicator"
              [class.active]="currentIndex() === $index"
              (click)="goToSlide($index)"
              [attr.aria-label]="'Ir al slide ' + ($index + 1)">
            </button>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .carousel-container {
      position: relative;
      width: 100%;
      height: 600px;
      overflow: hidden;
      background-color: #1a1a1a;
    }

    .carousel-slides {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .carousel-slide {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      opacity: 0;
      transition: opacity 0.8s ease-in-out;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .carousel-slide.active {
      opacity: 1;
      z-index: 1;
    }

    .carousel-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 100%);
      z-index: 2;
    }

    .carousel-content {
      position: relative;
      z-index: 3;
      width: 100%;
      padding: 0 2rem;
      color: white;
    }

    .carousel-content.text-left {
      text-align: left;
    }

    .carousel-content.text-center {
      text-align: center;
    }

    .carousel-content.text-right {
      text-align: right;
    }

    .content-wrapper {
      max-width: 1200px;
      margin: 0 auto;
    }

    .carousel-title {
      font-size: 3.5rem;
      font-weight: 700;
      margin: 0 0 1.5rem 0;
      line-height: 1.2;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
      animation: slideInUp 0.8s ease-out;
    }

    .carousel-description {
      font-size: 1.5rem;
      margin: 0 0 2rem 0;
      line-height: 1.6;
      text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
      animation: slideInUp 0.8s ease-out 0.2s both;
    }

    .carousel-button {
      display: inline-block;
      padding: 1rem 2.5rem;
      font-size: 1.125rem;
      font-weight: 600;
      color: white;
      background: linear-gradient(135deg, #667eea 0%, #1bb335ff 100%);
      border: none;
      border-radius: 50px;
      cursor: pointer;
      text-decoration: none;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
      animation: slideInUp 0.8s ease-out 0.4s both;
    }

    .carousel-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
    }

    /* Navigation Arrows */
    .carousel-arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 4;
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(10px);
      border: none;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      color: white;
    }

    .carousel-arrow:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: translateY(-50%) scale(1.1);
    }

    .carousel-arrow-left {
      left: 2rem;
    }

    .carousel-arrow-right {
      right: 2rem;
    }

    /* Indicators */
    .carousel-indicators {
      position: absolute;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      z-index: 4;
      display: flex;
      gap: 0.75rem;
    }

    .carousel-indicator {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      border: 2px solid white;
      background: transparent;
      cursor: pointer;
      transition: all 0.3s ease;
      padding: 0;
    }

    .carousel-indicator.active {
      background: white;
      transform: scale(1.2);
    }

    .carousel-indicator:hover {
      background: rgba(255, 255, 255, 0.5);
    }

    /* Animations */
    @keyframes slideInUp {
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
      .carousel-title {
        font-size: 2.5rem;
      }

      .carousel-description {
        font-size: 1.25rem;
      }

      .carousel-arrow {
        width: 40px;
        height: 40px;
      }

      .carousel-arrow-left {
        left: 1rem;
      }

      .carousel-arrow-right {
        right: 1rem;
      }
    }

    @media (max-width: 768px) {
      .carousel-container {
        height: 500px;
      }

      .carousel-title {
        font-size: 2rem;
        margin-bottom: 1rem;
      }

      .carousel-description {
        font-size: 1rem;
        margin-bottom: 1.5rem;
      }

      .carousel-button {
        padding: 0.875rem 2rem;
        font-size: 1rem;
      }

      .carousel-arrow {
        width: 35px;
        height: 35px;
      }

      .carousel-indicators {
        bottom: 1.5rem;
      }

      .carousel-indicator {
        width: 10px;
        height: 10px;
      }
    }

    @media (max-width: 480px) {
      .carousel-container {
        height: 400px;
      }

      .carousel-content {
        padding: 0 1rem;
      }

      .carousel-title {
        font-size: 1.75rem;
      }

      .carousel-description {
        font-size: 0.9rem;
      }

      .carousel-arrow {
        width: 30px;
        height: 30px;
      }

      .carousel-arrow-left {
        left: 0.5rem;
      }

      .carousel-arrow-right {
        right: 0.5rem;
      }
    }
  `]
})
export class CarouselComponent implements OnDestroy {
  // Inputs usando signals (Angular 20)
  slides = input.required<CarouselSlide[]>();
  height = input<string>('600px');
  autoPlay = input<boolean>(true);
  autoPlayInterval = input<number>(5000);
  showArrows = input<boolean>(true);
  showIndicators = input<boolean>(true);

  // Estado interno
  currentIndex = signal(0);
  private intervalId?: number;

  constructor() {
    // Effect para manejar el autoplay
    effect(() => {
      if (this.autoPlay()) {
        this.startAutoPlay();
      } else {
        this.stopAutoPlay();
      }
    });
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  nextSlide(): void {
    const nextIndex = (this.currentIndex() + 1) % this.slides().length;
    this.currentIndex.set(nextIndex);
    this.resetAutoPlay();
  }

  previousSlide(): void {
    const prevIndex = this.currentIndex() === 0 
      ? this.slides().length - 1 
      : this.currentIndex() - 1;
    this.currentIndex.set(prevIndex);
    this.resetAutoPlay();
  }

  goToSlide(index: number): void {
    this.currentIndex.set(index);
    this.resetAutoPlay();
  }

  private startAutoPlay(): void {
    this.stopAutoPlay();
    this.intervalId = window.setInterval(() => {
      this.nextSlide();
    }, this.autoPlayInterval());
  }

  private stopAutoPlay(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }

  private resetAutoPlay(): void {
    if (this.autoPlay()) {
      this.startAutoPlay();
    }
  }
}