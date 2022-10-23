import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Orders } from 'src/Models/orders.models';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  isAdmin() {
    return localStorage.getItem("role") =='0';
  }

  isUser() {
    return localStorage.getItem("role") =='2';
  }

  isMerchant() {
    return localStorage.getItem("role") =='1';
  }

  ordersList: Orders[] = [];

  greater: string = '';
  lesser: string = '';

  constructor(
    private orderService: OrderService
  ) { }

  update(id: string) {
    this.orderService.updateOrder(id);
  }

  filter() {
    if(this.greater == '') {
      this.greater = '1971-01-01'
    }
    if(this.lesser == '') {
      this.lesser = '2071-01-01'
    }
    this.ordersList = [];
    console.log(this.greater+' '+this.lesser)
    this.orderService.filter(this.greater, this.lesser).subscribe({
      next: (resp: Orders[]) => {
        console.log(resp)
        if(this.isAdmin()) {
          this.ordersList = resp;
        } else if(this.isMerchant()) {
          resp.forEach(element => {
            if(element.merchantemail == localStorage.getItem("email")) {
              this.ordersList.push(element);
            }
              });
              } else {
                resp.forEach(element => {
                  if (element.useremail == localStorage.getItem("email")) {
                    this.ordersList.push(element);
                  }
          });
        }
        console.log(this.ordersList);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err)
      }
    })
  }

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe({
      next: (resp: Orders[]) => {
         console.log(resp)
        if(this.isAdmin()) {
          this.ordersList = resp;
        } else if(this.isMerchant()) {
          resp.forEach(element => {
            if(element.merchantemail == localStorage.getItem("email")) {
              this.ordersList.push(element);
            }
              });
              } else {
                resp.forEach(element => {
                  if (element.useremail == localStorage.getItem("email")) {
                    this.ordersList.push(element);
                  }
          });
        }
         console.log(this.ordersList);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err)
      }
    })
  }

}
