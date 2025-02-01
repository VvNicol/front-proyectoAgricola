import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const noAutorizadoGuard: CanActivateFn = (route, state) => {
  const ruta = inject(Router);
  const token = localStorage.getItem('token');
  const rol = localStorage.getItem('rol');

  console.log('Token:', token);
  console.log('Rol:', rol);

  if (!token || !rol) {
    ruta.navigate(['inicio/no-autorizado']);
    return false;
  } else {
    const rutaActual = state.url;
    console.log('Ruta Actual:', rutaActual);

    if (rutaActual.includes('usuario') && rol !== 'usuario') {
      ruta.navigate(['inicio/no-autorizado']);
      return false;
    }

    if (rutaActual.includes('admin') && rol !== 'admin') {
      ruta.navigate(['inicio/no-autorizado']);
      return false;
    }

    return true;
  }
};
