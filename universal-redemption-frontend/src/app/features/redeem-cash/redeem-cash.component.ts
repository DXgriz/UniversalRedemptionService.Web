import { Component } from '@angular/core';
import { HttpClient,} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../shared/components/footer/footer.component';

interface RedeemCashSendDto {
  provider: string;
  referenceNumber: string;
  pin: string;
}

@Component({
  standalone: true,
  selector: 'app-redeem-cash',
  imports: [FormsModule,FooterComponent,CommonModule],
  templateUrl: './redeem-cash.component.html',
  styleUrls: ['./redeem-cash.component.css']
})
export class RedeemCashComponent {
  redeemDto: RedeemCashSendDto = { provider: '', referenceNumber: '', pin: '' };
  message: string = '';
  success: boolean = false;
  loading: boolean = false;

  constructor(private http: HttpClient) {}

  redeemCash() {
    this.message = '';
    this.success = false;
    this.loading = true;

    this.http.post<any>('/api/redemption/redeem', this.redeemDto).subscribe({
      next: (res) => {
        this.message = res.message || 'Redeemed successfully!';
        this.success = true;
        this.loading = false;

        // Optionally reset form
        this.redeemDto = { provider: '', referenceNumber: '', pin: '' };
      },
      error: (err) => {
        this.message = err.error?.error || 'Redemption failed!';
        this.success = false;
        this.loading = false;
      }
    });
  }
}
