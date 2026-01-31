import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private baseUrl = 'https://localhost:5001/api/auth'; // adjust if needed

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {}

  login(dto: { email: string; password: string }) {
    return this.http.post<{ token: string }>(`${this.baseUrl}/login`, dto)
      .pipe(tap(res => this.tokenService.setToken(res.token)));
  }

  register(dto: any) {
    return this.http.post<{ token: string }>(`${this.baseUrl}/register`, dto)
      .pipe(tap(res => this.tokenService.setToken(res.token)));
  }

  logout() {
    this.tokenService.clear();
  }
}
