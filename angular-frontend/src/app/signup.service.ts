import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Merchant, Signup } from 'src/Models/singup.model';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }
  getRequests() {
    return this.http.get<Merchant[]>('https://localhost:7170/api/Signup/merchant-request-emails');
  }

  approveRequest(signup: Signup) {
    this.http.post<any>('https://localhost:7170/api/SignUp', signup ).subscribe({
      next: (value: any) => {
        window.alert("Success");
        this.router.navigate(['/']);
      },
      error: (resp: HttpErrorResponse) => {
        console.log(resp);
      }
    });
  }
  removeRequest(email: string | null) {
    this.http.delete('https://localhost:7170/api/Signup/delete',  {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        name: email,
      },
    }).subscribe({
      next: (resp: any) => {
        console.log("Successful removal");
      },
      error: (err: HttpErrorResponse) => {
        console.log(err)
      }
    })
  }
}
