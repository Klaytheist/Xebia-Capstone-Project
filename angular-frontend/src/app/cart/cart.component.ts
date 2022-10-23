import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Address } from 'src/Models/address.model';
import { Cart } from 'src/Models/cart.model';
import { Orders } from 'src/Models/orders.models';
import { AddressService } from '../address.service';
import { CartService } from '../cart.service';
import { OrderService } from '../order.service';
import { ProductService } from '../product.service';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  checkStatus: any;
  cartItems: Cart[] = [];
  cost: number = 0;
  buttonToggle:boolean = true;
  address: string = '';
  zip: number = 0;

  validation: Address = {
    fname:'',
    lname:'',
    shipemail: '',
    email: localStorage.getItem("email"),
    address1:'',
    address2: '',
    country:'',
    state:'',
    zip:''
  };
  rest = {
    nameoncard: '',
    cardno: '',
    cvv: ''
  }
  open() {
    console.log(this.checkStatus);
  }
  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private productService: ProductService,
    private addressService: AddressService,
    private router: Router,
    private ngbCalendar: NgbCalendar
  ) { }

    updatePrice(cart: Cart) {
      if (cart.count == 0) {
        this.cartService.removeById(cart.id);
        window.location.reload();
      }
      this.total();
    }

  ngOnInit(): void {
    this.addressService.getAddress().subscribe({
      next: (resp:Address[]) => {
        if(resp.length != 0) {
        this.validation = resp[0];
        }
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    })
    this.cartService.getFromCart().subscribe({
      next: (resp: Cart[]) => {
        this.cartItems = resp;
        this.total();
      },
      error: (err:HttpErrorResponse) => {
        window.alert("Something went wrong");
      }
    })
  }

  total() {
    this.cost = 0;
    this.cartItems.forEach(element => {
      this.cost += (element.count * element.price)
    });
    this.buttonToggle = false;
  }

  submit(loginForm: NgForm) {
    const today = this.ngbCalendar.getToday();
    const date = today.year.toString()+'-'+today.month.toString()+'-'+today.day.toString();
    this.cartItems.forEach(element => {
      var orders: Orders = {
        id: '00000000-0000-0000-0000-000000000000',
        productname: element.productname,
        count: element.count,
        price: element.price,
        useremail: element.useremail,
        address: this.validation.address1,
        zip: Number(this.validation.zip),
        merchantemail: element.merchantemail,
        orderdate: date,
        state: '0',
        status: 'On the way'
      }
      this.orderService.addOrder(orders);
      this.productService.updateProductCount(element.productname,element.merchantemail, element.count)
    });
    this.validation.zip = this.validation.zip.toString();
    if (this.checkStatus) {
      this.addressService.addAddress(this.validation);
    }
    this.cartService.deleteFromCart();
    window.open('/home','_self');
    window.alert('Product purchased');
  }
  redeemStatus = false;
  redeemed: number = 0;
  redeemValue:string | undefined;
  redeemStatus1 = true;
  redeem() {
    if(this.redeemValue?.toLowerCase() == 'yes') {
      this.cartItems.forEach(element => {
        element.price = Math.round(element.price - (element.price* 0.40));
      });
      this.total();
      this.redeemStatus = true;
      this.redeemStatus1 = false;
    }
  }

}
