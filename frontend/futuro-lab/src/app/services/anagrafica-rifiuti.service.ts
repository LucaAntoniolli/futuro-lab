import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import moment from 'moment';    
import { AnagraficaRifiuti } from '../models/anagrafica-rifiuti.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnagraficaRifiutiService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.baseApiUrl}/AnagraficaRifiuti`;

  getAll(): Observable<AnagraficaRifiuti[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(items => AnagraficaRifiuti.mapArray(items))
    );
  }

  getById(id: number): Observable<AnagraficaRifiuti> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(item => AnagraficaRifiuti.map(item))
    );
  }

  create(item: AnagraficaRifiuti): Observable<AnagraficaRifiuti> {
    const payload = this.mapToDto(item);
    return this.http.post<any>(this.apiUrl, payload).pipe(
      map(response => AnagraficaRifiuti.map(response))
    );
  }

  update(id: number, item: AnagraficaRifiuti): Observable<AnagraficaRifiuti> {
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

  private mapToDto(model: AnagraficaRifiuti): any {
    return {
      id: model.id,
      tipo: model.tipo,
      descrizione: model.descrizione,
      luogoProduzione: model.luogoProduzione,
      dataProduzione: model.dataProduzione ? model.dataProduzione.format('YYYY-MM-DD') : null,
      note: model.note
    };
  }
}
