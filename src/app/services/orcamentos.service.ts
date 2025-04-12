import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Orcamento } from '../models/orcamentos';

@Injectable({
  providedIn: 'root'
})
export class OrcamentoService {

  http = inject(HttpClient);

  API = 'http://localhost:8080/orcamentos';

  constructor() { }

  // Retorna todas as orcamentos
  findAll(): Observable<Orcamento[]> {
    return this.http.get<Orcamento[]>(this.API);
  }

  // Retorna uma orcamento pelo ID
  findById(id: number): Observable<Orcamento> {
    return this.http.get<Orcamento>(`${this.API}/${id}`);
  }

  // Retorna uma orcamento pelo ID do Usuario
  findByUsuarioId(usuarioId: number): Observable<Orcamento[]> {
    const params = new HttpParams().set('usuarioId', usuarioId.toString());
    return this.http.get<Orcamento[]>(this.API, { params });
  }

  // Retorna uma orcamento pelo ID do Usuario e ID da Categoria
  findByUsuarioIdAndCategoriaId(usuarioId: number, categoriaId: number): Observable<Orcamento[]> {
    const params = new HttpParams()
      .set('usuarioId', usuarioId.toString())
      .set('categoriaId', categoriaId.toString());
    return this.http.get<Orcamento[]>(this.API, { params });
  }

  // Salva uma nova orcamento enviando o objeto completo, incluindo "usuario"
  save(orcamento: Orcamento): Observable<string> {
    return this.http.post<string>(this.API, orcamento, { responseType: 'text' as 'json' });
  }

  // Atualiza uma orcamento existente
  update(orcamento: Orcamento, id: number): Observable<string> {
    return this.http.put<string>(`${this.API}/${id}`, orcamento, { responseType: 'text' as 'json' });
  }

  // Exclui uma orcamento pelo ID
  deleteById(id: number): Observable<string> {
    return this.http.delete<string>(`${this.API}/${id}`, { responseType: 'text' as 'json' });
  }
}
