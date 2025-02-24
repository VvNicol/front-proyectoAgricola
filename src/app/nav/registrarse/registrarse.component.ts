import { Component } from '@angular/core';
import { RegistroService } from '../servicios/registro.service';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../../modulos/material-angular/material.module';

@Component({
  selector: 'app-registrarse',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './registrarse.component.html',
  styleUrl: './registrarse.component.css'
})
export class RegistrarseComponent {
  formularioRegistro: FormGroup;
  mensaje: string = '';
  error: string = '';
  cargando: boolean = false;
  progreso: number = 0;

  constructor(private fb: FormBuilder, private registroService: RegistroService, private router: Router) {
    this.iniciarCarrusel();
    this.formularioRegistro = this.fb.group(
      {
        nombreCompleto: ['', Validators.required],
        correo: ['', [Validators.required, Validators.email]],
        telefono: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
        contrasenia: ['', [Validators.required, Validators.minLength(6)]],
        confirmarContrasenia: ['', Validators.required],
      },
      { validators: this.verificacionContraseniasIdenticas }
    );

    // 🔹 Forzar la actualización cuando el usuario escribe en los campos
    this.formularioRegistro.valueChanges.subscribe(() => {
      this.error = ''; // Limpiar mensaje de error cuando el usuario escribe
    });
  }

  // ✅ Validador de contraseñas mejorado
  private verificacionContraseniasIdenticas(group: AbstractControl): ValidationErrors | null {
    const contrasenia = group.get('contrasenia')?.value;
    const confirmarContrasenia = group.get('confirmarContrasenia')?.value;
    return contrasenia && confirmarContrasenia && contrasenia === confirmarContrasenia ? null : { notMatching: true };
  }

  registrar(): void {
    if (this.formularioRegistro.invalid) {
      this.formularioRegistro.markAllAsTouched(); // Marcar todos los campos para mostrar errores
      return;
    }

    const { confirmarContrasenia, ...datos } = this.formularioRegistro.value;
    console.log('[INFO] Datos a enviar:', datos);

    this.cargando = true;
    this.progreso = 50;

    this.registroService.registrarUsuario(datos).subscribe({
      next: (response) => {
        this.mensaje = response?.mensaje || "Registro exitoso. Verifica tu correo para iniciar sesión.";
        this.error = '';
        this.progreso = 100;
        this.cargando = false;
      },
      error: (err) => {
        this.mensaje = '';
        this.error = err?.error?.error || 'Hubo un error al registrar. Intenta nuevamente.';
        this.cargando = false;
      }
    });
  }

  confirmarExito() {
    this.router.navigate(['/iniciar-sesion']);
  }

  // 🔹 Carrusel de imágenes
  imagenes: string[] = ['assets/Agricultura.jpg', 'assets/Agricultura2.jpg', 'assets/Agricultura3.jpg'];
  indiceImagenActual: number = 0;

  iniciarCarrusel() {
    setInterval(() => {
      this.cambiarImagen();
    }, 5000);
  }

  cambiarImagen() {
    this.indiceImagenActual = (this.indiceImagenActual + 1) % this.imagenes.length;
  }
}
