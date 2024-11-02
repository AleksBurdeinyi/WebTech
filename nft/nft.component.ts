import { Component } from '@angular/core';

@Component({
  selector: 'app-nft',
  standalone: true,
  imports: [],
  templateUrl: './nft.component.html',
  styleUrl: './nft.component.css'
})
export class NftComponent {

  newWindow(){
    window.open("https://opensea.io/")
  }
}
