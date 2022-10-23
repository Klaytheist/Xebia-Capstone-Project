import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from 'src/Models/address.model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(
    private http: HttpClient
  ) { }

  getAddress() {
    return this.http.post<Address[]>('https://localhost:7170/api/Address/get', {
      name: localStorage.getItem('email')
    });
  }

  addAddress(addr: Address) {
    this.http.post<any>('https://localhost:7170/api/Address/post', addr).subscribe({
      next:(resp: any) => {
        window.alert("Shipping address saved");
        console.log("Done")
      },
      error:(err: HttpErrorResponse) => {
        console.log(err);
      }
    })
  }
}
