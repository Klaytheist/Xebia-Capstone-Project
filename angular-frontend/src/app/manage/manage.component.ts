import { Component, OnInit } from '@angular/core';
import { Merchant, Signup } from 'src/Models/singup.model';
import { HttpErrorResponse } from '@angular/common/http';
import { AddProduct } from 'src/Models/product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  productsList:AddProduct[]  = [];
  clone:AddProduct[] = [];
  filter(name: string) {
    if (!(name == undefined)) {
      this.productsList = [];
    this.clone.forEach(element => {
      if (element.name.toLowerCase().includes(this.filtername.toLowerCase())) {
        this.productsList.push(element);
      }
    });
    }
  }

  filtername: string = '';

  roleAdmin() {
    return localStorage.getItem('role') == '0';
  }
  constructor(
    private productService: ProductService
  ) {

  }
  ngOnInit(): void {
    var request = this.productService.getProducts();
    request.subscribe({
      next:(value: AddProduct[]) => {
        if(this.roleAdmin()) {
          this.productsList = value;
          this.clone = value;
        } else {
          value.forEach(element => {
            if (element.merchantemail == localStorage.getItem("email")) {
              this.productsList.push(element);
              this.clone.push(element);
            }
          });
        }
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    });
  }

  remove(request: string) {
    this.productService.deleteProduct(request);
  }

}
