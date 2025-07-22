import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { WeatherData } from '../../../../models/interface/weatherData';
import { Subject, takeUntil } from 'rxjs';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-weather-home',
  standalone: false,
  templateUrl: './weather-home.component.html',
  styleUrl: './weather-home.component.css',
})
export class WeatherHomeComponent implements OnInit, OnDestroy {
  initialCityName: string = 'Nova Iguaçu';
  weatherData!: WeatherData;
  readonly searchIcon = faMagnifyingGlass;
  private readonly destroy$: Subject<void> = new Subject();
  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getWeatherData(this.initialCityName);
  }

  getWeatherData(cityName: string) {
    this.weatherService
      .getWeatherDatas(cityName)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          response && (this.weatherData = response);
          console.log(response.timezone);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  onSubmit(): void {
    this.getWeatherData(this.initialCityName);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
