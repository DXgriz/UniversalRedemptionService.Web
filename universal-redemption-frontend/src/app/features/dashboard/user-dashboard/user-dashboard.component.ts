import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletService } from '../../../core/services/wallet.service';
import { TransactionService } from '../../../core/services/transaction.service';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { Router } from '@angular/router';
import { TokenService } from '../../../core/services/token.service';

@Component({
  standalone: true,
  selector: 'app-user-dashboard',
  imports: [CommonModule, FooterComponent],
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

  userName = '';
  userEmail = '';
  userInitials = '';

  constructor(
    private walletService: WalletService,
    private transactionService: TransactionService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUser();
    this.loadDashboard();
  }
/*
  loadUser() {
    const payload = this.tokenService.getDecodedToken();
    this.userName = payload?.email?.split('@')[0] || 'User';
    this.userEmail = payload?.email || '';
    this.userInitials = this.userName.charAt(0).toUpperCase();
  }
*/
loadUser() {
  const token = this.tokenService.getDecodedToken();
/*
  this.userEmail =
    token?.email ||
    token?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] ||
    'User';

  this.userName = this.userEmail !== 'User'
    ? this.userEmail.split('@')[0]
    : 'User';
*/

  this.userEmail = this.tokenService.getEmail() || 'User';
  this.userName = this.userEmail !== 'User' ? this.userEmail.split('@')[0] : 'User';
  this.userInitials = this.userName.charAt(0).toUpperCase();
}

  loadDashboard() {
    this.loading = true;

    this.walletService.getBalance().subscribe(res => {
      this.balance = res.balance;
    });

    this.loadTransactions();
  }

  loadTransactions() {
    this.transactionService
      .getMyTransactions(this.page, this.pageSize)
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

  logout() {
    this.tokenService.clear();
    this.router.navigate(['/login']);
  }
}