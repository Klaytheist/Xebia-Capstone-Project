import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthToken } from 'src/Models/AuthToken.model';
import { LoginModel } from 'src/Models/login.model';
import { LoginUserService } from '../login-user.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-merchant-login',
  templateUrl: './merchant-login.component.html',
  styleUrls: ['./merchant-login.component.css']
})
export class MerchantLoginComponent implements OnInit {

  constructor(
    private router: Router,
    private http: HttpClient,
    private userService: UserService,
    private loginService: LoginUserService
  ) { }
  invalidLogin: boolean | undefined;
  credentials: LoginModel = {
    email:'',
    password:'',
    role: '1'
  }
  ngOnInit(): void {
  }

  login = ( form: NgForm) => {
    if (form.valid) {
      this.http.post<AuthToken>("https://localhost:7170/api/Login/user", this.credentials, {
        headers: new HttpHeaders({ "Content-Type": "application/json"})
      })
      .subscribe({
        next: (response: AuthToken) => {
          const token = response.token;
          const role = response.user;
          localStorage.setItem("jwt", token);
          localStorage.setItem("role", role.role);
          localStorage.setItem("name", role.fname);
          localStorage.setItem("email", role.email);
          this.invalidLogin = false;
          this.loginService.change();
          this.loginService.login();
          this.router.navigate(["/home"]);
        },
        error: (err: HttpErrorResponse) => this.invalidLogin = true
      })
    }
  }

}
