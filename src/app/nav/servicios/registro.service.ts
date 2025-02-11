import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RegistroService {

    private apiUrl = 'http://localhost:1180/IntermediarioDWP/api/intermediarios/registro';

    constructor(private http: HttpClient) { }

    registrarUsuario(datos: any): Observable<any> {
        return this.http.post<any>(this.apiUrl, datos, { headers: { 'Content-Type': 'application/json' } });

    }
}
