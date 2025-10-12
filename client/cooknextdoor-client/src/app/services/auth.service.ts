import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';

interface AuthResponseData {
  token: string;
  userId: string;
  email: string;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenExpirationTimer: any;
  user = new BehaviorSubject<AuthResponseData | null>(null);

  constructor(private http: HttpClient, private router: Router) {}

  isAuthenticated(): boolean {
    return !!this.user.value;
  }

  getAuthToken(): string | null {
    return this.user.value?.token || null;
  }

  signup(name: string, email: string, password: string) {
    return this.http
      .post<AuthResponseData>('http://localhost:5001/api/auth/register', {
        name,
        email,
        password
      })
      .pipe(
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.userId,
            resData.token,
            resData.name
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>('http://localhost:5001/api/auth/login', {
        email,
        password
      })
      .pipe(
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.userId,
            resData.token,
            resData.name
          );
        })
      );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    name: string
  ) {
    const user = {
      email,
      userId,
      token,
      name
    };
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }
}