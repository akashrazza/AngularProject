import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cart } from '../Cart';
import { AddressService } from '../services/address.service';
import { CartService } from '../services/cart.service';
import { PaymentService } from '../services/payment.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private tostarservice: ToastrService, private addressservice: AddressService, private cartservice: CartService, private activateroute: ActivatedRoute, private router: Router, private paymentservice: PaymentService) { }
  arr: Cart[] = []
  sum = 0
  quantity = 0
  RadioAddressSelected = -1;
  submitted = false;
  products_arr: any[] = []
  AddressForUser: any = [];
  //Address Form 
  AddressForm = new FormGroup({
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    information: new FormControl('', Validators.required),
  })

  //Getting Control of Address form
  get g() { return this.AddressForm.controls; }
  
  ngOnInit(): void {
    this.activateroute.queryParams.subscribe((param) => {
      this.arr = JSON.parse(param.data);
      this.sum = 0
      this.quantity = 0
      for (let i = 0; i < this.arr.length; i++) {
        if (this.arr[i].checked) {
          this.products_arr.push([this.arr[i].id,this.arr[i].quantity,this.arr[i].price * this.arr[i].quantity])
          this.sum = this.sum + this.arr[i].price * this.arr[i].quantity;
          this.quantity = this.quantity + this.arr[i].quantity;
        }
      }
    })
    this.GetAllAddress();
  }

  //Get All Adrees 
  GetAllAddress() {
    this.addressservice.getAddressByUser(localStorage.getItem('user_details')).subscribe(data => {
      this.AddressForUser = data;
    }, (err) => {
      console.log(err);
    })
  }

  //CheckBox Event 
  CheckoutEvent() {
    if (this.sum == 0 || (this.RadioAddressSelected == -1 && !this.AddressForm.valid)) {
      alert("Please Fill Address or Select Your Provious Address")
      this.submitted = true;
      return
    }
    if (this.RadioAddressSelected == -1) {

      this.addressservice.CreateAddress({ ...this.AddressForm.value, userId: localStorage.getItem('user_details') }).subscribe(
        data => {
          this.RadioAddressSelected = data.id;
          this.paymentservice.AddPaymetDetails({ amount: this.sum, address: { ...this.AddressForm.value }, products: this.products_arr });
          this.router.navigate(['pay']);
        }, err => {
          console.log(err)
        }
      )


    }
    else {
      console.log(this.AddressForUser[this.RadioAddressSelected])
      this.paymentservice.AddPaymetDetails({ amount: this.sum, address: { ...this.AddressForUser[this.RadioAddressSelected] }, products: this.products_arr });
      this.router.navigate(['pay']);
    }
  }

  //Delete Address
  DeleteAddress(id: any) {
    this.addressservice.DeleteAddressByUser(id).subscribe(data => {
      this.tostarservice.info("Deleted Successfully");
      this.GetAllAddress()
    }, err => {
      console.log(err);
    })
  }
}
