import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cart } from '../Cart';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private cartservice : CartService,private activateroute:ActivatedRoute) { }
  arr: Cart[]=[]
  sum=0
  quantity=0
  ngOnInit(): void {
    this.activateroute.queryParams.subscribe((param)=>{
      // console.log(JSON.parse(param.data));
      this.arr=JSON.parse(param.data);
      for (let i=0;i<this.arr.length;i++){
        if(this.arr[i].checked){
          this.sum=this.sum+this.arr[i].price;
          this.quantity++;
        }
      }
      
    })
    
  }
  total(){
    
  }

}
