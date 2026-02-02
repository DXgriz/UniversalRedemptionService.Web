import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class WalletService {

  private baseUrl = 'https://localhost:7052/api/wallet';

  constructor(private http: HttpClient) {}

  getBalance() {
    return this.http.get<{ balance: number }>(`${this.baseUrl}/balance`);
  }
}
