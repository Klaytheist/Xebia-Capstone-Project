import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cart } from 'src/Models/cart.model';
import { AddProduct } from 'src/Models/product.model';
import { CartService } from '../cart.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  quantity = 1;
  products: AddProduct[] = []
  product: AddProduct = {
    name: '',
    description: '',
    brand: '',
    image: '',
    merchantemail: '',
    unitsold: 0,
    id: '',
    category: '',
    price: 0
  }
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {

    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = routeParams.get('productId');


    this.productService.getProducts().subscribe({
      next: (value: AddProduct[]) => {
        value.forEach(element => {
          if(element.id == productIdFromRoute) {
            this.product = element
          } else {
            this.products.push(element)
          }
        });
      }
    });

    console.log(this.product)
  }
  refresh(event: string) {
    window.open("/products/open/"+event,"_self")
  }

  addToCart() {
    const cart: Cart = {
      id: '00000000-0000-0000-0000-000000000000',
      productid: this.product.id,
      useremail: localStorage.getItem("email"),
      merchantemail: this.product.merchantemail,
      count: this.quantity,
      productname: this.product.name,
      price: this.product.price
    }
    this.cartService.addToCart(cart);
    window.location.reload();
    console.log("added")
  }

}
