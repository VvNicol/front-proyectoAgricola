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
  rolUsuario: string | null = null;
  estaAutenticado: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
      this.verificarRolUsuario();
    });
  }

  verificarRolUsuario() {
    this.rolUsuario = localStorage.getItem('rol'); // ✅ Obtener el rol directamente
    this.estaAutenticado = !!this.rolUsuario; // ✅ Si hay rol, el usuario está autenticado
  }

  navegarAInicio() {
    this.router.navigate(['/inicio']);
  }

  navegarAIniciarSesion() {
    this.router.navigate(['/iniciar-sesion']);
  }

  navegarARegistrarse() {
    this.router.navigate(['/registrarse']);
  }

  navegarAUsuarios() {
    this.router.navigate(['/inicio/usuario']);
  }

  navegarAAdmin() {
    this.router.navigate(['/inicio/admin']);
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('rol'); // ✅ Limpiar el rol
    this.router.navigate(['/inicio']);
  }
}
