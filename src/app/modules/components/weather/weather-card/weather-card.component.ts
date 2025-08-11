import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { WeatherData } from '../../../../models/interface/weatherData';
import {
  faDroplet,
  faTemperatureHigh,
  faTemperatureLow,
  faWind,
} from '@fortawesome/free-solid-svg-icons';
import { TimeService } from '../../../weather/services/time.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-weather-card',
  standalone: false,
  templateUrl: './weather-card.component.html',
  styleUrls: [
    './weather-card.component.css',
    './weather-card.component.responsive.css',
  ],
})
export class WeatherCardComponent implements OnChanges, OnDestroy {
  constructor(private timeService: TimeService) {}

  ngOnChanges(changes: SimpleChanges) {
    const weatherChange = changes['weatherDataInput'];
    if (
      weatherChange &&
      weatherChange.currentValue !== weatherChange.previousValue
    ) {
      this.getCityTime();
    }
  }

  @Input() weatherDataInput!: WeatherData;

  cityTime!: string;
  cityDate!: string;
  isNight: boolean = false;
  minTemperatureIcon = faTemperatureLow;
  maxTemperatureIcon = faTemperatureHigh;
  humidityIcon = faDroplet;
  windIcon = faWind;
  private readonly destroy$: Subject<void> = new Subject();
  private readonly body = document.body;

  getCityTime() {
    this.timeService
      .getCityTime(
        this.weatherDataInput.coord.lat,
        this.weatherDataInput.coord.lon
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          console.log(response);
          const dateTime = response.formatted.split(' ');
          this.cityTime = `${dateTime[1].split(':')[0]}:${
            dateTime[1].split(':')[1]
          }`;

          const hour = this.cityTime.split(':')[0];
          this.checkIfIsNight(hour);

          const dateArray = dateTime[0].split('-');
          this.cityDate = `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  checkIfIsNight(hour: string) {
    this.isNight = parseInt(hour) >= 18 || parseInt(hour) < 6 ? true : false;
    if (this.isNight) {
      this.body.classList.add('night-mode');
      this.body.classList.remove('day-mode');
    } else {
      this.body.classList.add('day-mode');
      this.body.classList.remove('night-mode');
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
