import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthToken } from 'src/Models/AuthToken.model';
import { LoginModel } from 'src/Models/login.model';
import { LoginUserService } from '../login-user.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(
    private router: Router,
    private http: HttpClient,
    private userService: UserService,
    private loginService: LoginUserService
  ) { }
  invalidLogin: boolean | undefined;
  credentials = {
    email: localStorage.getItem("email"),
    oldpassword:'',
    newpassword: ''
  }
  ngOnInit(): void {
  }

  change = ( form: NgForm) => {
    if (form.valid) {
      this.http.put<AuthToken>("https://localhost:7170/api/User/update-password", this.credentials, {
        headers: new HttpHeaders({ "Content-Type": "application/json"})
      })
      .subscribe({
        next: (response: AuthToken) => {
          window.alert("Changed password");
          this.router.navigate(["/home"]);
        },
        error: (err: HttpErrorResponse) => this.invalidLogin = true
      })
    }
  }

}
