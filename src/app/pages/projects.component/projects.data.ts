// pages/proyectos/proyectos.data.ts
import { Project } from '../../models/project.interface';

export const PROJECTS: Project[] = [
  {
    id: 'charla-micaela-bastidas',
    titulo: 'Charla Motivacional I.E. Micaela Bastidas',
    subtitulo: 'Empoderamiento juvenil para estudiantes de secundaria',
    descripcion:
      'Programa de empoderamiento juvenil enfocado en desarrollo personal y habilidades blandas para estudiantes de 4to y 5to de secundaria.',
    descripcionLarga: `
      <p>Este proyecto nació con el objetivo de inspirar a los jóvenes de la I.E. Micaela Bastidas a descubrir su potencial y construir un futuro prometedor.</p>
      <p>Durante 3 meses, realizamos charlas semanales donde abordamos temas como autoestima, proyecto de vida, inteligencia emocional y liderazgo juvenil.</p>
      <p>Los resultados superaron nuestras expectativas, logrando un cambio notable en la actitud y motivación de los estudiantes participantes.</p>
    `,
    categoria: 'Educación',
    estado: 'completado',
    imagenPrincipal: 'micaela-bastidas/principal.jpg',
    imagenes: [
      'micaela-bastidas/galeria-1.jpg',
      'micaela-bastidas/galeria-2.jpg',
      'micaela-bastidas/galeria-3.jpg',
      'micaela-bastidas/galeria-4.jpg',
    ],
    fechaInicio: 'Marzo 2024',
    fechaFin: 'Mayo 2024',
    beneficiarios: 150,
    ubicacion: 'Los Olivos, Lima',
    institucion: 'I.E. Micaela Bastidas',
    objetivos: [
      'Fortalecer la autoestima y confianza de los estudiantes',
      'Desarrollar habilidades de liderazgo y trabajo en equipo',
      'Orientar en la construcción de proyectos de vida',
      'Fomentar la inteligencia emocional y resiliencia',
    ],
    resultados: [
      '150 estudiantes participaron activamente en las sesiones',
      '85% de los participantes reportaron mayor claridad en sus metas',
      '92% mejoró su percepción sobre sus capacidades personales',
      '30 estudiantes formaron un grupo de liderazgo estudiantil',
    ],
    logros: [
      { titulo: 'Estudiantes impactados', valor: 150, icono: '🎓' },
      { titulo: 'Sesiones realizadas', valor: 12, icono: '📚' },
      { titulo: 'Tasa de satisfacción', valor: '95%', icono: '⭐' },
      { titulo: 'Horas de capacitación', valor: 36, icono: '⏰' },
    ],
    testimonios: [
      {
        nombre: 'María González',
        rol: 'Estudiante de 5to de secundaria',
        texto:
          'Estas charlas cambiaron mi perspectiva. Ahora tengo claro lo que quiero estudiar y sé por donde puedo empezar mi camino para lograrlo.',
        imagen: 'assets/images/testimonios/maria.jpg',
      },
      {
        nombre: 'Prof. Juan Pére',
        rol: 'Director de la I.E. Micaela Bastidas',
        texto:
          'El impacto de Semillas & Talentos en nuestros estudiantes ha sido extraordinario. Notamos un cambio positivo en su actitud y rendimiento.',
        imagen: 'assets/images/testimonios/juan.jpg',
      },
    ],
    colaboradores: [
      {
        nombre: 'I.E. Micaela Bastidas',
        logo: 'assets/images/logos/micaela-bastidas.png',
      },
    ],
    ctaTexto: 'Solicita este programa para tu institución',
    ctaLink: '/contacto?type=institucion',
    metaDescription:
      'Programa de empoderamiento juvenil en la I.E. Micaela Bastidas que impactó a 150 estudiantes con charlas motivacionales.',
    tags: ['educación', 'empoderamiento', 'juventud', 'liderazgo'],
  },
  {
    id: 'politecnico-callao',
    titulo: 'Taller de Liderazgo - Politécnico del Callao',
    subtitulo: 'Desarrollando líderes en educación técnica',
    descripcion:
      'Serie de talleres diseñados para fortalecer capacidades de liderazgo y trabajo en equipo en estudiantes de educación técnica.',
    descripcionLarga: `
      <p>El Politécnico del Callao nos abrió sus puertas para trabajar con estudiantes de carreras técnicas, quienes necesitaban fortalecer sus habilidades de liderazgo para enfrentar el mundo laboral.</p>
      <p>Diseñamos un programa intensivo de 8 talleres prácticos donde los participantes trabajaron en proyectos reales y desarrollaron competencias esenciales para el liderazgo.</p>
    `,
    categoria: 'Liderazgo',
    estado: 'completado',
    imagenPrincipal: 'assets/images/proyectos/politecnico/principal.jpg',
    imagenes: [
      'assets/images/proyectos/politecnico/galeria-1.jpg',
      'assets/images/proyectos/politecnico/galeria-2.jpg',
    ],
    fechaInicio: 'Enero 2024',
    fechaFin: 'Febrero 2024',
    beneficiarios: 80,
    ubicacion: 'Callao, Lima',
    institucion: 'Politécnico del Callao',
    objetivos: [
      'Desarrollar habilidades de liderazgo efectivo',
      'Fortalecer capacidades de trabajo en equipo',
      'Preparar para el mundo laboral',
      'Fomentar el pensamiento crítico y la toma de decisiones',
    ],
    logros: [
      { titulo: 'Participantes', valor: 80, icono: '👥' },
      { titulo: 'Talleres', valor: 8, icono: '🎯' },
      { titulo: 'Satisfacción', valor: '97%', icono: '🌟' },
    ],
    ctaTexto: 'Conoce más sobre nuestros talleres',
    ctaLink: '/programas',
  },
  {
    id: 'mentoria-virtual',
    titulo: 'Programa de Mentoría Virtual',
    subtitulo: 'Acompañamiento personalizado para el éxito',
    descripcion:
      'Mentoría uno a uno con profesionales voluntarios para jóvenes interesados en desarrollar sus talentos y planificar su futuro profesional.',
    descripcionLarga: `
      <p>Nuestro programa de mentoría virtual conecta a jóvenes talentosos con profesionales exitosos que dedican su tiempo a guiarlos en su desarrollo personal y profesional.</p>
      <p>Cada mentorado recibe acompañamiento personalizado durante 6 meses, con sesiones quincenales y seguimiento continuo.</p>
    `,
    categoria: 'Mentoría',
    estado: 'activo',
    imagenPrincipal: 'assets/images/proyectos/mentoria/principal.jpg',
    imagenes: [],
    fechaInicio: 'En curso',
    beneficiarios: 45,
    ubicacion: 'Virtual - Todo el Perú',
    objetivos: [
      'Brindar orientación personalizada a jóvenes con potencial',
      'Conectar talento joven con profesionales exitosos',
      'Desarrollar planes de acción para objetivos personales y profesionales',
      'Crear una red de apoyo para los mentorados',
    ],
    logros: [
      { titulo: 'Mentorados activos', valor: 45, icono: '🎓' },
      { titulo: 'Mentores voluntarios', valor: 30, icono: '👨‍🏫' },
      { titulo: 'Horas de mentoría', valor: '500+', icono: '⏱️' },
    ],
    ctaTexto: 'Solicita ser mentorado',
    ctaLink: '/contacto?type=alumno',
    tags: ['mentoría', 'desarrollo personal', 'orientación vocacional'],
  },
];
