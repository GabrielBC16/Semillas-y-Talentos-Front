import { Component } from '@angular/core';
import { PageHeaderComponent } from "../../components/UI/header.component/header.component";
import { AboutStoryComponent } from "../../components/UI/about-story.component/about-story.component";

export interface ValueItem {
  icon: string;
  title: string;
  description: string;
}
export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-about',
  imports: [PageHeaderComponent, AboutStoryComponent],
  standalone: true,
  template: `
  <app-page-header title="Sobre Nosotros" [backgroundImage] = "'charlaSelva.webp'" [height]="''" ></app-page-header>
   <app-about-story
      [sectionTag]="'Nuestra Historia'"
      [title]="'¿Quiénes Somos?'"
      [subtitle]="'Una organización que cree en el poder de los jóvenes'"
      [mainImage]="'imgPrincipal.webp'"
      [paragraphs]="storyParagraphs"
      [keyPoints]="keyPoints"
      [showStats]="true"
      [yearsActive]="5"
      [beneficiaries]="500"
      [showMissionVision]="true"
      [mission]="mission"
      [vision]="vision"
      [values]="values"
      [timeline]="timeline">
    </app-about-story>
`,
  styles: [`

`]
})
export class AboutComponent {
  storyParagraphs = [
    'Semillas & Talentos nació en 2020 con un sueño: transformar la vida de jóvenes en comunidades vulnerables de Lima, brindándoles las herramientas necesarias para descubrir y desarrollar todo su potencial.',
    'A lo largo de estos años, hemos trabajado en colegios públicos, organizando charlas motivacionales, talleres de desarrollo personal y programas de mentoría que han impactado positivamente a cientos de estudiantes.',
    'Creemos firmemente que cada joven tiene un talento único esperando ser descubierto. Nuestra labor es sembrar la semilla de la confianza, el conocimiento y la esperanza en sus corazones.'
  ];

  keyPoints = [
    'Más de 15 de años de experiencia de nuestro equipo en desarrollo juvenil',
    'Equipo de profesionales comprometidos con el desarrollo de los jóvenes',
    'Programas 100% gratuitos para los beneficiarios'
  ];

  mission = 'Empoderar a los jóvenes desfavorecidos para que puedan superar las adversidades, alcanzar sus metas personales y profesionales, y convertirse en agentes de cambio positivo para la sociedad..';

  vision = 'Ser la organización líder en Perú en el desarrollo integral de jóvenes, reconocida por su impacto transformador en las comunidades y por crear una generación de líderes comprometidos con el cambio social.';

  values: ValueItem[] = [
    {
      icon: `<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="25" y="60" width="50" height="8" fill="#00B0F0"/>
<rect x="30" y="70" width="40" height="8" fill="#00B050"/>
<path d="M50 20L35 45H45V55H55V45H65L50 20Z" fill="#0070C0"/>
</svg>`,
      title: 'Empoderamiento',
      description: 'Creemos en el potencial de cada joven y trabajamos para que descubran su fuerza interior.'
    },
    {
      icon: `<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M40 45C38.5 45 37.25 45.75 36 47C34.75 48.25 33.75 49.5 32.5 50.5C31.25 51.5 30 52.25 28.5 52.5C27 52.75 25.5 52.75 24 52.5C22.5 52.25 21.25 51.5 20 50.5C18.75 49.5 17.75 48.25 16.5 47C15.25 45.75 14 45 12.5 45H10V60H20C21.5 60 22.75 59.25 24 58C25.25 56.75 26.25 55.5 27.5 54.5C28.75 53.5 30 52.75 31.5 52.5C33 52.25 34.5 52.25 36 52.5C37.5 52.75 38.75 53.5 40 54.5C41.25 55.5 42.25 56.75 43.5 58C44.75 59.25 46 60 47.5 60H50V45H40Z" fill="#00B0F0"/>
    <path d="M60 45C61.5 45 62.75 45.75 64 47C65.25 48.25 66.25 49.5 67.5 50.5C68.75 51.5 70 52.25 71.5 52.5C73 52.75 74.5 52.75 76 52.5C77.5 52.25 78.75 51.5 80 50.5C81.25 49.5 82.25 48.25 83.5 47C84.75 45.75 86 45 87.5 45H90V60H80C78.5 60 77.25 59.25 76 58C74.75 56.75 73.75 55.5 72.5 54.5C71.25 53.5 70 52.75 68.5 52.5C67 52.25 65.5 52.25 64 52.5C62.5 52.75 61.25 53.5 60 54.5C58.75 55.5 57.75 56.75 56.5 58C55.25 59.25 54 60 52.5 60H50V45H60Z" fill="#00B050"/>
    <path d="M50 45H40V60H50V45Z" fill="#0070C0"/>
    <path d="M50 45H60V60H50V45Z" fill="#0070C0"/>
    <path d="M42 47V45H48V47H42Z" fill="#0070C0"/>
    <path d="M52 47V45H58V47H52Z" fill="#0070C0"/>
    <path d="M40 50L30 60L20 50L30 40L40 50Z" stroke="#0070C0" stroke-width="2"/>
    <path d="M60 50L70 60L80 50L70 40L60 50Z" stroke="#0070C0" stroke-width="2"/>
    <path d="M40 50L50 60L60 50L50 40L40 50Z" stroke="#0070C0" stroke-width="2"/>
    <path d="M45 40L45 50" stroke="#0070C0" stroke-width="2"/>
    <path d="M55 40L55 50" stroke="#0070C0" stroke-width="2"/>
</svg>`,
      title: 'Solidaridad',
      description: 'Construimos puentes entre generaciones y creamos redes de apoyo duraderas.'
    },
    {
      icon: '🎯',
      title: 'Compromiso',
      description: 'Nos dedicamos con pasión a nuestra misión de transformar vidas cada día.'
    },
    {
      icon: '💡',
      title: 'Innovación',
      description: 'Buscamos constantemente nuevas formas de generar impacto positivo y sostenible.'
    },
    {
      icon: '🌱',
      title: 'Crecimiento',
      description: 'Promovemos el desarrollo continuo tanto de nuestros beneficiarios como de nuestro equipo.'
    },
    {
      icon: '❤️',
      title: 'Integridad',
      description: 'Actuamos con transparencia, honestidad y respeto en todas nuestras acciones.'
    }
  ];

  timeline: TimelineItem[] = [
    {
      year: '2010',
      title: 'Nace Semillas & Talentos',
      description: 'Iniciamos nuestra primera charla motivacional en la I.E. Micaela Bastidas con 50 estudiantes.'
    },
    {
      year: '2013',
      title: 'Expansión Regional',
      description: 'Llegamos al Callao con nuestro programa piloto en el Politécnico del Callao.'
    },
    {
      year: '2016',
      title: 'Formalización Legal',
      description: 'Nos constituimos oficialmente como Asociación Civil sin fines de lucro.'
    },
    {
      year: '2019',
      title: 'Programa de Mentoría',
      description: 'Lanzamos nuestro programa de mentoría uno a uno que ha beneficiado a más de 100 jóvenes.'
    },
    {
      year: '2022',
      title: 'Reconocimiento Nacional',
      description: 'Recibimos reconocimiento del MINEDU por nuestra labor en educación emocional.'
    },
    {
      year: '2025',
      title: 'Nuevos Horizontes',
      description: 'Inauguramos nuestro programa digital para llegar a jóvenes en zonas rurales de todo el Perú.'
    }
  ];

}
