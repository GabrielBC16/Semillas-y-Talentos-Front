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
  <app-page-header title="Sobre Nosotros" [backgroundImage] = "'charlaSelva.webp'" [height]="''" [breadcrumbs]="[
        { label: 'Inicio', path: '/' },
        { label: 'Nosotros', path: '/nosotros' }
      ]"></app-page-header>
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
      icon: 'valores-icons/4.webp',
      title: 'Empoderamiento',
      description: 'Creemos en el potencial de cada joven y trabajamos para que descubran su fuerza interior.'
    },
    {
      icon: 'valores-icons/colaboracion.webp',
      title: 'Solidaridad',
      description: 'Construimos puentes entre generaciones y creamos redes de apoyo duraderas.'
    },
    {
      icon: 'valores-icons/8.webp',
      title: 'Compromiso',
      description: 'Nos dedicamos con pasión a nuestra misión de transformar vidas cada día.'
    },
    {
      icon: 'valores-icons/innovacion.webp',
      title: 'Innovación',
      description: 'Buscamos constantemente nuevas formas de generar impacto positivo y sostenible.'
    },
    {
      icon: 'valores-icons/crecimiento.webp',
      title: 'Crecimiento',
      description: 'Promovemos el desarrollo continuo tanto de nuestros beneficiarios como de nuestro equipo.'
    },
    {
      icon: 'valores-icons/integridad.webp',
      title: 'Integridad',
      description: 'Actuamos con transparencia, honestidad y respeto en todas nuestras acciones.'
    }
  ];

  timeline: TimelineItem[] = [
    {
      year: '2020',
      title: 'Nace Semillas & Talentos',
      description: 'Iniciamos nuestra primera charla motivacional en la I.E. Micaela Bastidas con 50 estudiantes.'
    },
    {
      year: '2023',
      title: 'Expansión Regional',
      description: 'Llegamos al Callao con nuestro programa piloto en el Politécnico del Callao.'
    },
    {
      year: '2024',
      title: 'Formalización Legal',
      description: 'Nos constituimos oficialmente como Asociación Civil sin fines de lucro.'
    },
    {
      year: '2025',
      title: 'Ampliación digital',
      description: 'Inauguramos nuestro programa digital para llegar a jóvenes en zonas rurales de todo el Perú.'
    }
  ];

}
