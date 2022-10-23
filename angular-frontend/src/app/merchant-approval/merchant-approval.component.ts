import { Component, OnInit, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Merchant, Signup } from 'src/Models/singup.model';
import { SignupService } from '../signup.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'ngbd-table-filtering',
  templateUrl: './merchant-approval.component.html',
  styleUrls: ['./merchant-approval.component.css']
})
export class MerchantApprovalComponent implements OnInit {
  requestsList:Merchant[]  = []

  constructor(
    private signupService: SignupService
  ) {

  }
  ngOnInit(): void {
    var request = this.signupService.getRequests();
    request.subscribe({
      next:(value: Merchant[]) => {
        this.requestsList = value;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    });
  }

  approve(request: Merchant) {
    const approve: Signup = {
      fname: request.fname,
      lname: request.lname,
      email: request.email,
      password: request.password,
      mobile: request.mobile,
      role: '1'
    }
    console.log(approve)
    this.signupService.approveRequest(approve);
    this.signupService.removeRequest(request.email);
    this.ngOnInit();
    this.ngOnInit();
  }

  deny(request: Merchant) {
    this.signupService.removeRequest(request.email);
    this.ngOnInit();
    this.ngOnInit();
  }
}
