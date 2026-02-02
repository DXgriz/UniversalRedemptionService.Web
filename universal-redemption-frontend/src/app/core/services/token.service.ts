/*import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';


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

  getDecodedToken(): any | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = token.split('.')[1];
      return jwtDecode(JSON.parse(atob(payload)));
    } catch {
      return null;
    }
  }
}
*/
import { Injectable } from '@angular/core';
import {jwtDecode} from 'jwt-decode';

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

  getDecodedToken(): any | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      return jwtDecode(token);
    } catch {
      return null;
    }
  }

  getUsername(): string | null {
    const decoded = this.getDecodedToken();
    if (!decoded) return null;

    return decoded['username'] 
      || decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] 
      || null;
  }

  getEmail(): string | null {
    const decoded = this.getDecodedToken();
    if (!decoded) return null;

    return decoded['email'] ?? null;
  }

  getRole(): string | null {
    const decoded = this.getDecodedToken();
    if (!decoded) return null;

    return decoded['role'] 
      || decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] 
      || null;
  }
}
