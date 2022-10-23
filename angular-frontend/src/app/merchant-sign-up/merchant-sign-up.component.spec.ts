import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantSignUpComponent } from './merchant-sign-up.component';

describe('MerchantSignUpComponent', () => {
  let component: MerchantSignUpComponent;
  let fixture: ComponentFixture<MerchantSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantSignUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
