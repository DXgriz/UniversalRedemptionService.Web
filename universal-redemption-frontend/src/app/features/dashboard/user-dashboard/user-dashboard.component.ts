import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletService } from '../../../core/services/wallet.service';
import { TransactionService } from '../../../core/services/transaction.service';

@Component({
  standalone: true,
  selector: 'app-user-dashboard',
  imports: [CommonModule],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  balance = 0;
  transactions: any[] = [];
  page = 1;
  pageSize = 10;
  total = 0;
  loading = true;

  constructor(
    private walletService: WalletService,
    private transactionService: TransactionService
  ) {}

  ngOnInit() {
    this.loadDashboard();
  }

  loadDashboard() {
    this.loading = true;

    this.walletService.getBalance().subscribe(res => {
      this.balance = res.balance;
    });

    this.loadTransactions();
  }

  loadTransactions() {
    this.transactionService.getMyTransactions(this.page, this.pageSize)
      .subscribe(res => {
        this.transactions = res.items;
        this.total = res.totalCount;
        this.loading = false;
      });
  }

  nextPage() {
    if (this.page * this.pageSize < this.total) {
      this.page++;
      this.loadTransactions();
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.loadTransactions();
    }
  }
}
