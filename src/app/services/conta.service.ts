import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Conta } from '../models/conta';

@Injectable({
  providedIn: 'root'
})
export class ContaService {

  http = inject(HttpClient);

  API = 'http://localhost:8080/contas';

  constructor() { }

  // Retorna todas as conta
  findAll(): Observable<Conta[]> {
    return this.http.get<Conta[]>(this.API);
  }

  // Retorna uma conta pelo ID
  findById(id: number): Observable<Conta> {
    return this.http.get<Conta>(`${this.API}/${id}`);
  }

  // Retorna conta "em andamento" para um usuário específico
  buscarContaEmAndamento(usuarioId: number): Observable<Conta[]> {
    return this.http.get<Conta[]>(`${this.API}/usuario/${usuarioId}/em-andamento`);
  }

  // Salva uma nova conta enviando o objeto completo, incluindo "usuario"
  save(conta: Conta): Observable<string> {
    return this.http.post<string>(this.API, conta, { responseType: 'text' as 'json' });
  }

  // Atualiza uma conta existente
  update(conta: Conta, id: number): Observable<string> {
    return this.http.put<string>(`${this.API}/${id}`, conta, { responseType: 'text' as 'json' });
  }

  // Exclui uma conta pelo ID
  deleteById(id: number): Observable<string> {
    return this.http.delete<string>(`${this.API}/${id}`, { responseType: 'text' as 'json' });
  }
  // Retorna as contas de um usuário específico
  getContasPorUsuario(usuarioId: number): Observable<Conta[]> {
    return this.http.get<Conta[]>(`${this.API}/usuario/${usuarioId}`);
  }
}
