export interface LoginEvent {
    id: string;
    userEmail: string;
    loginAt: string;         // ISO string, we’ll format with date pipe
    userAgent: string;
    ip: string | null;
    success: boolean;
  }
  