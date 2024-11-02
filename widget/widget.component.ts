
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { fail } from 'node:assert';
import { error } from 'node:console';

import { Mp3Component } from './mp3/mp3.component';
import { LoaderComponent } from '../loader/loader.component';
import { FooterComponent } from '../footer/footer.component';
@Component({
  selector: 'app-widget',
  standalone: true,
 
  imports:  [FormsModule,CommonModule, HttpClientModule,Mp3Component, LoaderComponent,FooterComponent],
  templateUrl: './widget.component.html',
  
  styleUrl: './widget.component.css'
})
export class WidgetComponent implements OnInit {
  
  apiKey: string="Yor Api WEATHER"
  currentTemp: any = '';
  currentMin: any = '';
  currentMax: any = '';
  humidityPrct: any = '';
  windSpeed: any = '';
  weatherDescrip: any = '';
  inputCityValue: string = '';
  inputCryptoValue:string =''
  weatherState: string = '';
  weatherIcon: string = '';
  isLoader = true;
  myCity: string = 'City';
  crypto: any = { priceUsd: 1 };  
  allCurency:any= []

 

  error: string | null = null;
  latitude: number | null = null;
  longitude: number | null = null;
  errorMessage: string | null = null;

  // Дані для 7-денного прогнозу
  weatherDays: Array<{ day: string; maxTemp: number; minTemp: number; icon: string; date: Date }> = [];
  isShow:boolean=false
  weatherIcons = {
    'Clear': 'https://cdn-icons-png.flaticon.com/128/6421/6421095.png',
    'Clouds': 'https://cdn-icons-png.flaticon.com/128/1163/1163661.png',
    'Rain': 'https://cdn-icons-png.flaticon.com/128/1163/1163657.png',
    'Drizzle': 'https://cdn-icons-png.flaticon.com/128/1163/1163665.png',
    'Thunderstorm': 'https://cdn-icons-png.flaticon.com/128/1163/1163668.png',
    'Snow': 'https://cdn-icons-png.flaticon.com/128/1163/1163675.png',
    'Mist': 'https://cdn-icons-png.flaticon.com/128/1163/1163678.png',
    'Smoke': 'https://cdn-icons-png.flaticon.com/128/1163/1163674.png',
    'Haze': 'https://cdn-icons-png.flaticon.com/128/1163/1163662.png',
    'Dust': 'https://cdn-icons-png.flaticon.com/128/1163/1163670.png',
    'Fog': 'https://cdn-icons-png.flaticon.com/128/1163/1163673.png',
    'Sand': 'https://cdn-icons-png.flaticon.com/128/1163/1163676.png',
    'Ash': 'https://cdn-icons-png.flaticon.com/128/1163/1163669.png',
    'Squall': 'https://cdn-icons-png.flaticon.com/128/1163/1163677.png',
    'Tornado': 'https://cdn-icons-png.flaticon.com/128/1163/1163679.png'
  };
  

  constructor(private http: HttpClient)
 
   {}

  ngOnInit(): void {
   
    this.getCryptoCurrency('bitcoin')
   this.getCryptoAll()
  
    if (typeof window !== 'undefined' && navigator.geolocation) {
      this.getLocation();
    } else {
      this.errorMessage = 'Geolocation is not supported or not running in the browser.';
    }
  }

