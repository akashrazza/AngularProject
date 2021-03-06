
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Cart } from '../Cart';
import { CartService } from '../services/cart.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private router: Router, private cartservice: CartService, private notificationservice: NotificationService) { }

  cart_arr: Cart[] = [];

  ngOnInit(): void {
    this.getAllCart();
  }
  //Get Cart Item
  getAllCart() {
    this.cartservice.data$.subscribe((res) => this.cart_arr = res)
    this.cartservice.Get_Cart()
  }
  //Remove Item From cart
  Remove_ele(id: any) {
    this.cartservice.Delete(id)
    this.notificationservice.Show_notification("Product Deleted from Cart")
  }

  //Check For Checkbox checked
  nav() {
    var falg = false;
    for (var i = 0; i < this.cart_arr.length; i++) {
      if (this.cart_arr[i].checked == true) {
        falg = true
      }
    }
    if (falg) {
      let ele: HTMLElement = document.getElementById('close_modal_cart') as HTMLElement
      ele.click();
      this.router.navigate(['/checkout'], { queryParams: { data: JSON.stringify(this.cart_arr) } });
    }
    else {
      alert("Please Select any product in cart")
    }
  }

  //Increasing Counter when similar product added to cart
  convertcheckbox(id: number, eve: any, varianr_id: number) {
    for (let i = 0; i < this.cart_arr.length; i++) {
      if (this.cart_arr[i].id == id && this.cart_arr[i].variant_id == varianr_id) {
        this.cart_arr[i].checked = !this.cart_arr[i].checked;
        eve.target.checked = this.cart_arr[i].checked
      }
    }
  }

}
