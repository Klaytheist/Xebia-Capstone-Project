import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AddProduct } from 'src/Models/product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: AddProduct[] = [];
  productObservable: Observable<AddProduct[]> | undefined;
  constructor(
    private productService: ProductService
  ) { }
  pagination = {
    page: 1,
    pageSize:6
  };
  rating = {
    selected: 0,
    hovered: 0,
    readonly: true,
    rate: 3,
    max:5
  };
  ngOnInit(): void {
    this.productObservable = this.productService.getProducts();
    this.productObservable.subscribe({
      next: (resp: any) => {
        this.products = resp;
      }
    })
  }

}
