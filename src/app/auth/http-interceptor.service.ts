import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { catchError, EMPTY } from 'rxjs';

export const meuhttpInterceptor: HttpInterceptorFn = (req, next) => {
  const router     = inject(Router);
  const platformId = inject(PLATFORM_ID);
  const isBrowser  = isPlatformBrowser(platformId);

  const token      = isBrowser ? localStorage.getItem('token') : null;
  const isLogin    = req.url.includes('/api/login');

  if (token && !isLogin) {
    req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }

  return next(req).pipe(
    catchError(err => {
      if (err.status === 401 || err.status === 403) {
        // redireciona, mas não polui o console nem re-lança
        router.navigate(['/login']);
        return EMPTY;                 // <- devolve stream vazia
      }
      throw err;                      // ou EMPTY, conforme a necessidade
    })
  );
};
