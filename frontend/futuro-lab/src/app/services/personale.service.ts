import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import moment from 'moment';
import { Personale } from '../models/personale.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonaleService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.baseApiUrl}/Personale`;

  getAll(): Observable<Personale[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(items => Personale.mapArray(items))
    );
  }

  getById(id: number): Observable<Personale> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(item => Personale.map(item))
    );
  }

  create(item: Personale): Observable<Personale> {
    const payload = this.mapToDto(item);
    return this.http.post<any>(this.apiUrl, payload).pipe(
      map(response => Personale.map(response))
    );
  }

  update(id: number, item: Personale): Observable<Personale> {
    const payload = this.mapToDto(item);
    return this.http.put<any>(`${this.apiUrl}/${id}`, payload).pipe(
      map(() => item)
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getCount(): Observable<number> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(items => items.length)
    );
  }

  private mapToDto(model: Personale): any {
    return {
      id: model.id,
      nome: model.nome,
      cognome: model.cognome,
      societa: model.societa,
      dataInizio: model.dataInizio ? model.dataInizio.format('YYYY-MM-DD') : null,
      dataFine: model.dataFine ? model.dataFine.format('YYYY-MM-DD') : null
    };
  }
}
