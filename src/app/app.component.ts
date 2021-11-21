import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { CartService } from './services/cart.service';

import { ContentChild } from '@angular/core';
import { ProductService } from './services/product.service';
import { ToastrService } from 'ngx-toastr';
@ContentChild(ProductService)

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RouteDemo';
  isLogin = true;
  count:number=0
  constructor(private tostarservice:ToastrService,private authservice : AuthenticationService , private router : Router,private cartservice : CartService,private childComponent: ProductService){}
  ngOnInit(){
    // this.tostarservice.info("Product Added to Cart");
    this.cartservice.data$.subscribe((res)=>{this.count=res.length});
  }
  
  get_child(ele:string){
    this.isLogin=ele=='true'?false:true;
  }
  LogOut_event(){
    this.isLogin=true;
    this.authservice.Logout();
    this.tostarservice.info("Logged Out Successfully");
    this.user_name="";
    this.router.navigate(['home']);
  }
  update_count(c:number){
    this.count=c;
  }
  user_name:string="";
  get_user(user:string){
    this.user_name=user;
    // console.log(user)
  }

}
