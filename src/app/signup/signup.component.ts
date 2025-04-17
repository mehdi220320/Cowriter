import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  firstName: any;
  lastName: any;
  role: any;
  confirmPassword:any;
  email:any;
  password:any;
  onRegister() {

  }
}
