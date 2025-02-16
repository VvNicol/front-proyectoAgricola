import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CultivoService {

  private apiUrl = 'http://localhost:7258/usuario';

  private http = inject(HttpClient);
  
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`, // 👈 Asegurar que se envía el token
      'Content-Type': 'application/json' // 👈 Forzar que siempre sea JSON
    });
  }

  obtenerCultivos(): Observable<any> {
    return this.http.post(`${this.apiUrl}/cultivos-ver`, {}, { 
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }) 
    });
  }

  registrarCultivo(cultivo: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/cultivo-registrar`, cultivo, { 
      headers: this.getHeaders()
    });
  }
 

  modificarCultivo(cultivo: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/cultivo-modificar`, cultivo, { 
      headers: this.getHeaders(), 
      responseType: 'json' 
    });
  }
  
  

  eliminarCultivo(cultivoId: number): Observable<any> {
    return this.http.request('delete', `${this.apiUrl}/cultivo-eliminar`, { body: { cultivoId } });
  } 
  
  
}
