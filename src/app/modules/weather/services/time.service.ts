import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimeService {
  constructor(private http: HttpClient) {}

  apiURL: string = 'https://api.timezonedb.com/v2.1/get-time-zone';
  apiKey: string = '286L4SBK9IA9';

  getCityTime(lat: number, lng: number): Observable<any> {
    const url = `${this.apiURL}?key=${this.apiKey}&format=json&by=position&lat=${lat}&lng=${lng}`;
    return this.http.get(url, {});
  }
}
