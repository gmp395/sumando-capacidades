import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

export interface LoginResponse {
  token: string;
  id: number;
  name: string;
  email: string;
  rol: string;
}

export interface UserInfo {
  id: number;
  name: string;
  email: string;
  rol: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8082/auth';

  private userSubject = new BehaviorSubject<UserInfo | null>(null);

  user$ = this.userSubject.asObservable();


  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.initAuth();
  }


  private initAuth(): void {

    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (!token || !savedUser) {
      this.clearSession();
      return;
    }

    try {

      const user: UserInfo = JSON.parse(savedUser);

      this.userSubject.next(user);

    } catch {

      this.clearSession();

    }
  }


  login(
    email: string,
    password: string
  ): Observable<LoginResponse> {

    return this.http.post<LoginResponse>(
      `${this.apiUrl}/login`,
      {
        email,
        password
      }
    ).pipe(

      tap(response => {

        const userInfo: UserInfo = {
          id: response.id,
          name: response.name,
          email: response.email,
          rol: response.rol
        };

        localStorage.setItem(
          'token',
          response.token
        );

        localStorage.setItem(
          'user',
          JSON.stringify(userInfo)
        );

        this.userSubject.next(userInfo);

      })

    );
  }


  register(
    userData: any
  ): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/register`,
      userData
    );
  }


  forgotPassword(
    email: string
  ): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/forgot-password`,
      { email }
    );
  }


  resetPassword(
    token: string,
    newPassword: string
  ): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/reset-password`,
      {
        token,
        newPassword
      }
    );
  }


  logout(): void {

    this.clearSession();

    this.router.navigate(['/']);
  }


  private clearSession(): void {

    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.userSubject.next(null);
  }


  getToken(): string | null {

    return localStorage.getItem('token');
  }


  isLoggedIn(): boolean {

    return !!this.getToken();
  }


  get currentUser(): UserInfo | null {

    return this.userSubject.value;
  }


  isAdmin(): boolean {

    const user = this.currentUser;

    return user?.rol?.toLowerCase() === 'admin';
  }

}