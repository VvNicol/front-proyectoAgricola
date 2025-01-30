import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RegistroService {

    private apiUrl = 'http://localhost:7258/inicio/registro';

    constructor(private http: HttpClient) { }

    registrarUsuario(datos: any): Observable<any> {
        return this.http.post(this.apiUrl, datos, { responseType: 'text' });
    }
}
