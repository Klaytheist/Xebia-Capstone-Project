import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddProduct } from 'src/Models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  emitter = new EventEmitter();
  products: Observable<AddProduct[]> | undefined;
  constructor(
    private http: HttpClient
  ) { }

  getProductsCount() {
    return this.http.get('https://localhost:7170/api/Product/get-count');
  }

  getProducts() {
    this.products = this.http.get<AddProduct[]>('https://localhost:7170/api/Product/fetch-products');
    return this.products
  }

  getNames() {
    return this.http.get<string[]>('https://localhost:7170/api/Product');
  }
  getByNames(name: string | null) {
    return this.http.post<AddProduct[]>('https://localhost:7170/api/Product/fetch-products-by-name', {name: name});
  }

  getByCategories(name: string | null) {
    return this.http.post<AddProduct[]>('https://localhost:7170/api/Product/fetch-products-by-category', {name: name});
  }
  updateProductCount(name: string, email:string | null, count: number) {
    this.http.put('https://localhost:7170/api/Product/update-count',{productname: name, email:email, count: count}).subscribe({
      next:(res: any) => {
        console.log('Units sold updated for '+name+email);
      },
      error: (err:HttpErrorResponse) => {
        console.log("Something went wrong")
      }
    })
  }
    deleteProduct(productId: string) {
      this.http.delete('https://localhost:7170/api/Product/delete', {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        body: {
          name: productId,
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
  }
