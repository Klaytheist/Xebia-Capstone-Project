import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from 'src/app/user.service';
@Injectable({
  providedIn: 'root'
})
export class MerchantAuthGuard implements CanActivate  {
  constructor(private router:Router, private jwtHelper: JwtHelperService, private userService: UserService){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = localStorage.getItem("jwt");
    const role = localStorage.getItem("role");
    if (token && !this.jwtHelper.isTokenExpired(token) &&  ( role == '1' || role == '0')  ) {
      return true;
    }
    this.userService.logout();
    window.alert('Kindly log with an account having the required clearance')
    this.router.navigate(["/"]);
    return false;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate  {
  constructor(private router:Router, private jwtHelper: JwtHelperService, private userService: UserService){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = localStorage.getItem("jwt");
    const role = localStorage.getItem("role");
    if (token && !this.jwtHelper.isTokenExpired(token) &&  role == '0' ) {
      return true;
    }
    this.userService.logout();
    window.alert('Kindly log with an account having the required clearance')
    this.router.navigate(["/"]);
    return false;
  }
}

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate  {
  constructor(private router:Router, private jwtHelper: JwtHelperService, private userService: UserService){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = localStorage.getItem("jwt");
    const role = localStorage.getItem("role");
    if (token && !this.jwtHelper.isTokenExpired(token) &&  (role == '0' || role =='1' || role =='2') ) {
      return true;
    }
    this.userService.logout();
    window.alert('Kindly log with an account having the required clearance')
    this.router.navigate(["/"]);
    return false;
  }
}
