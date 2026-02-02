import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedeemCashComponent } from './redeem-cash.component';

describe('RedeemCashComponent', () => {
  let component: RedeemCashComponent;
  let fixture: ComponentFixture<RedeemCashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RedeemCashComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedeemCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
