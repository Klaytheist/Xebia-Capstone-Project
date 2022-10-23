import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from 'src/Models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private http:HttpClient
  ) { }

  addToCart(cart: Cart) {
    this.http.post('https://localhost:7170/api/Cart/post', cart).subscribe({
      next:(resp: any) => {
        window.alert("added to cart")
        return resp
      },
      error:(err: HttpErrorResponse) => {
        window.alert(err)
      }
    })
  }

  removeById(id: string) {
    this.http.delete('https://localhost:7170/api/Cart/delete-product', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        name: id
      },
    }).subscribe({
      next: (val:any) => {
        console.log("deleted");
      },
      error: (err:HttpErrorResponse) => {
        console.log("Something went wrong");
      }
    });
  }

  getFromCart() {
    return this.http.post<Cart[]>('https://localhost:7170/api/Cart/get', {name: localStorage.getItem("email")})
  }

  deleteFromCart() {
    this.http.delete('https://localhost:7170/api/Cart/delete', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        name: localStorage.getItem("email"),
      },
    }).subscribe({
      next: (val:any) => {
        console.log("deleted");
      },
      error: (err:HttpErrorResponse) => {
        console.log("Something went wrong");
      }
    });
  }
}
