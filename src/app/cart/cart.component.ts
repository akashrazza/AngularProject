
import { Component, OnInit, Output,EventEmitter } from '@angular/core';

import { Cart } from '../Cart';
import { CartService } from '../services/cart.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private cartservice : CartService,private notificationservice : NotificationService) { }
  
  cart_arr:Cart[]=[];

  ngOnInit(): void {
    this.getAllCart();
  }
  
  getAllCart(){
    // this.cart_arr = this.cartservice.Get_Cart();
    this.cartservice.data$.subscribe((res)=>this.cart_arr=res)
    // console.log(this.cartservice.data$)
    
  }
  Remove_ele(id:any){
    this.cartservice.Delete(id)
    this.notificationservice.Show_notification("Product Deleted from Cart")
  }

}
