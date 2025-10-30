import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tag } from '../models/tag';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  private baseUrl = `${environment.SERVIDOR}/api/tags`;

  constructor(private http: HttpClient) { }

  findAll(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.baseUrl);
  }

  findById(id: number): Observable<Tag> {
    return this.http.get<Tag>(`${this.baseUrl}/${id}`);
  }

  create(tag: Tag): Observable<Tag> {
    return this.http.post<Tag>(this.baseUrl, tag);
  }

  update(id: number, tag: Tag): Observable<Tag> {
    return this.http.put<Tag>(`${this.baseUrl}/${id}`, tag);
  }

  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
