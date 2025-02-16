import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem('token');

  const publicEndpoints = [
    '/inicio', 
    '/iniciar-sesion',
    '/registrarse',
  ];

  const isPublic = publicEndpoints.some(endpoint => req.url.includes(endpoint));

  if (!isPublic && token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  return next(req);
};
