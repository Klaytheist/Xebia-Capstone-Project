import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Merchant } from 'src/Models/singup.model';

@Component({
  selector: 'app-merchant-sign-up',
  templateUrl: './merchant-sign-up.component.html',
  styleUrls: ['./merchant-sign-up.component.css']
})
export class MerchantSignUpComponent implements OnInit {
  confpass:string = ''
  emailToggle = false;
  emails: string[] = [];
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }
  credentials : Merchant = {
    email:'',
    fname:'',
    lname:'',
    password:'',
    mobile: 0,
  };
  ngOnInit(): void {
  }

  signUp() {
    this.http.get<string[]>('https://localhost:7170/api/SignUp/merchant-request-emails').subscribe({
      next: (value: any) => {
        this.emails = value;
        console.log(this.emails);
      }
    })
    if (this.emails.includes(this.credentials.email)){
      this.emailToggle = true;
    } else {
      this.http.post<any>('https://localhost:7170/api/SignUp/merchant-request', this.credentials ).subscribe({
      next: (value: any) => {
        this.emailToggle = false;
        window.alert("Your request has been sent to the administrator");
        this.router.navigate(['/']);
      },
      error:(resp: HttpErrorResponse) => {
        window.alert("A request already made for this email. Try logging in or kindly wait for the administrator to approve.")
      }
    });
    }
  }
}
