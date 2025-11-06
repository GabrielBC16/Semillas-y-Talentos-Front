import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  Stat,
  StatsSectionComponent,
} from '../../components/UI/stats-section.component/stats-section.component';
import {
  CarouselComponent,
  CarouselSlide,
} from '../../components/UI/carousel.component/carousel.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, CarouselComponent, StatsSectionComponent],
  standalone: true,
  template: `
    <div id="hero-section" class="fullscreen">
      <app-carousel
        [slides]="heroSlides"
        [height]="'100vh'"
        [autoPlay]="true"
        [autoPlayInterval]="6000"
        [showArrows]="true"
        [showIndicators]="true"
      ></app-carousel>
    </div>

    <section class="video">
      <div class="contenedor-texto">
        <h2>EMPODERANDO A LA NUEVA GENERACIÓN</h2>
        <section id="barrita"></section>
        <p>
          Semillas & Talentos se enfoca en inspirar tanto a jóvenes como a padres, brindando una
          experiencia enriquecedora que mezcla conocimientos prácticos, experiencias personales y
          mensajes motivadores.
        </p>
      </div>
      <div class="video-container">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/j8uSeh_WhXk?si=OzO_dy7fas_FJzfu"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>
    </section>

    <app-stats-section
      [stats]="impactStats"
      [backgroundImage]="'imgCharla.webp'"
      [title]="'Los jóvenes nos necesitan'"
      [overlayOpacity]="0.7"
    >
    </app-stats-section>
  `,
  styles: [
    `
      html,
      body {
        margin: 0;
        padding: 0;
        height: 100%;
      }

      html {
        box-sizing: border-box;
      }

      *,
      *::before,
      *::after {
        box-sizing: inherit;
      }
      h1 {
        color: #2c3e50;
      }
      #hero-section {
        margin-bottom: 30px;
      }
      .video {
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;
        margin-bottom: 80px;
      }

      .contenedor-texto {
        width: 500px;
        height: 200px;
      }

      .contenedor-texto h2 {
        font-size: 24px;
        margin-bottom: 20px;
      }

      #barrita {
        background-color: #004aac;
        width: 150px;
        height: 5.5px;
        box-sizing: border-box;
        border: 1px solid #004aac;
        border-radius: 15%;
        margin-bottom: 15px;
      }

      .video-container {
        max-width: 560px;
        height: auto;
      }

      @media (max-width: 768px) {
        .video-container {
          width: 100%;
          height: auto;
        }

        .contenedor-texto {
          width: 100%;
          height: auto;
          margin-bottom: 20px;
          text-align: center;
        }
        iframe {
          width: 360px;
          height: 315px;
          margin-bottom: 50px;
        }
      }
    `,
  ],
})
export class HomeComponent {
  heroSlides: CarouselSlide[] = [
    {
      image: 'charlaMicaela.webp',
      title: 'Sembramos Esperanza',
      description: 'Transformando vidas a través de la educación y el desarrollo de talentos',
      buttonText: 'Conoce Más',
      buttonLink: '/about',
      textPosition: 'right',
      overlayOpacity: 0.5,
    },
    {
      image: 'charlaPolitecnico.webp',
      title: 'Cultivamos Talentos',
      description: 'Programas de capacitación para niños y jóvenes',
      buttonText: 'Únete',
      buttonLink: '/projects',
      textPosition: 'left',
      overlayOpacity: 0.4,
    },
    {
      image: 'charlaSelva.webp',
      title: 'Cosechamos Futuro',
      description: 'Juntos construimos una comunidad más fuerte',
      buttonText: 'Dona Ahora',
      buttonLink: '/donations',
      textPosition: 'right',
      overlayOpacity: 0.6,
    },
  ];

  impactStats: Stat[] = [
    {
      number: 500,
      label: 'Alumnos motivados',
      suffix: '',
    },
    {
      number: 100,
      label: 'padres apoyados',
      suffix: '',
    },
    {
      number: 40,
      label: 'colegios visitados',
      suffix: '',
    },
  ];
}
