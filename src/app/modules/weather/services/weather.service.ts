import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey: string = '364cc9cbfbde65e15ec14c533598604c';
  private apiUrl: string = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) {}

  getWeatherDatas(cityName: string): Observable<any> {
    const url = `${this.apiUrl}?q=${cityName}&units=metric&mode=json&appid=${this.apiKey}`;
    return this.http.get(url, {});
  }
}
