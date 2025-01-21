import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialModule } from '../modulos/material-angular/material.module';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  constructor(private router: Router) {}

  navegarAIniciarSesion(): void {
    this.router.navigate(['/iniciar-sesion']);
  }

  navegarARegistrarse(): void {
    this.router.navigate(['/registrarse']);
  }
}
