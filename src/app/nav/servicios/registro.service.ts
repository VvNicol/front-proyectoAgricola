import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RegistroService {

    private apiUrl = 'http://localhost:7258/inicio/registro';

    private apiIniciarSesion = 'http://localhost:7258/inicio/iniciar-sesion'

    constructor(private http: HttpClient) { }

    iniciarSesion(correo: string, contrasenia: string): Observable<any> {
        return this.http.post(this.apiIniciarSesion, { correo, contrasenia });
    }

    registrarUsuario(datos: any): Observable<any> {
        return this.http.post(this.apiUrl, datos, { responseType: 'text' });
    }
}
