import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Cart } from 'src/Models/cart.model';
import { AddProduct } from 'src/Models/product.model';
import { CartService } from '../cart.service';
import { ProductService } from '../product.service';

interface Filter {
  greater: number,
  lesser: number
}

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.css']
})
export class ProductCategoriesComponent implements OnInit {

  filter: Filter  = {
    greater: 0,
    lesser: 999999
  }
  clone: AddProduct[] = [];
  search: AddProduct[] = [];
  searchObservable: Observable<AddProduct[]> | undefined;
  searchArgument: string | null | undefined;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService
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

  filterSubmit() {
    if (this.filter.greater === null) {
      this.filter.greater = 0;
    }

    if (this.filter.lesser === null) {
      this.filter.lesser = 999999;
    }
    var copy: AddProduct[] = [];
    this.clone.forEach(element => {
      console.log(element)
      if (element.price >= this.filter.greater && element.price <= this.filter.lesser){
        copy.push(element);
      }
    });
    this.search = copy;
  }

  ngOnInit(): void {

    const routeParams = this.route.snapshot.paramMap;
    this.searchArgument = routeParams.get('productCategory');
    this.searchObservable = this.productService.getByCategories(this.searchArgument);
    this.searchObservable.subscribe({
      next: (resp: any) => {
        this.search = this.clone = resp;
      }
    })
  }

  addToCart(product: AddProduct) {
    if (localStorage.getItem("email")) {
      const cart: Cart = {
        id: '00000000-0000-0000-0000-000000000000',
        productid: product.id,
        useremail: localStorage.getItem("email"),
        merchantemail: product.merchantemail,
        count: 1,
        productname: product.name,
        price: product.price
      }
      this.cartService.addToCart(cart);
      window.location.reload();
      console.log("added")
    } else {
      window.alert("Kindly log in")
    }
  }
}
