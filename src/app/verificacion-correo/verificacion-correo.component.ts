import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verificacion-correo',
  standalone: true,
  imports: [NgIf],
  templateUrl: './verificacion-correo.component.html',
  styleUrl: './verificacion-correo.component.css'
})
export class VerificacionCorreoComponent implements OnInit {

  mensaje: string = "Verificando tu cuenta...";

  constructor (private route: ActivatedRoute, private http: HttpClient){}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];

      if(token){
        this.verificarCuenta(token);
      }else{
        this.mensaje = "Token invalido o no proporcionado."
      }
    })
  }

  verificarCuenta(token: string): void {
    this.http.get(`http://localhost:7258/inicio/verificar?token=${token}`, { responseType: 'text' }).subscribe({
        next: (response) => {
            this.mensaje = response;
        },
        error: (err) => {
            if (err.status === 400) {
                this.mensaje = "El token es inválido o ha expirado.";
            } else {
                this.mensaje = "Ocurrió un error inesperado al verificar tu cuenta. Inténtalo de nuevo más tarde.";
            }
        }
    });
  }
}
