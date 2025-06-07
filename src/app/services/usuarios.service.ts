import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  http = inject(HttpClient);

  API = environment.SERVIDOR+'/usuarios';

  constructor() { }

  findAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.API);
  }

  findById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.API}/${id}`);
  }

  findByNome(nome: string): Observable<Usuario[]> {
    const params = new HttpParams().set('nome', nome);
    return this.http.get<Usuario[]>(this.API, { params });
  }

  findByEmail(email: string): Observable<Usuario[]> {
    const params = new HttpParams().set('email', email);
    return this.http.get<Usuario[]>(this.API, { params });
  }

  findByStatus(status: string): Observable<Usuario[]> {
    const params = new HttpParams().set('status', status);
    return this.http.get<Usuario[]>(this.API, { params });
  }

  save(usuario: Usuario): Observable<string> {
    return this.http.post<string>(this.API, usuario, { responseType: 'text' as 'json' });
  }

  update(usuario: Usuario, id: number): Observable<string> {
    return this.http.put<string>(`${this.API}/${id}`, usuario, { responseType: 'text' as 'json' });
  }

  deleteById(id: number): Observable<string> {
    return this.http.delete<string>(`${this.API}/${id}`, { responseType: 'text' as 'json' });
  }
}
