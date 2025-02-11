import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IniciarSesionService {

  private apiIniciarSesion = 'http://localhost:1180/IntermediarioDWP/api/intermediarios/iniciar-sesion';

  constructor(private http: HttpClient) { }

  iniciarSesionApi(correo: string, contrasenia: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { correo, contrasenia };

    return this.http.post(this.apiIniciarSesion, body, { headers });
  }
}
