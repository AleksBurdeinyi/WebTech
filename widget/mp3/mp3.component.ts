import { CommonModule } from '@angular/common';
import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-mp3',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mp3.component.html',
  styleUrls: ['./mp3.component.css']
})
export class Mp3Component implements OnInit {
  
  audio: HTMLAudioElement | null = null;
  circleLeft: string = '';
  barWidth: string = '';
  duration: string = '00:00';
  currentTime: string = '00:00';
  isTimerPlaying: boolean = false;
  currentTrack: any = null;
  currentTrackIndex: number = 0;
  transitionName: string = '';
  
  tracks = [
    {
      name: "Mekanın Sahibi",
      artist: "Norm Ender",
      cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/1.jpg",
      source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/1.mp3",
      url: "https://www.youtube.com/watch?v=z3wAjJXbYzA",
      favorited: false
    },
    {
      name: "Everybody Knows",
      artist: "Leonard Cohen",
      cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/2.jpg",
      source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/2.mp3",
      url: "https://www.youtube.com/watch?v=Lin-a2lTelg",
      favorited: true
    },
    {
      name: "Extreme Ways",
      artist: "Moby",
      cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/3.jpg",
      source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/3.mp3",
      url: "https://www.youtube.com/watch?v=ICjyAe9S54c",
      favorited: false
    },{
      name: "Extreme Ways",
      artist: "Moby",
      cover: "https://i.pinimg.com/originals/a3/22/04/a32204a25ae39d0c03de74805021f9d7.jpg",
      source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/3.mp3",
      url: "https://www.youtube.com/watch?v=ICjyAe9S54c",
      favorited: false
    }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.currentTrack = this.tracks[this.currentTrackIndex] || null;
      this.initializeAudio();
    } else {
      console.warn('Audio API недоступний на сервері');
    }
  }

  // Ініціалізація аудіо
  initializeAudio(): void {
    if (this.currentTrack && isPlatformBrowser(this.platformId)) {
      this.audio = new Audio();
      this.audio.src = this.currentTrack.source;

      this.audio.ontimeupdate = () => {
        this.generateTime();
      };

      this.audio.onloadedmetadata = () => {
        this.generateTime();
      };

      this.audio.onended = () => {
        this.nextTrack();
        this.isTimerPlaying = true;
      };
    }
  }

  // Відтворення або пауза
  play(): void {
    if (this.audio) {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    }
  }

  // Генерація часу та прогресу
  generateTime(): void {
    if (this.audio) {
      const width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";

      const durmin = Math.floor(this.audio.duration / 60);
      const dursec = Math.floor(this.audio.duration - durmin * 60);
      const curmin = Math.floor(this.audio.currentTime / 60);
      const cursec = Math.floor(this.audio.currentTime - curmin * 60);

      this.duration = `${this.pad(durmin)}:${this.pad(dursec)}`;
      this.currentTime = `${this.pad(curmin)}:${this.pad(cursec)}`;
    }
  }

  // Додавання нуля до часу
  pad(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  // Перехід на наступний трек
  nextTrack(): void {
    this.currentTrackIndex = (this.currentTrackIndex + 1) % this.tracks.length;
    this.currentTrack = this.tracks[this.currentTrackIndex];
    this.resetPlayer();
  }

  // Перехід на попередній трек
  prevTrack(): void {
    this.currentTrackIndex = (this.currentTrackIndex - 1 + this.tracks.length) % this.tracks.length;
    this.currentTrack = this.tracks[this.currentTrackIndex];
    this.resetPlayer();
  }

  // Скидання плеєра і відтворення нового треку
  resetPlayer(): void {
    if (this.audio) {
      this.barWidth = "0%";
      this.circleLeft = "0%";
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      this.audio.play();
    }
  }

  // Додавання або видалення треку в обране
  favorite(): void {
    this.tracks[this.currentTrackIndex].favorited = !this.tracks[this.currentTrackIndex].favorited;
  }

  // Клік по прогрес-бару для зміни часу
  clickProgress(event: MouseEvent): void {
    if (this.audio) {
      const progressContainer = event.target as HTMLElement;
      const containerWidth = progressContainer.offsetWidth;  // Ширина контейнера
      const clickX = event.offsetX;  // Позиція кліка на осі X
      
      const percentage = clickX / containerWidth;  // Процент, куди клікнули від загальної ширини
      const newTime = this.audio.duration * percentage;  // Вираховуємо новий час для треку
  
      this.audio.currentTime = newTime;  // Встановлюємо новий час відтворення
    }
  }
}
