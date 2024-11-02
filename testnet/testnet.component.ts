import { Component } from '@angular/core';

@Component({
  selector: 'app-testnet',
  standalone: true,
  imports: [],
  templateUrl: './testnet.component.html',
  styleUrl: './testnet.component.css'
})
export class TestnetComponent {
  onOpen(){
    window.open("https://testnet.bscscan.com/")
  }
}
