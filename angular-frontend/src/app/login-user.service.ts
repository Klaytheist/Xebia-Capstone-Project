import { ChangeDetectionStrategy, Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LoginUserService {

  emitter = new EventEmitter();
  user = false;
  guest = false;
  admin = false;
  merchant = false;
  name: string | undefined | null;

  constructor(
    private router: Router
  ) { }

  login() {
    this.emitter.emit();
  }

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
}
