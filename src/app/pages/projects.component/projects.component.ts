// proyectos.component.ts
import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../components/UI/header.component/header.component';
import { CardComponent } from '../../components/UI/card.component/card.component';
import {
  Stat,
  StatsSectionComponent,
} from '../../components/UI/stats-section.component/stats-section.component';

interface Proyecto {
  id: string;
  titulo: string;
  descripcion: string;
  imagen: string;
  categoria: string;
  fecha: string;
  estado: string;
  beneficiarios: number;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [PageHeaderComponent, CardComponent],
  template: `
    <app-page-header
      [title]="'Nuestros Proyectos'"
      [subtitle]="'Iniciativas que transforman comunidades'"
      [backgroundImage]="'imgCharla.webp'"
      [breadcrumbs]="[
        { label: 'Inicio', path: '/' },
        { label: 'Proyectos', path: '/proyectos' }
      ]"
      [height]="'800px'"
    >
    </app-page-header>

    <section class="projects-section">
      <div class="container">
        <div class="projects-grid">
          @for (proyecto of proyectos; track proyecto.id) {
          <app-card
            [title]="proyecto.titulo"
            [description]="proyecto.descripcion"
            [image]="proyecto.imagen"
            [imageAlt]="proyecto.titulo"
            [category]="proyecto.categoria"
            [date]="proyecto.fecha"
            [link]="'/projects/' + proyecto.id"
            [tags]="[{ label: proyecto.estado, color: getEstadoColor(proyecto.estado) }]"
            [metaItems]="[proyecto.beneficiarios + ' beneficiarios']"
            [ctaText]="'Ver proyecto completo'"
            size="medium"
          >
          </app-card>
          }
        </div>
      </div>
    </section>

    <section class="resultados-section"></section>
  `,
  styles: [
    `
      .projects-section {
        padding: 4rem 0;
        background: #f7fafc;
      }

      .container {
        max-width: 1400px;
        margin: 0 auto;
        padding: 0 2rem;
      }

      .projects-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        gap: 2rem;
      }

      @media (max-width: 768px) {
        .projects-grid {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class ProjectsComponent {
  proyectos: Proyecto[] = [
    {
      id: 'charla-micaela-bastidas',
      titulo: 'Charla Motivacional I.E. Micaela Bastidas',
      descripcion:
        'Programa de empoderamiento juvenil enfocado en desarrollo personal y habilidades blandas para estudiantes de 4to y 5to de secundaria.',
      imagen: 'charlaMicaela.webp',
      categoria: 'Educación',
      fecha: 'Marzo 2024',
      estado: 'Completado',
      beneficiarios: 120,
    },
    {
      id: 'politecnico-callao',
      titulo: 'Taller de Liderazgo - Politécnico del Callao',
      descripcion:
        'Serie de talleres diseñados para fortalecer capacidades de liderazgo y trabajo en equipo en estudiantes de educación técnica.',
      imagen: 'charlaPolitecnico.webp',
      categoria: 'Liderazgo',
      fecha: 'Enero 2024',
      estado: 'Completado',
      beneficiarios: 130,
    },
    {
      id: 'orientacion-vocacional-peru-kawachi',
      titulo: 'Charlas de orientación vocacional en I.E. Peru Kawachi',
      descripcion: 'Charlas a todos los salones de 5to y 4to de Secundaria, en la zona Los Olivos.',
      imagen: 'imgCharla.webp',
      categoria: 'Mentoría',
      fecha: 'En curso',
      estado: 'Completado',
      beneficiarios: 90,
    },
    {
      id: 'talleer-de-emprendimiento',
      titulo: 'Taller de Emprendimiento Juvenil',
      descripcion:
        'Taller práctico para jóvenes, para que obtengan conocimiento básico de emprendimientos y habilidades de ventas.',
      imagen: 'charlaSelva.webp',
      categoria: 'Becas',
      fecha: 'Febrero 2025',
      estado: 'Próximo',
      beneficiarios: 100,
    },
  ];

  impactStats: Stat[] = [
    {
      number: 500,
      label: 'Alumnos motivados',
      suffix: '',
    },
    {
      number: 30,
      label: 'padres apoyados',
      suffix: '',
    },
    {
      number: 3,
      label: 'colegios visitados',
      suffix: '',
    },
  ];

  getEstadoColor(estado: string): string {
    const colores: Record<string, string> = {
      Activo: '#10b981',
      Completado: '#3b82f6',
      Próximo: '#f59e0b',
      'En pausa': '#6b7280',
    };
    return colores[estado] || '#667eea';
  }
}
