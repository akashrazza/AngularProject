import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, } from '@angular/forms';
import { FormControl,Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../User';
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css','../login/login.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  @Input() close = ()=>{console.log("1")};
  ForgetPassword_page = true;
  Verification_done = false;
  constructor(private userservice : UserService) { }
  forget_submitted : boolean = false;
  ForgetPasswordForm = new FormGroup({
    question : new FormControl("",[Validators.required]),
    answer : new FormControl("",[Validators.required]),
    DOB : new FormControl('',[Validators.required]),
    email : new FormControl('',[Validators.required,Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)])
  })

SecurityQuestion = [
  "What is your first mobile phone company?",
  "What is your first Bike Company Name?",
  "What is your favorate food?",
  "What is your Secrate name?",
]

  get g() { return this.ForgetPasswordForm.controls; }
  User_details : any={};
  CredentialNotMatch = false;
  check_forgetpassowrd(){
    this.forget_submitted=true;
    if(this.ForgetPasswordForm.invalid){
        return
    }
    console.log(this.ForgetPasswordForm)
    this.userservice.VerifyUserCredential(this.ForgetPasswordForm.value.email,this.ForgetPasswordForm.value.question,this.ForgetPasswordForm.value.answer,this.ForgetPasswordForm.value.DOB).subscribe(
      (data)=>{
        if(data.length!=0){
          this.User_details = data[0]
          this.ForgetPassword_page=false;
          this.Verification_done=true;
          this.forget_submitted=false;
          this.CredentialNotMatch=false;
        }
        else{
          this.CredentialNotMatch=true;
        }
      },
      (error)=>{console.log(error)}
    )
    
    
  }
  ngOnInit(): void {
  }

  new_password_form = new FormGroup({
    password : new FormControl("",Validators.required)
  })
  
  get f() { return this.new_password_form.controls; }
  New_Password_Submit(){
    this.forget_submitted=true
    if(this.new_password_form.invalid){
      return
    }
    this.User_details.password = this.new_password_form.value.password
    this.userservice.SetPassword(this.User_details,this.User_details.id).subscribe(
      (data)=>{
        this.forget_submitted=false;
        let ele:HTMLElement = document.getElementById('close_modal') as HTMLElement 
        ele.click();
      },
      (err)=>{console.log(err)}
    )
    
  }
}
