import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletService } from '../../../core/services/wallet.service';
import { TransactionService } from '../../../core/services/transaction.service';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { Router } from '@angular/router';
import { TokenService } from '../../../core/services/token.service';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';


interface Transaction {
  createdAt: string;
  reference: string;
  type: string;
  amount: number;
  isCredit: boolean;
}

interface RedeemCashSendDto {
  provider: string;
  referenceNumber: string;
  pin: string;
}


@Component({
  standalone: true,
  selector: 'app-user-dashboard',
  imports: [CommonModule, FooterComponent, FormsModule],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

private baseUrl = `${environment.apiUrl}/`;

setSection(section: string) {
  this.currentSection = section;
}

  balance = 0;
  transactions: any[] = [];
  page = 1;
  pageSize = 10;
  total = 0;
  loading = true;

  userName = '';
  userEmail = '';
  userInitials = '';
currentSection: any;
redeemDto: RedeemCashSendDto = { provider: '', referenceNumber: '', pin: '' };
//redeemDto: any;
message: any;
success: any;

  constructor(
    private walletService: WalletService,
    private transactionService: TransactionService,
    private tokenService: TokenService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.loadUser();
    this.loadDashboard();
    this.loadWallet();
    this.loadTransactions();
  }
 

  // Wallet
  loadWallet() {
    this.http.get<any>('/api/wallet').subscribe(res => {
      this.balance = res.balance;
    });
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

  // Transactions
/*
  loadTransactions() {
    this.transactionService
      .getMyTransactions(this.page, this.pageSize)
      .subscribe(res => {
        this.transactions = res.items;
        this.total = res.totalCount;
        this.loading = false;
      });
  }
*/
  loadTransactions() {
    this.loading = true;
    this.http.get<any>(`/api/Transaction?page=${this.page}&pageSize=${this.pageSize}`).subscribe({
      next: (res) => {
        this.transactions = res.items;
        this.total = res.total;
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }



  redeemCash() {
    this.message = '';
    this.success = false;
    this.loading = true;

    this.http.post<any>(`${this.baseUrl}Redemption/redeem`, this.redeemDto).subscribe({
      next: (res) => {
        this.message = res.message;
        this.success = true;
        this.loading = false;

        this.loadWallet();

        this.redeemDto = { provider: '', referenceNumber: '', pin: '' };
      },
      error: (err) => {
        this.message = err.error?.error || 'Redemption failed!';
        this.success = false;
        this.loading = false;
      }
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
