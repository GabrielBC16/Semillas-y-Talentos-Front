// models/proyecto.interface.ts
export interface Project {
  id: string; // URL-friendly: 'charla-micaela-bastidas'
  titulo: string;
  subtitulo?: string;
  descripcion: string;
  descripcionLarga: string; // Para la página de detalle
  categoria: string;
  estado: 'activo' | 'completado' | 'proximo';

  // Imágenes
  imagenPrincipal: string;
  imagenes: string[]; // Galería de imágenes

  // Fechas
  fechaInicio: string;
  fechaFin?: string;

  // Impacto
  beneficiarios: number;
  ubicacion: string;
  institucion?: string;

  // Objetivos y resultados
  objetivos: string[];
  resultados?: string[];
  logros?: {
    titulo: string;
    valor: string | number;
    icono: string;
  }[];

  // Testimonios
  testimonios?: {
    nombre: string;
    rol: string;
    texto: string;
    imagen?: string;
  }[];

  // Colaboradores
  colaboradores?: {
    nombre: string;
    logo: string;
    url?: string;
  }[];

  // Call to Action
  ctaTexto?: string;
  ctaLink?: string;

  // SEO
  metaDescription?: string;
  tags?: string[];
}
