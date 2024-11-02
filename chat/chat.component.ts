import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ChatgptService } from '../chatgpt.service';
import { Observable } from 'rxjs';
import { Renderer2} from '@angular/core'
@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './chat.component.html',
  providers: [ChatgptService],
  styleUrls: ['./chat.component.css'] // Виправлено styleUrl на styleUrls
})
export class ChatComponent {
  @ViewChild('sesion', { static: true }) sessionalElement!: ElementRef;
  text: string = "Привіт, я — Ауріс, інтегрований помічник, розроблений Aleks. Чим можу бути корисним для тебе сьогодні?";
  userMessage: string = ''; // Повідомлення від користувача
  messagesHistory: { role: string, content: string }[] = [];

  constructor(private chatgptService: ChatgptService,private renderer: Renderer2, private sesionalElement: ElementRef) {}

  ngOnInit(): void {}

  onSendMes() {
    if (this.userMessage.trim().length === 0) {
      alert("Не можна відправити порожнє повідомлення.");
      return;
    }

    // Додаємо повідомлення користувача в історію
    this.messagesHistory.push({ role: "user", content: this.userMessage });
    this.addElement(this.userMessage);
    this.onCleanValue();

    // Відправляємо запит до API
    this.chatgptService.sendMessage(this.messagesHistory).subscribe(
      (response: any) => {
        console.log('Повна відповідь від API:', response); // Логування відповіді
        if (response.choices && response.choices.length > 0) {
          const botResponse = response.choices[0].message.content; // Отримання відповіді
          this.messagesHistory.push({ role: "assistant", content: botResponse });
          this.addAnswer(botResponse);
        } else {
          console.error('Немає вибору у відповіді:', response);
          alert("Неправильна структура відповіді від сервера.");
        }
      },
      (error: any) => {
        console.error('Виникла помилка:', error); // Логування помилок
        alert("Помилка при отриманні відповіді від сервера.");
      }
    );
  }

  addElement(message: string) {
    const block = `
      <div class="container py-3">
        <div class="d-flex justify-content-end">
          <div class="p-3 mx-2 bg-light bg-gradient" style="width:50%; border-radius:20px">
            <div>${message}</div>
          </div>
        </div>
      </div>
    `;
    this.sessionalElement.nativeElement.innerHTML += block;
  }
  addAnswer(message: string) {
    const container = document.getElementById('sesion');
  
    // Додаємо клас контейнеру, якщо він ще не доданий
    this.renderer.addClass(container, 'container');
    this.renderer.setStyle(container, 'padding', '1rem');
  
    // Створюємо внутрішній блок для вирівнювання повідомлення
    const flexDiv = this.renderer.createElement('div');
    this.renderer.addClass(flexDiv, 'd-flex');
    this.renderer.addClass(flexDiv, 'justify-content-start');
  
    // Створюємо блок повідомлення
    const messageBox = this.renderer.createElement('div');
    this.renderer.setStyle(messageBox, 'width', '35rem');
    this.renderer.setStyle(messageBox, 'border-radius', '20px');
    this.renderer.setStyle(messageBox, 'background-color', '#92fa92');
    this.renderer.setStyle(messageBox, 'padding', '1rem');
  
    // Створюємо іконку копіювання
    const copyIcon = this.renderer.createElement('i');
    this.renderer.addClass(copyIcon, 'bx');
    this.renderer.addClass(copyIcon, 'bx-copy-alt');
    this.renderer.setStyle(copyIcon, 'display', 'flex');
    this.renderer.setStyle(copyIcon, 'justify-content', 'flex-end');
  
    // Додаємо подію копіювання
    this.renderer.listen(copyIcon, 'click', () => this.onCopy(message));
  
    // Додаємо текст повідомлення
    const text = this.renderer.createText(message);
  
    // Вставляємо іконку та текст у блок повідомлення
    this.renderer.appendChild(messageBox, copyIcon);
    this.renderer.appendChild(messageBox, text);
  
    // Додаємо блок повідомлення до внутрішнього контейнера для вирівнювання
    this.renderer.appendChild(flexDiv, messageBox);
  
    // Додаємо весь блок з повідомленням до основного контейнера
    this.renderer.appendChild(container, flexDiv);
  }
  

  onCleanValue() {
    this.userMessage = "";
  }
  onCopy(text: string) {
    navigator.clipboard.writeText(text);
    alert('Текст скопійовано!');
  }
}