  // Отримання геолокації
  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.getWeatherCity(this.latitude, this.longitude);
        },
        (error) => {
          this.errorMessage = error.message;
          console.error('Geolocation error:', this.errorMessage);
        }
      );
    } else {
      this.errorMessage = 'Geolocation is not supported by this browser.';
      console.error(this.errorMessage);
    }
  }

  // Отримання прогнозу погоди на 7 днів за координатами
  async getWeatherCity(latitude: number, longitude: number): Promise<void> {
    const urlCity = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${this.apiKey}&units=metric`;
    try {
      const response = await fetch(urlCity);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      this.myCity = result.city.name; // Зберігаємо назву міста
      this.updateWeatherData(result.list[0]); // Оновлюємо дані з поточної погоди
      this.updateSevenDayForecast(result); // Оновлюємо прогноз на 7 днів
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }

  // Оновлення прогнозу на 7 днів
  updateSevenDayForecast(result: any): void {
    const dailyData: any = {};

    result.list.forEach((forecast: any) => {
      const date = new Date(forecast.dt_txt);
      const dayName = date.toLocaleString('uk-UA', { weekday: 'short' });

      if (!dailyData[date.toLocaleDateString()]) {
        dailyData[date.toLocaleDateString()] = {
          temp_min: forecast.main.temp_min,
          temp_max: forecast.main.temp_max,
          weather: forecast.weather[0].main,
          icon: this.getUpdateIcon(forecast.weather[0].main),
          day: dayName,
          date: date // Додаємо дату для подальшого використання
        };
      } else {
        dailyData[date.toLocaleDateString()].temp_min = Math.min(dailyData[date.toLocaleDateString()].temp_min, forecast.main.temp_min);
        dailyData[date.toLocaleDateString()].temp_max = Math.max(dailyData[date.toLocaleDateString()].temp_max, forecast.main.temp_max);
      }
    });

    this.weatherDays = Object.keys(dailyData).map((date) => ({
      day: dailyData[date].day,
      maxTemp: Math.trunc(dailyData[date].temp_max),
      minTemp: Math.trunc(dailyData[date].temp_min),
      icon: dailyData[date].icon,
      date: dailyData[date].date // Додаємо дату до масиву
    })).slice(0, 7); // Беремо лише перші 7 днів

    console.log('Weather Days:', this.weatherDays);
  }

  // Метод для отримання погоди за назвою міста
  async getWeather(city: string): Promise<void> {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      this.updateWeatherData(result); // Оновлення даних погоди
      // Отримати прогноз на 7 днів за новим містом
      await this.getWeatherCity(result.coord.lat, result.coord.lon); // Передаємо координати
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }

  // Метод для пошуку міста за назвою
  onClickSearch(): void {
    if (this.inputCityValue.length === 0) {
      alert('Будь ласка, введіть місто перед пошуком!');
      return;
    }
    this.getWeather(this.inputCityValue);
    this.onCleanValue();
  }

  // Очищення поля вводу
  onCleanValue(): void {
    this.inputCityValue = '';
  }
  onCleanCryptoValue(){
    this.inputCryptoValue=''
  }

  // Оновлення даних погоди
  updateWeatherData(result: any): void {
    this.currentTemp = Math.trunc(result.main.temp);
    this.currentMin = Math.trunc(result.main.temp_min);
    this.currentMax = Math.trunc(result.main.temp_max);
    this.humidityPrct = result.main.humidity;
    this.windSpeed = Math.trunc(result.wind.speed);
    this.weatherDescrip = result.weather[0].description;
    this.weatherState = result.weather[0].main;
    this.weatherIcon = this.getUpdateIcon(this.weatherState);

    this.isLoader = false; // Вимкнути лоадер після завантаження
    console.log('Updated Weather Data:', {
      temp: this.currentTemp,
      min: this.currentMin,
      max: this.currentMax,
      humidity: this.humidityPrct,
      wind: this.windSpeed,
      state: this.weatherState,
      city: this.myCity
    });
  }
  getCryptoCurrency(currency: string) {
    const cryptoUrl = `https://api.coincap.io/v2/assets/${currency}`; 
    this.http.get<any>(cryptoUrl).subscribe(
      data => {
        console.log('Отримані дані:', data);
        if (data && data.data && !isNaN(data.data.priceUsd)) {
          this.crypto = { 
            ...data.data, 
            priceUsd: parseFloat(data.data.priceUsd).toFixed(7) 
          };  // Присвоюємо отримані дані в змінну

          this.error = null;
        } else {
          this.error = 'Криптовалюта не знайдена';
        }
      },
      error => {
        alert('Invalid data!')
        this.error = 'Помилка при отриманні даних: ' + error.message;

      }
    );
  }
  getCryptoAll() {
    const cryptoUrl = `https://api.coincap.io/v2/assets`;
    this.http.get<any>(cryptoUrl).subscribe(
      response => {
        console.log('Отримані дані:', response);
  
        if (response && response.data && Array.isArray(response.data)) {
          // Перебираємо масив криптовалют і форматуємо `priceUsd`
          this.allCurency = response.data.map((currency: { id: string; priceUsd: string; }) => ({
            ...currency,
            priceUsd: currency.priceUsd ? parseFloat(currency.priceUsd).toFixed(7) : 'N/A',  // Форматування priceUsd або значення 'N/A'
            imageUrl: {
              'bitcoin': 'https://cdn-icons-png.flaticon.com/128/5968/5968260.png',
              'ethereum': 'https://cdn-icons-png.flaticon.com/128/14446/14446159.png',
              'tether': 'https://cdn-icons-png.flaticon.com/128/15208/15208231.png',
              'binance-coin': 'https://cdn-icons-png.flaticon.com/128/15301/15301504.png',
              'solana': 'https://cdn-icons-png.flaticon.com/128/15208/15208206.png',
              'usd-coin': 'https://cdn-icons-png.flaticon.com/128/126/126229.png',
              'xrp': 'https://cdn-icons-png.flaticon.com/128/15208/15208007.png',
              'dogecoin': 'https://cdn-icons-png.flaticon.com/128/7320/7320825.png',
              'tron': 'https://cdn-icons-png.flaticon.com/128/15301/15301821.png',
              'cardano': 'https://cdn-icons-png.flaticon.com/128/7016/7016514.png',
              'avalanche': 'https://cdn-icons-png.flaticon.com/128/869/869869.png',
              'shiba-inu': 'https://cdn-icons-png.flaticon.com/128/15301/15301760.png',
              'wrapped-bitcoin': 'https://cdn-icons-png.flaticon.com/128/14446/14446290.png',
              'bitcoin-cash': 'https://cdn-icons-png.flaticon.com/128/14446/14446136.png',
              'chainlink': 'https://cdn-icons-png.flaticon.com/128/6001/6001321.png',
              'polkadot': 'https://cdn-icons-png.flaticon.com/128/7016/7016536.png',
              'near-protocol': 'https://cdn-icons-png.flaticon.com/128/14446/14446201.png',
              'litecoin': 'https://cdn-icons-png.flaticon.com/128/3938/3938179.png',
              'multi-collateral-dai': 'https://cdn-icons-png.flaticon.com/128/7016/7016518.png',
              
              'uniswap': 'https://cdn-icons-png.flaticon.com/128/15301/15301831.png',
            
            }[currency.id] || 'https://cdn-icons-png.flaticon.com/128/825/825473.png',
              // Додаємо посилання на зображення
          }));
          this.error = null;  // Очищаємо помилку, якщо дані успішно отримані
        } else {
          this.error = 'Криптовалюти не знайдені';  // Якщо немає даних
        }
      },
      error => {
        alert('Invalid data!');
        this.error = 'Помилка при отриманні даних: ' + error.message;  // Повідомлення про помилку
      }
    );
  }
  
  





  // Оновлення іконки погоди
  getUpdateIcon(icon: string): string {
    const iconUrl = this.weatherIcons[icon as keyof typeof this.weatherIcons];
    return iconUrl ;
  }
  

  // Порівняння дати
  isToday(day: Date): boolean {
    const today = new Date();
    const todayString = today.toLocaleDateString('uk-UA'); // Форматуємо сьогоднішню дату
    const dayString = day.toLocaleDateString('uk-UA'); // Форматування дати для порівняння

    return todayString === dayString; // Порівнюємо рядки
  }
  onSearchCrypto(){
    if (this.inputCryptoValue.length === 0) {
      alert('Будь ласка, введіть криптовалюту перед пошуком!');
      return;
    }
    console.log(this.inputCryptoValue)
    this.getCryptoCurrency(this.inputCryptoValue.toLowerCase())
    this.onCleanCryptoValue();
  }
 onClickT(){
  window.location.href='https://t.me/Riched1'
 }
 onClickI(){
  window.location.href='https://www.instagram.com/burdeinyi.1/profilecard/?igsh=cjh2ZTI1enZuaGdz'

 }

}
  // Оновлення іконки погоди
 
  // getUpdateIcon(icon: string): string {
  //   return this.weatherIcons[icon as keyof typeof this.weatherIcons] || 'bx-question-mark';
  // }

