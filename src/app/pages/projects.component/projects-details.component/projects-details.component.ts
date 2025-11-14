// project-detail.component.ts
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProjectsService } from '../../../services/projects.service';
import { CardComponent } from '../../../components/UI/card.component/card.component';
import { Project } from '../../../models/project.interface';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, CardComponent],
  template: `
    @if (project()) {
    <article class="project-detail">
      <!-- Hero Section -->
      <section
        class="project-hero"
        [style.background-image]="'url(' + project()!.imagenPrincipal + ')'"
      >
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <div class="container">
            <!-- Breadcrumb -->
            <nav class="breadcrumb">
              <a routerLink="/">Inicio</a>
              <span class="separator">/</span>
              <a routerLink="/projects">Proyectos</a>
              <span class="separator">/</span>
              <span>{{ project()!.titulo }}</span>
            </nav>

            <!-- Badge de Estado -->
            <span class="estado-badge" [class]="'estado-' + project()!.estado">
              {{ getEstadoLabel(project()!.estado) }}
            </span>

            <h1 class="project-title">{{ project()!.titulo }}</h1>

            @if (project()!.subtitulo) {
            <p class="project-subtitle">{{ project()!.subtitulo }}</p>
            }

            <!-- Meta Info -->
            <div class="project-meta">
              <div class="meta-item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span>{{ project()!.beneficiarios }} beneficiarios</span>
              </div>
              <div class="meta-item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>{{ project()!.ubicacion }}</span>
              </div>
              <div class="meta-item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <span>{{ project()!.fechaInicio }}</span>
              </div>
              @if (project()!.categoria) {
              <div class="meta-item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"
                  ></path>
                  <line x1="7" y1="7" x2="7.01" y2="7"></line>
                </svg>
                <span>{{ project()!.categoria }}</span>
              </div>
              }
            </div>
          </div>
        </div>
      </section>

      <!-- Main Content -->
      <div class="project-content">
        <div class="container">
          <div class="content-grid">
            <!-- Main Column -->
            <div class="main-column">
              <!-- Descripción -->
              <section class="content-section">
                <h2 class="section-title">Sobre el Proyecto</h2>
                <div class="project-descripcion" [innerHTML]="project()!.descripcionLarga"></div>
              </section>

              <!-- Objetivos -->
              @if (project()!.objetivos && project()!.objetivos.length > 0) {
              <section class="content-section">
                <h2 class="section-title">Objetivos del Proyecto</h2>
                <ul class="objetivos-list">
                  @for (objetivo of project()!.objetivos; track $index) {
                  <li class="objetivo-item">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <circle cx="12" cy="12" r="6"></circle>
                      <circle cx="12" cy="12" r="2"></circle>
                    </svg>
                    <span>{{ objetivo }}</span>
                  </li>
                  }
                </ul>
              </section>
              }

              <!-- Resultados -->
              @if (project()!.resultados && project()!.resultados!.length > 0) {
              <section class="content-section resultados-section">
                <h2 class="section-title">Resultados Alcanzados</h2>
                <ul class="resultados-list">
                  @for (resultado of project()!.resultados; track $index) {
                  <li class="resultado-item">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>{{ resultado }}</span>
                  </li>
                  }
                </ul>
              </section>
              }

              <!-- Galería de Imágenes -->
              @if (project()!.imagenes && project()!.imagenes.length > 0) {
              <section class="content-section">
                <h2 class="section-title">Galería del Proyecto</h2>
                <div class="galeria-grid">
                  @for (imagen of project()!.imagenes; track $index) {
                  <div class="galeria-item" (click)="openImageModal(imagen)">
                    <img
                      [src]="imagen"
                      [alt]="project()!.titulo + ' - Imagen ' + ($index + 1)"
                      loading="lazy"
                    />
                    <div class="galeria-overlay">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        <line x1="11" y1="8" x2="11" y2="14"></line>
                        <line x1="8" y1="11" x2="14" y2="11"></line>
                      </svg>
                    </div>
                  </div>
                  }
                </div>
              </section>
              }

              <!-- Testimonios -->
              @if (project()!.testimonios && project()!.testimonios!.length > 0) {
              <section class="content-section">
                <h2 class="section-title">Testimonios</h2>
                <div class="testimonios-grid">
                  @for (testimonio of project()!.testimonios; track $index) {
                  <div class="testimonio-card">
                    <div class="testimonio-header">
                      @if (testimonio.imagen) {
                      <img
                        [src]="testimonio.imagen"
                        [alt]="testimonio.nombre"
                        class="testimonio-avatar"
                      />
                      } @else {
                      <div class="testimonio-avatar-placeholder">
                        {{ testimonio.nombre.charAt(0) }}
                      </div>
                      }
                      <div class="testimonio-info">
                        <strong class="testimonio-nombre">{{ testimonio.nombre }}</strong>
                        <span class="testimonio-rol">{{ testimonio.rol }}</span>
                      </div>
                    </div>
                    <p class="testimonio-texto">"{{ testimonio.texto }}"</p>
                  </div>
                  }
                </div>
              </section>
              }
            </div>

            <!-- Sidebar -->
            <aside class="sidebar">
              <!-- Logros/Stats -->
              @if (project()!.logros && project()!.logros!.length > 0) {
              <div class="sidebar-card logros-card">
                <h3 class="sidebar-title">Impacto del Proyecto</h3>
                <div class="logros-grid">
                  @for (logro of project()!.logros; track $index) {
                  <div class="logro-item">
                    <div class="logro-icon">{{ logro.icono }}</div>
                    <div class="logro-valor">{{ logro.valor }}</div>
                    <div class="logro-titulo">{{ logro.titulo }}</div>
                  </div>
                  }
                </div>
              </div>
              }

              <!-- Información Adicional -->
              <div class="sidebar-card info-card">
                <h3 class="sidebar-title">Información del Proyecto</h3>
                <div class="info-items">
                  @if (project()!.institucion) {
                  <div class="info-item">
                    <span class="info-label">Institución</span>
                    <span class="info-value">{{ project()!.institucion }}</span>
                  </div>
                  }
                  <div class="info-item">
                    <span class="info-label">Inicio</span>
                    <span class="info-value">{{ project()!.fechaInicio }}</span>
                  </div>
                  @if (project()!.fechaFin) {
                  <div class="info-item">
                    <span class="info-label">Finalización</span>
                    <span class="info-value">{{ project()!.fechaFin }}</span>
                  </div>
                  }
                  <div class="info-item">
                    <span class="info-label">Beneficiarios</span>
                    <span class="info-value">{{ project()!.beneficiarios }} personas</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">Ubicación</span>
                    <span class="info-value">{{ project()!.ubicacion }}</span>
                  </div>
                </div>
              </div>

              <!-- Colaboradores -->
              @if (project()!.colaboradores && project()!.colaboradores!.length > 0) {
              <div class="sidebar-card colaboradores-card">
                <h3 class="sidebar-title">Colaboradores</h3>
                <div class="colaboradores-list">
                  @for (colaborador of project()!.colaboradores; track $index) {
                  <div class="colaborador-item">
                    @if (colaborador.url) {
                    <a [href]="colaborador.url" target="_blank" rel="noopener">
                      <img [src]="colaborador.logo" [alt]="colaborador.nombre" />
                    </a>
                    } @else {
                    <img [src]="colaborador.logo" [alt]="colaborador.nombre" />
                    }
                  </div>
                  }
                </div>
              </div>
              }

              <!-- CTA Card -->
              @if (project()!.ctaTexto) {
              <div class="sidebar-card cta-card">
                <h3 class="cta-title">¿Te interesa este proyecto?</h3>
                <p class="cta-text">
                  Contáctanos para conocer más detalles o solicitar un programa similar.
                </p>
                <a [routerLink]="project()!.ctaLink || '/contacto'" class="cta-button">
                  {{ project()!.ctaTexto }}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
              </div>
              }

              <!-- Compartir -->
              <div class="sidebar-card share-card">
                <h3 class="sidebar-title">Compartir Proyecto</h3>
                <div class="share-buttons">
                  <button class="share-btn facebook" (click)="shareOnFacebook()">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                      />
                    </svg>
                  </button>
                  <button class="share-btn twitter" (click)="shareOnTwitter()">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                      />
                    </svg>
                  </button>
                  <button class="share-btn whatsapp" (click)="shareOnWhatsApp()">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
                      />
                    </svg>
                  </button>
                  <button class="share-btn link" (click)="copyLink()">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                    </svg>
                  </button>
                </div>
                @if (linkCopied()) {
                <p class="link-copied-message">¡Enlace copiado!</p>
                }
              </div>
            </aside>
          </div>
        </div>
      </div>

      <!-- Proyectos Relacionados -->
      @if (projectsRelacionados().length > 0) {
      <section class="related-section">
        <div class="container">
          <h2 class="related-title">Proyectos Relacionados</h2>
          <div class="related-grid">
            @for (related of projectsRelacionados(); track related.id) {
            <app-card
              [title]="related.titulo"
              [description]="related.descripcion"
              [image]="related.imagenPrincipal"
              [imageAlt]="related.titulo"
              [category]="related.categoria"
              [date]="related.fechaInicio"
              [link]="'/projects/' + related.id"
              [tags]="[{ label: related.estado, color: getEstadoColor(related.estado) }]"
              [metaItems]="[related.beneficiarios + ' beneficiarios']"
              size="medium"
            >
            </app-card>
            }
          </div>
          <div class="related-actions">
            <a routerLink="/projects" class="view-all-btn">
              Ver todos los projects
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>
        </div>
      </section>
      }
    </article>
    } @else {
    <div class="not-found">
      <div class="container">
        <div class="not-found-content">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="120"
            height="120"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M16 16s-1.5-2-4-2-4 2-4 2"></path>
            <line x1="9" y1="9" x2="9.01" y2="9"></line>
            <line x1="15" y1="9" x2="15.01" y2="9"></line>
          </svg>
          <h1>Proyecto no encontrado</h1>
          <p>Lo sentimos, el project que buscas no existe o ha sido movido.</p>
          <a routerLink="/projects" class="back-btn">Ver todos los projects</a>
        </div>
      </div>
    </div>
    }
  `,
  styles: [
    `
      /* Hero Section */
      .project-hero {
        position: relative;
        min-height: 500px;
        background-size: cover;
        background-position: center;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 4rem 0;
      }

      .hero-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.5) 100%);
      }

      .hero-content {
        position: relative;
        z-index: 2;
        width: 100%;
        color: white;
      }

      .container {
        max-width: 1400px;
        margin: 0 auto;
        padding: 0 2rem;
      }

      /* Breadcrumb */
      .breadcrumb {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-size: 0.95rem;
        margin-bottom: 2rem;
        flex-wrap: wrap;
      }

      .breadcrumb a {
        color: rgba(255, 255, 255, 0.9);
        text-decoration: none;
        transition: color 0.3s ease;
      }

      .breadcrumb a:hover {
        color: white;
      }

      .separator {
        color: rgba(255, 255, 255, 0.6);
      }

      /* Estado Badge */
      .estado-badge {
        display: inline-block;
        padding: 0.5rem 1rem;
        border-radius: 50px;
        font-size: 0.875rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 1.5rem;
      }

      .estado-activo {
        background: #10b981;
        color: white;
      }

      .estado-completado {
        background: #3b82f6;
        color: white;
      }

      .estado-proximo {
        background: #f59e0b;
        color: white;
      }

      /* Hero Text */
      .project-titulo {
        font-size: 3.5rem;
        font-weight: 800;
        margin: 0 0 1rem 0;
        line-height: 1.2;
        text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
      }

      .project-subtitulo {
        font-size: 1.5rem;
        margin: 0 0 2rem 0;
        opacity: 0.95;
        text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
      }

      /* Meta Info */
      .project-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 2rem;
      }

      .meta-item {
        display: flex;
        align-items: center;
        gap: 0.8rem;
        font-size: 1.05rem;
        font-weight: 500;
        padding: 0.9rem 0;
      }

      .meta-item svg {
        flex-shrink: 0;
      }

      /* Content Grid */
      .project-content {
        padding: 4rem 0;
        background: #f7fafc;
      }

      .content-grid {
        display: grid;
        grid-template-columns: 1fr 400px;
        gap: 3rem;
      }

      /* Main Column */
      .main-column {
        display: flex;
        flex-direction: column;
        gap: 3rem;
      }

      .content-section {
        background: white;
        padding: 2.5rem;
        border-radius: 20px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      }

      .section-title {
        font-size: 2rem;
        font-weight: 700;
        color: #1a202c;
        margin: 0 0 1.5rem 0;
        padding-bottom: 1rem;
        border-bottom: 3px solid #1a39c4ff;
      }

      /* Descripción */
      .project-descripcion {
        font-size: 1.125rem;
        color: #4a5568;
        line-height: 1.8;
      }

      .project-descripcion :deep(p) {
        margin: 0 0 1rem 0;
      }

      .project-descripcion :deep(p:last-child) {
        margin-bottom: 0;
      }

      /* Objetivos */
      .objetivos-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
      }

      .objetivo-item {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        font-size: 1.05rem;
        color: #2d3748;
        line-height: 1.6;
      }

      .objetivo-item svg {
        flex-shrink: 0;
        color: #667eea;
        margin-top: 0.125rem;
      }

      /* Resultados */
      .resultados-section {
        background: linear-gradient(
          135deg,
          rgba(102, 126, 234, 0.05) 0%,
          rgba(118, 75, 162, 0.05) 100%
        );
      }

      .resultados-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .resultado-item {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        font-size: 1.05rem;
        color: #2d3748;
        padding: 1rem;
        background: white;
        border-radius: 10px;
        line-height: 1.6;
      }

      .resultado-item svg {
        flex-shrink: 0;
        color: #10b981;
        margin-top: 0.125rem;
      }

      /* Galería */
      .galeria-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 1rem;
      }

      .galeria-item {
        position: relative;
        aspect-ratio: 4/3;
        border-radius: 12px;
        overflow: hidden;
        cursor: pointer;
        transition: transform 0.3s ease;
      }

      .galeria-item:hover {
        transform: scale(1.03);
      }

      .galeria-item img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .galeria-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      .galeria-item:hover .galeria-overlay {
        opacity: 1;
      }

      /* Testimonios */
      .testimonios-grid {
        display: grid;
        gap: 1.5rem;
      }

      .testimonio-card {
        padding: 2rem;
        background: #f7fafc;
        border-radius: 16px;
        border-left: 4px solid #667eea;
      }

      .testimonio-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;
      }

      .testimonio-avatar {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        object-fit: cover;
      }

      .testimonio-avatar-placeholder {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        font-weight: 700;
      }

      .testimonio-info {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }

      .testimonio-nombre {
        font-size: 1.05rem;
        color: #1a202c;
      }

      .testimonio-rol {
        font-size: 0.9rem;
        color: #718096;
      }

      .testimonio-texto {
        font-size: 1.05rem;
        color: #4a5568;
        line-height: 1.7;
        margin: 0;
        font-style: italic;
      }

      /* Sidebar */
      .sidebar {
        display: flex;
        flex-direction: column;
        gap: 2rem;
      }

      .sidebar-card {
        background: white;
        padding: 2rem;
        border-radius: 20px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      }

      .sidebar-title {
        font-size: 1.25rem;
        font-weight: 700;
        color: #1a202c;
        margin: 0 0 1.5rem 0;
      }

      /* Logros Card */
      .logros-card {
        background: linear-gradient(
          135deg,
          rgba(102, 126, 234, 0.1) 0%,
          rgba(118, 75, 162, 0.1) 100%
        );
      }

      .logros-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;
      }

      .logro-item {
        text-align: center;
        padding: 1.5rem 1rem;
        background: white;
        border-radius: 12px;
      }

      .logro-icon {
        font-size: 2.5rem;
        margin-bottom: 0.75rem;
      }

      .logro-valor {
        font-size: 2rem;
        font-weight: 800;
        color: #1a202c;
        line-height: 1;
        margin-bottom: 0.5rem;
      }

      .logro-titulo {
        font-size: 0.875rem;
        color: #718096;
        font-weight: 600;
      }

      /* Info Card */
      .info-items {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .info-item {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        padding-bottom: 1rem;
        border-bottom: 1px solid #e2e8f0;
      }

      .info-item:last-child {
        border-bottom: none;
        padding-bottom: 0;
      }

      .info-label {
        font-size: 0.9rem;
        color: #718096;
        font-weight: 600;
      }

      .info-value {
        font-size: 0.95rem;
        color: #2d3748;
        font-weight: 500;
        text-align: right;
        max-width: 60%;
      }

      /* Colaboradores */
      .colaboradores-list {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
      }

      .colaborador-item {
        padding: 1rem;
        background: #f7fafc;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .colaborador-item img {
        max-width: 100%;
        height: auto;
        max-height: 60px;
      }

      /* CTA Card */
      .cta-card {
        background: linear-gradient(135deg, #667eea 0%, #4ba272ff 100%);
        color: white;
      }

      .cta-title {
        font-size: 1.25rem;
        font-weight: 700;
        margin: 0 0 1rem 0;
      }

      .cta-text {
        font-size: 0.95rem;
        opacity: 0.95;
        margin: 0 0 1.5rem 0;
        line-height: 1.6;
      }

      .cta-button {
        display: inline-flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.875rem 1.75rem;
        background: white;
        color: #667eea;
        text-decoration: none;
        border-radius: 50px;
        font-weight: 600;
        font-size: 0.95rem;
        transition: all 0.3s ease;
        width: 100%;
        justify-content: center;
      }

      .cta-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
      }

      /* Share Card */
      .share-buttons {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 0.75rem;
      }

      .share-btn {
        padding: 0.875rem;
        border: none;
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
      }

      .share-btn.facebook {
        background: #1877f2;
      }

      .share-btn.twitter {
        background: #1da1f2;
      }

      .share-btn.whatsapp {
        background: #25d366;
      }

      .share-btn.link {
        background: #718096;
      }

      .share-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
      }

      .link-copied-message {
        margin-top: 1rem;
        padding: 0.75rem;
        background: #10b981;
        color: white;
        border-radius: 8px;
        text-align: center;
        font-size: 0.9rem;
        font-weight: 600;
        animation: slideDown 0.3s ease;
      }

      /* Related Section */
      .related-section {
        padding: 4rem 0;
        background: white;
      }

      .related-title {
        font-size: 2.5rem;
        font-weight: 800;
        color: #1a202c;
        margin: 0 0 3rem 0;
        text-align: center;
      }

      .related-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;
        margin-bottom: 2rem;
      }

      .related-actions {
        display: flex;
        justify-content: center;
      }

      .view-all-btn {
        display: inline-flex;
        align-items: center;
        gap: 0.75rem;
        padding: 1rem 2rem;
        background: transparent;
        color: #667eea;
        border: 2px solid #667eea;
        text-decoration: none;
        border-radius: 50px;
        font-weight: 600;
        font-size: 1rem;
        transition: all 0.3s ease;
      }

      .view-all-btn:hover {
        background: #667eea;
        color: white;
        transform: translateY(-2px);
      }

      /* Not Found */
      .not-found {
        min-height: 60vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 4rem 0;
      }

      .not-found-content {
        text-align: center;
        max-width: 500px;
      }

      .not-found-content svg {
        color: #cbd5e0;
        margin-bottom: 2rem;
      }

      .not-found-content h1 {
        font-size: 2rem;
        font-weight: 700;
        color: #1a202c;
        margin: 0 0 1rem 0;
      }

      .not-found-content p {
        font-size: 1.125rem;
        color: #718096;
        margin: 0 0 2rem 0;
      }

      .back-btn {
        display: inline-block;
        padding: 1rem 2rem;
        background: #667eea;
        color: white;
        text-decoration: none;
        border-radius: 50px;
        font-weight: 600;
        transition: all 0.3s ease;
      }

      .back-btn:hover {
        background: #5568d3;
        transform: translateY(-2px);
      }

      /* Animations */
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

      /* Responsive */
      @media (max-width: 1200px) {
        .content-grid {
          grid-template-columns: 1fr 350px;
        }

        .related-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @media (max-width: 1024px) {
        .content-grid {
          grid-template-columns: 1fr;
        }

        .sidebar {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @media (max-width: 768px) {
        .project-hero {
          min-height: 400px;
          padding: 3rem 0;
        }

        .project-titulo {
          font-size: 2.5rem;
        }

        .project-subtitulo {
          font-size: 1.25rem;
        }

        .project-meta {
          gap: 1rem;
        }

        .meta-item {
          font-size: 0.95rem;
        }

        .content-section {
          padding: 2rem;
        }

        .section-title {
          font-size: 1.75rem;
        }

        .logros-grid {
          grid-template-columns: 1fr;
        }

        .sidebar {
          grid-template-columns: 1fr;
        }

        .related-grid {
          grid-template-columns: 1fr;
        }

        .galeria-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @media (max-width: 480px) {
        .container {
          padding: 0 1rem;
        }

        .project-hero {
          min-height: 350px;
          padding: 2rem 0;
        }

        .project-titulo {
          font-size: 2rem;
        }

        .project-subtitulo {
          font-size: 1.1rem;
        }

        .breadcrumb {
          font-size: 0.875rem;
        }

        .content-section {
          padding: 1.5rem;
        }

        .sidebar-card {
          padding: 1.5rem;
        }

        .galeria-grid {
          grid-template-columns: 1fr;
        }

        .share-buttons {
          grid-template-columns: repeat(2, 1fr);
        }

        .colaboradores-list {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class ProjectsDetailsComponent implements OnInit {
  project = signal<Project | null>(null);
  projectsRelacionados = signal<Project[]>([]);
  linkCopied = signal(false);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectsService: ProjectsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      const project = this.projectsService.getProjectById(id);

      if (project) {
        this.project.set(project);

        // Cargar projects relacionados
        const relacionados = this.projectsService.getRelatedProjects(id, 3);
        this.projectsRelacionados.set(relacionados);

        // Scroll to top cuando cambia el project
        window.scrollTo(0, 0);
      } else {
        this.project.set(null);
      }
    });
  }

  getEstadoLabel(estado: string): string {
    const labels: Record<string, string> = {
      activo: 'En Curso',
      completado: 'Completado',
      proximo: 'Próximamente',
    };
    return labels[estado] || estado;
  }

  getEstadoColor(estado: string): string {
    const colores: Record<string, string> = {
      activo: '#10b981',
      completado: '#3b82f6',
      proximo: '#f59e0b',
    };
    return colores[estado] || '#667eea';
  }

  openImageModal(imagen: string): void {
    // Aquí puedes implementar un modal para ver la imagen en grande
    // Por ahora, abrimos en nueva pestaña
    window.open(imagen, '_blank');
  }

  shareOnFacebook(): void {
    const url = window.location.href;
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      '_blank'
    );
  }

  shareOnTwitter(): void {
    const url = window.location.href;
    const text = this.project()?.titulo || '';
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(
        text
      )}`,
      '_blank'
    );
  }

  shareOnWhatsApp(): void {
    const url = window.location.href;
    const text = `${this.project()?.titulo} - ${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  }

  copyLink(): void {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      this.linkCopied.set(true);
      setTimeout(() => this.linkCopied.set(false), 3000);
    });
  }
}
