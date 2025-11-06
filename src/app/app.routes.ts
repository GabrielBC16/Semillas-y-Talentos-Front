import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component/home.component';
import { AboutComponent } from './pages/about.component/about.component';
import { ProjectsComponent } from './pages/projects.component/projects.component';
import { ContactComponent } from './pages/contact.component/contact.component';
import { DonationsComponent } from './pages/donations.component/donations.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'projects', component: ProjectsComponent },
  {
    path: 'projects/:id',

    loadComponent: () =>
      import(
        './pages/projects.component/projects-details.component/projects-details.component'
      ).then((m) => m.ProjectsDetailsComponent),
      data: {prerender: false}
  },
  { path: 'contact', component: ContactComponent },
  { path: 'donations', component: DonationsComponent },
  { path: 'projects/charla-micaela-bastidas', component: HomeComponent },
];
