import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paigenotfound',
  standalone: true,
  imports: [],
  templateUrl: './paigenotfound.component.html',
  styleUrl: './paigenotfound.component.css'
})
export class PaigenotfoundComponent {
  constructor(private router: Router) {}

  ngAfterViewInit() {
   
  }
  navigateToPageHome() {
    this.router.navigate(['/']);
  }
  onClikHome(){
      this.navigateToPageHome()
  }
}
