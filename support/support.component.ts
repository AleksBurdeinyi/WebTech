import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']  // Fixed the typo
})
export class SupportComponent {

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      from_name: [''],
      from_surname: [''],
      to_name: ['ADMIN'],
      from_email: [''],
      message: ['Hello'],
      from_address: ['']
    });
  }

   async send() {

    const formData = this.form.value;

      emailjs.init('AThVHeyzF_FLAXCvI')
      let response= await  emailjs.send("service_8948mbw", "template_wqxyvj6", {
      from_name: formData.from_name,
      from_surname: formData.from_surname,
      to_name: formData.to_name,
      from_email: formData.from_email,
      message: formData.message,
      from_address: formData.from_address
    }).then((response) => {
      alert("Send Sucusful!")
      console.log('Email sent successfully!', response.status, response.text);
    }).catch((error) => {
      console.error('Failed to send email:', error);
    });
   this.form.reset()
  }
}
