import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transacao } from '../models/transacao';

@Injectable({
  providedIn: 'root'
})
export class TransacaoService {
  private http = inject(HttpClient);
  private API = 'http://localhost:8080/transacoes';

  // ✅ Retorna todas as transações
  findAll(): Observable<Transacao[]> {
    return this.http.get<Transacao[]>(this.API);
  }

  // ✅ Retorna uma transação pelo ID
  findById(id: number): Observable<Transacao> {
    return this.http.get<Transacao>(`${this.API}/${id}`);
  }

  // ✅ Retorna transações por conta
  findByContaId(contaId: number): Observable<Transacao[]> {
    return this.http.get<Transacao[]>(`${this.API}/conta/${contaId}`);
  }

  // ✅ Retorna transações por categoria
  findByCategoriaId(categoriaId: number): Observable<Transacao[]> {
    return this.http.get<Transacao[]>(`${this.API}/categoria/${categoriaId}`);
  }

  findByUsuarioId(usuarioId: number): Observable<Transacao[]> {
    return this.http.get<Transacao[]>(`${this.API}/usuarios/${usuarioId}`);
  }

  // ✅ Retorna transações por usuário e tipo (ENTRADA ou SAIDA)
  findByUsuarioAndTipo(usuarioId: number, tipo: 'ENTRADA' | 'SAIDA'): Observable<Transacao[]> {
    return this.http.get<Transacao[]>(`${this.API}/usuarios/${usuarioId}/tipo/${tipo}`);
  }

  // ✅ Retorna transações filtradas por periodicidade (DIARIA, SEMANAL ou MENSAL)
  findByPeriodicidade(periodicidade: string): Observable<Transacao[]> {
    return this.http.get<Transacao[]>(`${this.API}/periodicidade/${periodicidade}`);
  }

  // ✅ Retorna transações de um usuário filtradas por periodicidade
  findByUsuarioAndPeriodicidade(usuarioId: number, periodicidade: string): Observable<Transacao[]> {
    return this.http.get<Transacao[]>(`${this.API}/usuarios/${usuarioId}/periodicidade/${periodicidade}`);
  }

  // ✅ Salva uma nova transação
  save(transacao: Transacao): Observable<Transacao> {
    console.log("Transacao Endpoint: ", transacao)
    return this.http.post<Transacao>(this.API, transacao);
  }

  // ✅ Atualiza uma transação existente
  update(transacao: Transacao, id: number): Observable<Transacao> {
    return this.http.put<Transacao>(`${this.API}/${id}`, transacao);
  }

  // ✅ Exclui uma transação pelo ID
  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}
