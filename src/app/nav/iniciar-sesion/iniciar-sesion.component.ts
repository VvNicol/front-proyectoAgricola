import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../modulos/material-angular/material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './iniciar-sesion.component.html',
  styleUrl: './iniciar-sesion.component.css'
})
export class IniciarSesionComponent implements OnInit {
confirmarExito() {
throw new Error('Method not implemented.');
}

  formularioInicioSesion!: FormGroup;
  cargando = false;
  mensaje: string = "";
  error: string = "";

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.formularioInicioSesion = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasenia: ['', Validators.required]
    });
  }

  iniciarSesion() {
    if (this.formularioInicioSesion.invalid) {
      return;
    }
    this.cargando = true;
    const { correo, contrasenia } = this.formularioInicioSesion.value;
  }

}
