import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ChatgptService {

  private apiUrl = 'https://api.openai.com/v1/chat/completions';  // Endpoint для ChatGPT API

  private apiKey = 'your_api_key_here';
  constructor(private http: HttpClient) { }

  sendMessage(messages: { role: string, content: string }[]): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    });
  
    const body = {
      model: "gpt-3.5-turbo",
      messages: messages,  
      max_tokens: 200,
      temperature: 0.7
    };
  
    return this.http.post(this.apiUrl, body, { headers })
  }
  }