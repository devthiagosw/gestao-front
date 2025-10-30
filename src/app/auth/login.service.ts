import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { jwtDecode, JwtPayload } from "jwt-decode";
import { Login } from './login';
import { Usuario } from './usuario';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  http = inject(HttpClient);
  API =  environment.SERVIDOR+"/api/login";


  constructor() { }


  logar(login: Login): Observable<string> {
    // Mapeia username/password para email/senha conforme o backend espera
    const loginRequest = {
      email: login.username,
      senha: login.password
    };
    
    // O backend retorna { token: "..." }, então precisamos extrair o token
    return this.http.post<{ token: string }>(this.API, loginRequest).pipe(
      map(response => response.token)
    );
  }

  addToken(token: string) {
    localStorage.setItem('token', token);
  }

  removerToken() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  jwtDecode() {
    let token = this.getToken();
    if (token) {
      return jwtDecode<JwtPayload>(token);
    }
    return "";
  }

  hasRole(role: string) {
    let user = this.jwtDecode() as Usuario;
    if (user.role == role)
      return true;
    else
      return false;
  }

  getUserLogado() {
    let user = this.jwtDecode() as Usuario;
    return user;
  }

}