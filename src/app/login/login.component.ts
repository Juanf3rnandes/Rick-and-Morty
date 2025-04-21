import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import authMocks from './auth.mocks.json';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  authenticated: boolean | null = null;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  logout() {
    this.authenticated = false;
    localStorage.removeItem('user');
  }

  authenticate() {
    const { email, password } = this.loginForm.value;

    const user = authMocks.find(
      (user) => user.user === email && user.password === password
    );

    if (user) {
      this.authenticated = true;
      localStorage.setItem(
        'user',
        JSON.stringify({
          email: user.user,
          name: user.name,
          favorites: user.favorites,
        })
      );
    } else {
      this.authenticated = false;
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.authenticate();

    const { email, password } = this.loginForm.value;
  }
}
