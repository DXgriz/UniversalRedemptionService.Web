import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TokenService {

  private readonly TOKEN_KEY = 'access_token';

  setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  clear() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}

