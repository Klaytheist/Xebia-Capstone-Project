import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Signup } from 'src/Models/singup.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  emitter = new EventEmitter();

  user = false;
  guest = false;
  admin = false;
  merchant = false;
  name: string | undefined | null;

  change(): void {
    if (localStorage.getItem("role") == "2") {
      this.user = true;
      this.name = localStorage.getItem("name");
      this.guest = this.admin = this.merchant = false;
      console.log(this.user);
    } else if (localStorage.getItem("role") == "1") {
      this.merchant = true;
      this.name = localStorage.getItem("name");
      this.guest = this.admin = this.user = false;
    } else if(localStorage.getItem("role") == "0") {
      this.admin = true;
      this.name = localStorage.getItem("name");
      this.guest = this.merchant = this.user = false;
    } else {
      this.guest = true;
      this.name = "Guest";
      this.admin = this.merchant = this.user = false;
    }
  }

  logout() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    this.change();
    this.router.navigate(["/home"])
    this.emitter.emit();
  }

  login() {
    this.change();
    this.emitter.emit();
  }

  getUsers() {
    return this.http.get<Signup[]>('https://localhost:7170/api/User/get-users');
  }

  deleteUsers(email: string) {
    this.http.delete('https://localhost:7170/api/User/delete', {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        body: {
          name: email,
        },
      }).subscribe({
        next: (val:any) => {
          window.location.reload();
        },
        error: (err:HttpErrorResponse) => {
          console.log("Something went wrong");
        }
      });
  }

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }
}
