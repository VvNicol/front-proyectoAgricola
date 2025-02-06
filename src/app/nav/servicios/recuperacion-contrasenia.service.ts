import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecuperacionContraseniaService {

  private apiNuevaContrasenia = 'http://localhost:7258/inicio/nueva-contrasenia';
  private apiEnviarCodigoAlCorreo = 'http://localhost:7258/inicio/enviar-codigo';
  private apiVerificarCodigo = 'http://localhost:7258/inicio/verificar-codigo';

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
