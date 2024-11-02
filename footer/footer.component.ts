import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  isShowForm:boolean=false
  onClickContact(){
   this.isShowForm=true
  }
  closeForm(){
    this.isShowForm=false
  }
}
