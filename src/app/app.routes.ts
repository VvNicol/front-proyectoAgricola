import { Routes } from '@angular/router';
import { IniciarSesionComponent } from './nav/iniciar-sesion/iniciar-sesion.component';
import { RegistrarseComponent } from './nav/registrarse/registrarse.component';
import { InicioComponent } from './nav/inicio/inicio.component';
import { VerificacionCorreoComponent } from './verificacion-correo/verificacion-correo.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { AdminComponent } from './admin/admin.component';
import { RecuperarContraseniaComponent } from './recuperar-contrasenia/recuperar-contrasenia.component';
import { noAutorizadoGuard } from './seguridad/ruta/no-autorizado.guard';
import { NoAutorizadoErrorComponent } from './error/no-autorizado-error/no-autorizado-error.component';

export const routes: Routes = [

    { path: 'registrarse', component: RegistrarseComponent },
    { path: 'registrarse/verificar-correo', component: VerificacionCorreoComponent },
    { path: 'iniciar-sesion', component: IniciarSesionComponent },
    { path: 'iniciar-sesion/recuperar-contrasenia', component: RecuperarContraseniaComponent },
    { path: 'inicio', component: InicioComponent },
    { path: 'inicio/usuario', component: UsuarioComponent, canActivate: [noAutorizadoGuard] },
    { path: 'inicio/admin', component: AdminComponent, canActivate: [noAutorizadoGuard] },
    { path: 'inicio/no-autorizado', component: NoAutorizadoErrorComponent}

];
