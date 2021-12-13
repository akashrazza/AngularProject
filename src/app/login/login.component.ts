import { Component, OnInit,ElementRef, ViewChild, Output  } from '@angular/core';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { FormControl,Validators,FormGroup } from '@angular/forms';
import { CartService } from '../services/cart.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  Email_Input:string = "";
  Password_Input:string = "";
  new_password_cnfrm:boolean = false;
  // submited=false;
  login_page=true;
  forget_password_page = false;

  ForgetPasswordEvent(){
    this.login_page=false;
    this.forget_password_page=true;
  }
  constructor(private authservice : AuthenticationService, private router : Router,private cartservice : CartService) { 
    
  }
  
  ngOnInit(): void {
  }

  @Output() login_valid = new EventEmitter;
  @Output() user_name = new EventEmitter;
  valid_user : boolean|undefined = undefined;
  valid_email=false;
  Validate_Email(){
    let pattern=/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    this.valid_email = pattern.test(String(this.Email_Input).toLowerCase());
    
  }
  
  Validate_user(){
    
    this.authservice.Login(this.Email_Input,this.Password_Input).subscribe(
      (data)=>{
        if(data.length==0){
          this.valid_user=false
        }
        else{
        localStorage.setItem("IsLogin","true");
        localStorage.setItem("role",data[0].role);
        this.Email_Input="";
        this.Password_Input="";
        this.valid_user=undefined;
        this.valid_email=false;
        localStorage.setItem("user_details",data[0].id)
        let ele:HTMLElement = document.getElementById('close_modal') as HTMLElement 
        ele.click();
        this.login_valid.emit("true");
        this.user_name.emit(data[0].first_name);
        this.cartservice.Get_Cart();
        this.router.navigate(['product'])};},
      (error)=>{console.log(error)}
    );
    
    
  }
  close(){
    this.Email_Input="";
    this.Password_Input="";
    this.valid_user=undefined;
    this.valid_email=false;
    this.login_page=true;
    this.forget_password_page=false;
    let ele:HTMLElement = document.getElementById('close_modal') as HTMLElement 
    ele.click();
  }
//Forget password


 //Change Password

 
}
