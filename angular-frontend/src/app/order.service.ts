import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgbTypeaheadWindow } from '@ng-bootstrap/ng-bootstrap/typeahead/typeahead-window';
import { defaultThrottleConfig } from 'rxjs/internal/operators/throttle';
import { Orders } from 'src/Models/orders.models';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient
  ) { }

  addOrder(orders: Orders) {
    this.http.post('https://localhost:7170/api/Order/post',orders).subscribe({
      next: () => {
        console.log('added a product')
      },
      error: (err:HttpErrorResponse) => {
        console.log(err)
      }
    })
  }

  getOrders() {
    return this.http.post('https://localhost:7170/api/Order/get', {name: localStorage.getItem("email")});
  }

  getAllOrders() {
    return this.http.get<Orders[]>('https://localhost:7170/api/Order/get');
  }

  filter(greater: string | undefined, lesser: string | undefined) {
    return this.http.post<Orders[]>('https://localhost:7170/api/Order/filter', {greater: greater, lesser: lesser});
  }
  updateOrder(id: string) {
    this.http.put('https://localhost:7170/api/Order/put', {name: id}).subscribe({
      next: (resp: any) => {
        window.location.reload();
      }
    })
  }
}
