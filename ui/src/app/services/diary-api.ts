import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { Diary } from '../models/diary';
import { DiaryDto } from '../models/diary-dto';
import { ConfigService } from './config-service';

@Service()
export class DiaryApi {
  private readonly config = inject(ConfigService);
  private readonly http = inject(HttpClient);

  create(body: DiaryDto): Observable<Diary> {
    return this.http.post<Diary>(`${this.config.apiUrl}/diary`, body);
  }

  findAll(): Observable<Diary[]> {
    return this.http.get<Diary[]>(`${this.config.apiUrl}/diary`);
  }

  findOne(id: string): Observable<Diary> {
    return this.http.get<Diary>(`${this.config.apiUrl}/diary/${id}`);
  }

  update(id: string, body: DiaryDto): Observable<Diary> {
    return this.http.patch<Diary>(`${this.config.apiUrl}/diary/${id}`, body);
  }

  remove(id: string): Observable<Diary> {
    return this.http.delete<Diary>(`${this.config.apiUrl}/diary/${id}`);
  }
}
