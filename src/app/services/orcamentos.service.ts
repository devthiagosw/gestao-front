import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Orcamento } from '../models/orcamentos';
import { OrcamentoDTO } from '../dtos/orcamento.dto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrcamentoService {

  http = inject(HttpClient);

  API = environment.SERVIDOR+'/orcamentos';

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

  // Retorna uma orcamento pelo ID do Usuario
  findByCategoriaId(categoriaId: number): Observable<Orcamento[]> {
    const params = new HttpParams().set('categoriaId', categoriaId.toString());
    return this.http.get<Orcamento[]>(this.API, { params });
  }


  // Retorna uma orcamento pelo ID do Usuario e ID da Categoria
  findByUsuarioIdAndCategoriaId(usuarioId: number, categoriaId: number): Observable<Orcamento[]> {
    const params = new HttpParams()
      .set('usuarioId', usuarioId.toString())
      .set('categoriaId', categoriaId.toString());
    return this.http.get<Orcamento[]>(this.API, { params });
  }

  // Salva um novo orçamento
  save(orcamento: Orcamento): Observable<string> {
    return this.http.post<string>(this.API, orcamento, { responseType: 'text' as 'json' });
  }

  // Atualiza um orçamento existente
  update(orcamento: Orcamento, id: number): Observable<string> {
    console.log(orcamento);
    return this.http.put<string>(`${this.API}/${id}`, orcamento, { responseType: 'text' as 'json' });
  }

  // Exclui uma orcamento pelo ID
  deleteById(id: number): Observable<string> {
    return this.http.delete<string>(`${this.API}/${id}`, { responseType: 'text' as 'json' });
  }
}
