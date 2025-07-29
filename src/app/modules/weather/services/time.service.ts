import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments';

@Injectable({
  providedIn: 'root',
})
export class TimeService {
  constructor(private http: HttpClient) {}

  private apiKey: string = environment.apiKeytime;
  private apiUrl: string = environment.apiUrlTime;

  getCityTime(lat: number, lng: number): Observable<any> {
    const url = `${this.apiUrl}?key=${this.apiKey}&format=json&by=position&lat=${lat}&lng=${lng}`;
    return this.http.get(url, {});
  }
}
