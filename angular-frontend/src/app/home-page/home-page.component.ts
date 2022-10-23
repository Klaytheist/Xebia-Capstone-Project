import { Component, OnInit } from '@angular/core';
import { AddProduct } from 'src/Models/product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  productsList: AddProduct[] = [];

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (resp: any) => {
        resp.sort((a:AddProduct,b:AddProduct)=>(a.unitsold > b.unitsold)? -1: 1);
        this.productsList = resp;
        console.log(this.productsList);
      }
    });
  }

}
