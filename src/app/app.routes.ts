import { Routes } from '@angular/router';
import { IniciarSesionComponent } from './nav/iniciar-sesion/iniciar-sesion.component';
import { RegistrarseComponent } from './nav/registrarse/registrarse.component';
import { InicioComponent } from './nav/inicio/inicio.component';

export const routes: Routes = [
    { path: 'iniciar-sesion', component: IniciarSesionComponent },
    { path: 'registrarse', component: RegistrarseComponent },
    { path: 'inicio', component: InicioComponent }
];
