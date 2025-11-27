import { Injectable } from '@angular/core';

const AUTH_KEY = 'smartward-auth';
const EMAIL_KEY = 'smartward-email';

@Injectable({ providedIn: 'root' })
export class AuthService {
  isLoggedIn(): boolean {
    return localStorage.getItem(AUTH_KEY) === 'true';
  }

  login(email: string): void {
    localStorage.setItem(AUTH_KEY, 'true');
    localStorage.setItem(EMAIL_KEY, email);
  }

  logout(): void {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(EMAIL_KEY);
  }

  getUserEmail(): string | null {
    return localStorage.getItem(EMAIL_KEY);
  }
}
