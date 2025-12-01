import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginEvent } from "../models/login-event.model";
import { LoginEventRequest } from "../models/login-event-request.model";
import { environment } from "../environments/environment";

@Injectable({ providedIn: 'root' })
export class LoginEventsService {
    private readonly baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  create(event: LoginEventRequest): Observable<LoginEventRequest> {
    return this.http.post<LoginEventRequest>(`${this.baseUrl}/login-events`, event);
  }

  getAll(top = 50): Observable<LoginEvent[]> {
    const url = `${this.baseUrl}/login-events?top=${top}`;
    return this.http.get<LoginEvent[]>(url);
  }
}
