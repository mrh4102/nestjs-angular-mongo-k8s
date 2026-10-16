import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { Diary } from '../models/diary';
import { DiaryDto } from '../models/diary-dto';

@Service()
export class DiaryApi {
  private readonly baseUrl = 'http://localhost:3000';
  private readonly http = inject(HttpClient);

  create(body: DiaryDto): Observable<Diary> {
    return this.http.post<Diary>(`${this.baseUrl}/diary`, body);
  }

  findAll(): Observable<Diary[]> {
    return this.http.get<Diary[]>(`${this.baseUrl}/diary`);
  }

  findOne(id: string): Observable<Diary> {
    return this.http.get<Diary>(`${this.baseUrl}/diary/${id}`);
  }

  update(id: string, body: DiaryDto): Observable<Diary> {
    return this.http.patch<Diary>(`${this.baseUrl}/diary/${id}`, body);
  }

  remove(id: string): Observable<Diary> {
    return this.http.delete<Diary>(`${this.baseUrl}/diary/${id}`);
  }
}
