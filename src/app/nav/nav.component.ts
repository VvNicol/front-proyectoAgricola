import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MaterialModule } from '../modulos/material-angular/material.module';
import { filter } from 'rxjs';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  currentRoute: string = '';

  constructor(private router: Router) {
    // Suscripción a eventos de navegación para actualizar la ruta activa
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentRoute = event.urlAfterRedirects;
    });
  }

  // Métodos de navegación
  navegarAInicio(): void {
    this.router.navigate(['/inicio']);
  }

  navegarAIniciarSesion(): void {
    this.router.navigate(['/iniciar-sesion']);
  }

  navegarARegistrarse(): void {
    this.router.navigate(['/registrarse']);
  }
}
