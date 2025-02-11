import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecuperacionContraseniaService {

  private apiNuevaContrasenia = 'http://localhost:1180/IntermediarioDWP/api/intermediarios/nueva-contrasenia';
  private apiEnviarCodigoAlCorreo = 'http://localhost:1180/IntermediarioDWP/api/intermediarios/enviar-codigo';
  private apiVerificarCodigo = 'http://localhost:1180/IntermediarioDWP/api/intermediarios/verificar-codigo';

  constructor(private http: HttpClient) { }

  enviarCorreo(correo: string): Observable<any> {
    return this.http.post(this.apiEnviarCodigoAlCorreo, { correo: correo }, { responseType: 'json' });
  }

  cambiarContrasenia(datos: any): Observable<any> {
    return this.http.post(this.apiNuevaContrasenia, datos, { responseType: 'json' });
  }

  verificarCodigo(body: { correo: string, codigo: string }): Observable<any> {

    return this.http.post(this.apiVerificarCodigo, body, { responseType: 'json' });

  }

}
