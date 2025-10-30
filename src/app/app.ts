import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./pages/home.component/home.component";
import { NavbarComponent } from "./components/layout/navbar/navbar.component/navbar.component";
import { FooterComponent } from "./components/layout/footer.component/footer.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomeComponent, NavbarComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Semillas-y-Talentos-Frontend');
}
