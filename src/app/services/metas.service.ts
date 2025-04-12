import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Meta } from '../models/metas';

@Injectable({
  providedIn: 'root'
})
export class MetaService {

  http = inject(HttpClient);

  API = 'http://localhost:8080/metas';

  constructor() { }

  // Retorna todas as metas
  findAll(): Observable<Meta[]> {
    return this.http.get<Meta[]>(this.API);
  }

  // Retorna uma meta pelo ID
  findById(id: number): Observable<Meta> {
    return this.http.get<Meta>(`${this.API}/${id}`);
  }

  // Retorna metas "em andamento" para um usuário específico
  buscarMetasEmAndamento(usuarioId: number): Observable<Meta[]> {
    return this.http.get<Meta[]>(`${this.API}/usuario/${usuarioId}/em-andamento`);
  }

  // Salva uma nova meta enviando o objeto completo, incluindo "usuario"
  save(meta: Meta): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.API, meta);
  }

  // Atualiza uma meta existente
  update(meta: Meta, id: number): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.API}/${id}`, meta);
  }

  // Exclui uma meta pelo ID
  deleteById(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.API}/${id}`);
  }
}
