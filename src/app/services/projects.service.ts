// services/proyectos.service.ts
import { Injectable, signal } from '@angular/core';
import { Project } from '../models/project.interface';
import { PROJECTS } from '../pages/projects.component/projects.data';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  getProjectprojectsRelacionados(id: any, arg1: number) {
    throw new Error('Method not implemented.');
  }
  private projects = signal<Project[]>(PROJECTS);

  // Obtener todos los proyectos
  getProjects() {
    return this.projects();
  }

  // Obtener proyecto por ID
  getProjectById(id: string): Project | undefined {
    return this.projects().find((p) => p.id === id);
  }

  // Obtener proyectos por categoría
  getProjectsByCategory(categoria: string): Project[] {
    return this.projects().filter((p) => p.categoria === categoria);
  }

  // Obtener proyectos por estado
  getProjectsByStatus(estado: string): Project[] {
    return this.projects().filter((p) => p.estado === estado);
  }

  // Obtener proyectos relacionados (misma categoría, excluyendo el actual)
  getRelatedProjects(id: string, limit: number = 3): Project[] {
    const project = this.getProjectById(id);
    if (!project) return [];

    return this.projects()
      .filter((p) => p.categoria === project.categoria && p.id !== id)
      .slice(0, limit);
  }

  // Para futuro: cuando tengas backend
  // async loadProjectsFromAPI() {
  //   const response = await fetch('/api/proyectos');
  //   const data = await response.json();
  //   this.projects.set(data);
  // }
}
