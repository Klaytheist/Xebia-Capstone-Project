import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, map, Observable, OperatorFunction } from 'rxjs';
import { AddProduct } from 'src/Models/product.model';
import { CartService } from './cart.service';
import { LoginUserService } from './login-user.service';
import { ProductService } from './product.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  count = 0;
  productsList: AddProduct[] = [];

  constructor(
    private userService: UserService,
    private loginService:LoginUserService,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  public model: any = ''
  products: string[] = []
  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.products.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );

  title = 'angular-frontend';
  user = this.userService.user;
  guest = this.userService.guest;
  admin = this.userService.admin;
  merchant = this.userService.merchant;
  name = this.userService.name
  ngOnInit(): void {

      this.cartService.getFromCart().subscribe({
        next:(resp: any) => {
          this.count = resp.length;
        }
      })

      this.productService.getNames().subscribe({
        next: (resp: any) => {
          this.products = resp
        }
      })

      this.loginService.emitter.subscribe(() => {
      this.user = this.loginService.user;
      this.guest = this.loginService.guest;
      this.admin = this.loginService.admin;
      this.merchant = this.loginService.merchant;
      this.name = this.loginService.name
    });

    this.userService.emitter.subscribe(() => {
      this.user = this.userService.user;
      this.guest = this.userService.guest;
      this.admin = this.userService.admin;
      this.merchant = this.userService.merchant;
      this.name = this.userService.name
    });

    this.userService.change();
    this.user = this.userService.user;
    this.guest = this.userService.guest;
    this.admin = this.userService.admin;
    this.merchant = this.userService.merchant;
    this.name = this.userService.name

  }

  logout() {
    this.userService.logout();
  }

  find(model: any) {
    window.open("/products/search/"+model,'_self')
  }
}
