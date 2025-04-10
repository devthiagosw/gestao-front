import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  http = inject(HttpClient);

  API = 'http://localhost:8080/usuarios';

  constructor() { }

  // Retorna todas as usuarios
  findAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.API);
  }

  // Retorna uma usuario pelo ID
  findById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.API}/${id}`);
  }

  // Retorna uma usuario pelo ID do Usuario
  findByUsuarioId(usuarioId: number): Observable<Usuario[]> {
    const params = new HttpParams().set('usuarioId', usuarioId.toString());
    return this.http.get<Usuario[]>(this.API, { params });
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

  // Salva uma nova usuario enviando o objeto completo, incluindo "usuario"
  save(usuario: Usuario): Observable<string> {
    return this.http.post<string>(this.API, usuario, { responseType: 'text' as 'json' });
  }

  // Atualiza uma usuario existente
  update(usuario: Usuario, id: number): Observable<string> {
    return this.http.put<string>(`${this.API}/${id}`, usuario, { responseType: 'text' as 'json' });
  }

  // Exclui uma usuario pelo ID
  deleteById(id: number): Observable<string> {
    return this.http.delete<string>(`${this.API}/${id}`, { responseType: 'text' as 'json' });
  }
}
