import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantApprovalComponent } from './merchant-approval.component';

describe('MerchantApprovalComponent', () => {
  let component: MerchantApprovalComponent;
  let fixture: ComponentFixture<MerchantApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantApprovalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
