import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { LoginEventsService } from '../../services/login-events.service';
import { LoginEvent } from '../../models/login-event.model';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard {
  email: string | null;
  loginAudit$!: Observable<LoginEvent[]>; 
  showAll = false;

  constructor(
    private loginEvents: LoginEventsService,
    private auth: AuthService,
    private router: Router
  ) {
    this.email = this.auth.getUserEmail();
    this.loadAudit();
  }

  loadAudit(top = 50): void {
    this.loginAudit$ = this.loginEvents.getAll(top).pipe(
      map(events =>
        this.showAll || !this.email
          ? events
          : events.filter(e => e.userEmail === this.email)
      )
    );
  }

  toggleShowAll(): void {
    this.showAll = !this.showAll;
    this.loadAudit(); // reload with new filter
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
