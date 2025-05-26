import { inject } from '@angular/core';
import { LoginService } from './login.service';
import { CanActivateFn } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {

  let loginService= inject(LoginService);

  if(loginService.hasRole('USER') && state.url == '/admin/usuarios'){
    alert('Você não tem permissão para acessar esta página!');
    return false;
  }

  if(loginService.hasRole('ADMIN') && state.url == '/admin/tags'){
    alert('Você não tem permissão para acessar esta página!');
    return false;
  }

  return true;
};
