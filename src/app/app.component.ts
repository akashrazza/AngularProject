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
  role:any=localStorage.getItem('role')
  user_name:string="";

  constructor(private tostarservice:ToastrService,private authservice : AuthenticationService , private router : Router,private cartservice : CartService,private childComponent: ProductService){}

  ngOnInit(){
    // this.tostarservice.info("Product Added to Cart");
    this.cartservice.data$.subscribe((res)=>{this.count=res.length});
  }
  
  //GET all child data from chikd Login Component
  get_child(ele:string){
    this.isLogin=ele=='true'?false:true;
    this.role=localStorage.getItem('role')
  }

  //Click Logout Evevnt
  LogOut_event(){
    this.isLogin=true;
    this.authservice.Logout();
    this.tostarservice.info("Logged Out Successfully");
    this.user_name="";
    this.router.navigate(['home']);
  }

  //Update cart count
  update_count(c:number){
    this.count=c;
  }

  //Check for login
  ngDoCheck(){
    if(localStorage.getItem('IsLogin')=='true'){
      this.isLogin=false;
    }
  }
  
  //Get User name from Child Login Component
  get_user(user:string){
    this.user_name=user;
    // console.log(user)
  }

}
