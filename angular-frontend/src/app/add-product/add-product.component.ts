import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AddProduct } from 'src/Models/product.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
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
    private http: HttpClient
  ) { }
  imgUrl: string | undefined;
  ngOnInit(): void {
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
    this.http.post('https://localhost:7170/api/Product', this.details).subscribe({
      next: (response: any) => {
        window.alert('product added');
        window.location.reload();
      },
      error: (err: HttpErrorResponse) => {
        window.alert('Product already exists');
      }
    })
  }

}
