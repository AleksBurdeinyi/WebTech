import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { WidgetComponent } from './widget/widget.component';
import { BannerComponent } from './banner/banner.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { HttpClientModule } from '@angular/common/http';
import { LoaderComponent } from './loader/loader.component';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { UpdateComponent } from './update/update.component';
import { NodeComponent } from './node/node.component';
import { NftComponent } from './nft/nft.component';
import { TestnetComponent } from './testnet/testnet.component';
import { SwitchComponent } from './switch/switch.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,WidgetComponent,BannerComponent,MainpageComponent, HttpClientModule,LoaderComponent,CommonModule,NavbarComponent,FooterComponent,UpdateComponent,NodeComponent,NftComponent,TestnetComponent,SwitchComponent],
  templateUrl: './app.component.html',
  
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'App';
  showLoader: boolean = true;  // Спочатку показуємо лоадер
  showContent: boolean = false;

  // Використовуємо правильний метод життєвого циклу ngOnInit
  ngOnInit() {
    this.getShowsContent();  // Викликаємо функцію при ініціалізації компонента
  }

  // Логіка для зміни класів і відображення контенту
  getShowsContent() {
    this.showContent= false;
    this.showLoader= true;  // Спочатку показуємо лоадер
    
    
    setTimeout(() => {
    
      this.showLoader = false;
      this.showContent=true;  // Після затримки вимикаємо лоадер
      // І вмикаємо контент
    }, 1000);  
  }
}