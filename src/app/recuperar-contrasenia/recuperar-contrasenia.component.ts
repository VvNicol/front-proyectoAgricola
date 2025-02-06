import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { RecuperacionContraseniaService } from '../nav/servicios/recuperacion-contrasenia.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../modulos/material-angular/material.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-recuperar-contrasenia',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, MaterialModule, MatProgressSpinnerModule],
  templateUrl: './recuperar-contrasenia.component.html',
  styleUrl: './recuperar-contrasenia.component.css'
})
export class RecuperarContraseniaComponent {


  formularioCorreo: FormGroup;
  formularioCodigo: FormGroup;
  formularioNuevaContrasenia: FormGroup;

  correoEnviado = false;
  codigoEnviado = false;
  codigoVerificado = false;
  cargando = false;
  mensajeError: string = "";
  mensajeExito: string = "";

  constructor(private fb: FormBuilder, private recuperacionContraseniaService: RecuperacionContraseniaService, private router: Router) {
    this.formularioCorreo = this.fb.group({
      correo: ['', [Validators.required, Validators.email]]
    });

    this.formularioCodigo = this.fb.group({
      codigo: ['', [Validators.required]]
    });

    this.formularioNuevaContrasenia = this.fb.group({
      nuevaContrasenia: ['', [Validators.required, Validators.minLength(8)]],
      confirmarContrasenia: ['', [Validators.required]]
    }, {
      validators: this.verificacionContraseniasIdenticas
    });
  }

  verificacionContraseniasIdenticas(group: FormGroup) {
    const contrasenia = group.get('nuevaContrasenia')?.value;
    const confirmarContrasenia = group.get('confirmarContrasenia')?.value;
    return contrasenia === confirmarContrasenia ? null : { noCoincide: true };
  }

  enviarCorreo(): void {
    if (this.formularioCorreo.invalid) {
      return;
    }

    this.cargando = true;
    this.mensajeError = "";
    this.mensajeExito = "";

    const correo = this.formularioCorreo.value.correo;

    this.recuperacionContraseniaService.enviarCorreo(correo).subscribe({
      next: (respuesta) => {
        this.codigoEnviado = true;
        this.mensajeExito = respuesta?.mensaje
      },
      error: (err) => {
        this.mensajeError = err.error?.mensaje || 'Error al enviar el correo';
      },
      complete: () => this.cargando = false
    });
  }

  verificarCodigo(): void {
    if (this.formularioCodigo.invalid) {
      return;
    }

    this.cargando = true;
    this.mensajeError = "";

    const body = {
      correo: this.formularioCorreo.value.correo,
      codigo: this.formularioCodigo.value.codigo
    };

    this.recuperacionContraseniaService.verificarCodigo(body).subscribe({
      next: () => {
        this.codigoVerificado = true;
        
      },
      error: (err: any) => {
        this.mensajeError = err.error?.mensaje || 'Código incorrecto';
      },
      complete: () => this.cargando = false
    });
  }


  cambiarContrasenia(): void {
    if (this.formularioNuevaContrasenia.invalid) {
      return;
    }

    this.cargando = true;
    this.mensajeError = "";
    this.mensajeExito = "";

    const datos = {
      correo: this.formularioCorreo.value.correo,
      nuevaContrasenia: this.formularioNuevaContrasenia.value.nuevaContrasenia
    };

    this.recuperacionContraseniaService.cambiarContrasenia(datos).subscribe({
      next: (respuesta) => {
        this.mensajeExito = respuesta?.mensaje || "Contraseña cambiada exitosamente.";
        this.formularioNuevaContrasenia.reset();
      },
      error: (err) => {
        this.mensajeError = err.error?.mensaje || 'Error al cambiar la contraseña';
      },
      complete: () => this.cargando = false
    });
  }

  volverAlCorreo() {
    this.codigoEnviado = false;
  }

  volverAlCodigo() {
    this.codigoVerificado = false;
  }

  volverAiniciarSesion() {
    this.router.navigate(['/iniciar-sesion']);
  }

  siguientePaso(): void {
    if (this.codigoEnviado) {
      this.codigoEnviado = true;  
    }
  }
  

}
