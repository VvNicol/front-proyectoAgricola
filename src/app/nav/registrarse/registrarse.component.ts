import { Component } from '@angular/core';
import { RegistroService } from '../servicios/registro.service';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../modulos/material-angular/material.module';

@Component({
  selector: 'app-registrarse',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './registrarse.component.html',
  styleUrl: './registrarse.component.css'
})
export class RegistrarseComponent {


  formularioRegistro: FormGroup; // Formulario reactivo
  mensaje: string = ''; // Mensaje de éxito
  error: string = ''; // Mensaje de error
  cargando: boolean = false; // Control de la barra de progreso
  progreso: number = 0;

  constructor(private fb: FormBuilder, private registroService: RegistroService, private router: Router) {

    this.iniciarCarrusel();

    //formulario reactivo
    this.formularioRegistro = this.fb.group(
      {
        nombreCompleto: ['', Validators.required], // Campo requerido
        correo: ['', [Validators.required, Validators.email]], // Campo requerido con validación de correo
        telefono: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
        contrasenia: ['', [Validators.required, Validators.minLength(6)]], // Mínimo 6 caracteres
        confirmarContrasenia: ['', Validators.required], // Campo requerido
      },
      { validators: this.verificacionContraseniasIdenticas } // Validador para contraseñas
    );
  }

  // Validador personalizado para contraseñas
  private verificacionContraseniasIdenticas(group: AbstractControl): ValidationErrors | null {
    const contrasenia = group.get('contrasenia')?.value;
    const confirmarContrasenia = group.get('confirmarContrasenia')?.value;
    return contrasenia === confirmarContrasenia ? null : { notMatching: true };
  }

  registrar(): void {
    // Verificar si el formulario es inválido
    if (this.formularioRegistro.invalid) {
      this.formularioRegistro.markAllAsTouched(); // Marca los campos no válidos como "tocados" para mostrar errores
      return;
    }

    // Obtener los valores del formulario
    const datos = this.formularioRegistro.value;

    // Mostrar la barra de progreso
    this.cargando = true;
    this.progreso = 50; // Progreso inicial

    // Llamar al servicio para registrar
    this.registroService.registrarUsuario(datos).subscribe({
      next: (response) => {
        // Si el registro es exitoso, muestra el mensaje de éxito
        this.mensaje = response?.message || "Registro exitoso. Por favor verifica tu correo para iniciar sesión.";
        this.error = '';           // Limpiar el mensaje de error
        this.progreso = 100;
        this.cargando = false;      // Completar la barra de progreso
      },
      error: (err) => {
        // Si hay un error al registrar, muestra el mensaje de error
        this.mensaje = '';  // Limpiar el mensaje de éxito
        this.error = err?.error || 'Hubo un error al registrar. Intenta nuevamente.';  // Muestra el error desde el backend
        this.cargando = false; // Detiene la barra de progreso
      }
    });
  }

  confirmarExito() {
    this.router.navigate(['/iniciar-sesion'])
  }

  /*Carrusel*/
  imagenes: string[] = [
    'assets/Agricultura.jpg',
    'assets/Agricultura2.jpg',
    'assets/Agricultura3.jpg'
  ];

  indiceImagenActual: number = 0;

  iniciarCarrusel() {
    setInterval(() => {
      this.cambiarImagen();
    }, 5000);
  }
  // Método para cambiar la imagen
  cambiarImagen() {
    this.indiceImagenActual = (this.indiceImagenActual + 1) % this.imagenes.length;
  }
}

