import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service'; // adjust path if needed
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class Dashboard {
  email: string | null;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
    // ✅ Assign here after auth is initialized
    this.email = this.auth.getUserEmail();
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
