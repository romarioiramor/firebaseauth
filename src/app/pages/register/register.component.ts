import { Component, OnInit } from '@angular/core';

import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email = '';
  password = '';
  message = '';
  errorMessage = '';
  error: { name: string, message: string } = { name: '', message: '' };

  constructor(private authservice: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  clearErrorMessage() {
    this.errorMessage = '';
    this.error = { name: '', message: '' };
  }

  validateForm(email, password) {
    if (this.password.length === 0) {
      this.errorMessage = 'Please entrer email';
      return false;
    }
    if (this.email.length === 0) {
      this.errorMessage = 'Please entrer password';
      return false;
    }
    if (this.password.length < 6) {
      this.errorMessage = 'Password should be at least 6';
      return false;
    }
    this.errorMessage = '';
    return true;
  }

  register() {
    this.clearErrorMessage();
    if (this.validateForm(this.email, this.password)) {
      this.authservice.registerWithEmail(this.email, this.password)
      .then(() => {
        this.message = 'you are register with data on firebase',
        this.router.navigate(['/userinfo'])
      }).catch(_error => {
        this.error = _error,
        this.router.navigate(['/register'])
      })
    }
  }

}
