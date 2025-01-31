import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token'); // Retrieve token from localStorage

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}` // Add the token to the Authorization header
      }
    });
  }

  return next(req);
};