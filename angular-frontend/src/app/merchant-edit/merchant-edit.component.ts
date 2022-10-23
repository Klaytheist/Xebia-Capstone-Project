import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AddProduct } from 'src/Models/product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-merchant-edit',
  templateUrl: './merchant-edit.component.html',
  styleUrls: ['./merchant-edit.component.css']
})
export class MerchantEditComponent implements OnInit {

  details: AddProduct = {
    name:'',
    brand:'',
    description: '',
    image:'',
    merchantemail: '',
    unitsold: 0,
    id: '00000000-0000-0000-0000-000000000000',
    category: '',
    price: 0
  };

  constructor(
    private http: HttpClient,
    private productService: ProductService,
    private route: ActivatedRoute
  ) { }
  imgUrl: string | undefined;
  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = routeParams.get('productId');

    this.productService.getProducts().subscribe({
      next: (resp: AddProduct[]) => {
        resp.forEach(element => {
          if(productIdFromRoute == element.id) {
            this.details = element;
          }
        });
      },
      error: (error: HttpErrorResponse) => {
        console.log(error)
      }
    })
  }

  onSelectImage(event:any) {
      if(event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.details.image = event.target.result;
      }
    }
  }

  submit(form: NgForm) {
    this.details.merchantemail = localStorage.getItem("email");
    this.http.put('https://localhost:7170/api/Product/update', this.details).subscribe({
      next: (response: any) => {
        window.alert('product added');
        window.open("/home", "_self")
      },
      error: (err: HttpErrorResponse) => {
        window.alert('Product already exists');
      }
    })
  }

}
