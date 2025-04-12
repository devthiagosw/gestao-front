import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria';

@Injectable({ providedIn: 'root' })
export class CategoriaService {
  private http = inject(HttpClient);
  private readonly API = 'http://localhost:8080/categorias'; // pode trocar depois por environment

  /** 🔍 Buscar todas as categorias */
  findAll(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.API);
  }

  /** 🔍 Buscar uma categoria por ID */
  findById(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.API}/${id}`);
  }

  /** 💾 Salvar nova categoria */
  save(categoria: Categoria): Observable<string> {
    return this.http.post<string>(this.API, categoria, { responseType: 'text' as 'json' });
  }

  /** 🛠 Atualizar categoria existente */
  update(categoria: Categoria): Observable<string> {
    if (!categoria.id) {
      throw new Error('Categoria deve ter um ID para ser atualizada.');
    }
    return this.http.put<string>(`${this.API}/${categoria.id}`, categoria, { responseType: 'text' as 'json' });
  }

  /** 🗑 Excluir categoria */
  deleteById(id: number): Observable<string> {
    return this.http.delete<string>(`${this.API}/${id}`, { responseType: 'text' as 'json' });
  }
}
