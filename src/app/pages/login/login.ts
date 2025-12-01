import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { LoginEvent } from '../../models/login-event.model';
import { LoginEventsService } from '../../services/login-events.service';
import { LoginEventRequest } from '../../models/login-event-request.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  form: FormGroup;
  submitted = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private loginEvents: LoginEventsService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';

    if (this.form.invalid) {
      return;
    }
    
    const { email, password } = this.form.value;

    // log login event to Azure Function
    const loginAuditEvent: LoginEventRequest = {
      userEmail: email,
      userAgent: navigator.userAgent,
      success: true
    };

    this.loginEvents.create(loginAuditEvent).subscribe({
      next: () => console.log('Login event logged'),
      error: err => console.error('Failed to log login event', err)
    });

    // Fake validation: accept any non-empty credentials
    // (later we can restrict to specific demo credentials)
    if (!email || !password) {
      this.errorMessage = 'Invalid credentials.';
      return;
    }

    this.auth.login(email);
    this.router.navigate(['/dashboard']);
  }
}
