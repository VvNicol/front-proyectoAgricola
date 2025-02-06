import { ChangeDetectorRef, Component } from '@angular/core';
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
  contraseniaCambiada = false;

  cargando = false;

  mensajeError: string = "";
  mensajeExito: string = "";

  constructor(
    private fb: FormBuilder,
    private recuperacionContraseniaService: RecuperacionContraseniaService,
    private router: Router,
    private cd: ChangeDetectorRef) {

    this.formularioCorreo = this.fb.group({
      correo: ['', [Validators.required, Validators.email]]
    });

    this.formularioCorreo.get('correo')?.valueChanges.subscribe(() => {
      this.mensajeError = "";
      this.mensajeExito = "";
      this.cargando = false;
    });

    this.formularioCodigo = this.fb.group({
      codigo: ['', [Validators.required, Validators.pattern(/^\d+$/)]]
    });

    this.formularioCodigo.get('codigo')?.valueChanges.subscribe(() => {
      this.mensajeError = "";
      this.mensajeExito = "";
      this.cargando = false;
    });

    this.formularioNuevaContrasenia = this.fb.group({
      nuevaContrasenia: ['', [Validators.required, Validators.minLength(6)]],
      confirmarContrasenia: ['', [Validators.required]]
    }, {
      validators: this.verificacionContraseniasIdenticas
    });

    this.formularioNuevaContrasenia.valueChanges.subscribe(() => {
      this.mensajeError = "";
      this.mensajeExito = "";
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
        this.mensajeExito = respuesta?.mensaje || 'Se ha enviado un correo electronico con el codigo';
      },
      error: (err) => {
        this.mensajeError = `${err.error?.mensaje || 'Error al enviar el correo.'} ${err.error?.error ? '- ' + err.error.error : ''}`;
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
    this.mensajeExito = "";

    const body = {
      correo: this.formularioCorreo.value.correo,
      codigo: this.formularioCodigo.value.codigo
    };

    this.recuperacionContraseniaService.verificarCodigo(body).subscribe({
      next: (respuesta) => {
        this.codigoVerificado = true;
        this.mensajeExito = respuesta?.mensaje || 'Codigo verificado correctamente';
      },
      error: (err: any) => {
        this.mensajeError = `${err.error?.mensaje || 'Código incorrecto.'} ${err.error?.error ? '- ' + err.error.error : ''}`;
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
        this.cargando = true;
        console.log("Respuesta del backend:", respuesta);
        console.log("Mensaje de éxito:", respuesta?.mensaje);
        this.mensajeExito = respuesta?.mensaje || "Contraseña cambiada exitosamente.";
        this.contraseniaCambiada = true;
       
        setTimeout(() => {
          this.formularioNuevaContrasenia.reset();
          this.cd.detectChanges(); // 🔥 Forzar actualización de la vista después del reset
        }, 3000);
        
      },
      error: (err) => {
        this.mensajeError = `${err.error?.mensaje || 'Error al cambiar la contraseña.'} ${err.error?.error ? '- ' + err.error.error : ''}`;
      },
      complete: () => this.cargando = false
    });
  }

  volverAlCorreo() {
    this.codigoEnviado = false;
    this.mensajeError = "";
    this.mensajeExito = "";
  }

  volverAlCodigo() {
    this.codigoVerificado = false;
    this.mensajeError = "";
    this.mensajeExito = "";
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
