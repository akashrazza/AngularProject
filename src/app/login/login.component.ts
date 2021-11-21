import { Component, OnInit,ElementRef, ViewChild, Output  } from '@angular/core';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  Email_Input:string = "";
  Password_Input:string = "";
  constructor(private authservice : AuthenticationService, private router : Router) { 
    
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
      (data)=>{console.log(data);if(data.length==0){this.valid_user=false}else{
        localStorage.setItem("IsLogin","true");
        let ele:HTMLElement = document.getElementById('close_modal') as HTMLElement 
        ele.click();
        this.login_valid.emit("true");
        this.user_name.emit(data[0].first_name);
        this.router.navigate(['user'])};},
      (error)=>{console.log(error)}
    );
    
    
  }

}
