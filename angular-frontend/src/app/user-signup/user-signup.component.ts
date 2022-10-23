import { HttpClient, HttpErrorResponse, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Signup } from 'src/Models/singup.model';


@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit {
  confpass:string = ''
  emailToggle = false;
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }
  credentials : Signup = {
    email:'',
    fname:'',
    lname:'',
    password:'',
    mobile: 0,
    role: '2'
  };
  ngOnInit(): void {
  }

  signUp() {
    this.http.post<any>('https://localhost:7170/api/SignUp', this.credentials ).subscribe({
      next: (value: any) => {
        this.emailToggle = false;
        window.alert("Success");
        this.router.navigate(['/']);
      },
      error: (resp: HttpErrorResponse) => {
        this.emailToggle = true;
      }
    });
  }
}
