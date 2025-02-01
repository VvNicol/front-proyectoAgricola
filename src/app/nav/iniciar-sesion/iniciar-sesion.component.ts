import { Component } from '@angular/core';
import { MaterialModule } from '../../modulos/material-angular/material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IniciarSesionService } from '../servicios/iniciar-sesion.service';

@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './iniciar-sesion.component.html',
  styleUrl: './iniciar-sesion.component.css'
})
export class IniciarSesionComponent {

  formularioInicioSesion: FormGroup;
  cargando = false;
  mensaje: string = "";
  error: string = "";

  constructor(private fb: FormBuilder, private iniciarSesion: IniciarSesionService, private router: Router) {

    this.iniciarCarrusel();

    this.formularioInicioSesion = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasenia: ['', Validators.required]
    });

  }

  iniciarSesionComprobacion() {
    if (this.formularioInicioSesion.invalid) {
      return;
    }
    this.cargando = true;
    const datos = this.formularioInicioSesion.value;

    this.iniciarSesion.iniciarSesionApi(datos.correo, datos.contrasenia).subscribe({
     
      next: (response) => {

        this.mensaje = response?.mensaje || "Inicio de sesión exitoso.";
        this.error = "";

        const token = response?.token;
        const rol = response?.rol;

        if (rol) {
          localStorage.setItem("token", token);
          localStorage.setItem("rol", rol);
        }

        if (rol === "usuario") {
          this.router.navigate(['inicio/usuario']);
        } else if (rol === "admin") {
          this.router.navigate(['inicio/admin']);
        }

      },
      error: (err) => {
        console.log('Error de la API:', err);

        if (err.error && typeof err.error === "object") {
          this.error = err.error.mensaje || "Ha ocurrido un error inesperado, intentelo porfavor mas tarde.";
          if (err.error.error) {
            this.error += " " + err.error.error; // Concatenar detalles del error
          }
        } else {
          this.error = "Error desconocido al iniciar sesión.";
        }

        this.mensaje = "";
      }
    });
  }

  /*Redireccion */

  redirigirARegistrarse() {
    this.router.navigate(['/registrarse']);
  }
  redirigirARecuperarContrasenia() {
    this.router.navigate(['iniciar-sesion/recuperar-contrasenia']);
  }

  /*Fin de redireccion */

  /*Carrusel*/
  imagenesIniciarSesion: string[] = [
    'assets/Agricultura4.jpg',
    'assets/Agricultura5.jpg',
    'assets/Agricultura6.jpg'
  ];

  indiceImagenActualIniciarSesion: number = 0;

  iniciarCarrusel() {
    setInterval(() => {
      this.cambiarImagen();
    }, 5000);
  }
  // Método para cambiar la imagen
  cambiarImagen() {
    this.indiceImagenActualIniciarSesion = (this.indiceImagenActualIniciarSesion + 1) % this.imagenesIniciarSesion.length;
  }

}
