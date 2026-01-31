import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TransactionService {

  private baseUrl = 'https://localhost:5001/api/transaction';

  constructor(private http: HttpClient) {}

  getMyTransactions(page = 1, pageSize = 10) {
    const params = new HttpParams()
      .set('page', page)
      .set('pageSize', pageSize);

    return this.http.get<any>(`${this.baseUrl}/my`, { params });
  }
}
