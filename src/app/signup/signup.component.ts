import { Component, OnInit } from '@angular/core';
import { FormGroup, } from '@angular/forms';
import { FormControl,Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userservice : UserService) { }
  submitted=false
  signupform = new FormGroup({
    // id:new FormControl(),
    first_name:new FormControl(),
    last_name: new FormControl(),
    city: new FormControl(),
    mobile_no: new FormControl('',[Validators.required,Validators.minLength(10),Validators.pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)]),
    email: new FormControl('', [Validators.required,Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)]),
    password: new FormControl('',[Validators.required]),
    // confirm_password : new FormControl('',[Validators.required,this.checkpassword()]),

    
  })
checkpassword():any{
  if(this.signupform.get('password')==this.signupform.get('confirm_passowrd'))
  return true;
  else return false;
}
  SecurityForm = new FormGroup({
    question : new FormControl("",[Validators.required]),
    answer : new FormControl("",[Validators.required]),
    DOB : new FormControl('',[Validators.required])
  })

  SignupPage=true;
  SecurityPage=false;
  SecurityQuestion = [
    "What is your first mobile phone company?",
    "What is your first Bike Company Name?",
    "What is your favorate food?",
    "What is your Secrate name?",
  ]
  ngOnInit(): void {
  }
  duplicate_email:boolean=false;
  get f() { console.log(this.signupform.controls);return this.signupform.controls; }
  get g() { return this.SecurityForm.controls; }
  NextButton(){
    if(this.signupform.invalid){
      this.submitted=true;
      return
    }
    this.userservice.getuser().subscribe((data)=>{
      // if(this.signupform)
      this.duplicate_email=false
      for (let i=0;i<data.length;i++){
        if(this.signupform.value.email==data[i].email){
          this.duplicate_email=true
          return
        }
      }
      
      if(this.duplicate_email==false){
        this.SignupPage=false;
        this.SecurityPage=true;
        this.submitted=false
      }
      // console.log(this.signupform.value.email)
    })
    
    
  }
  // security_submitted=false
  onSubmit(){
    this.submitted=true;
    // this.security_submitted=false
    // console.log(this.signupform.value)
    if (this.signupform.invalid) {
      return;
    }
    if(this.SecurityForm.invalid){
      return;
    }
    
        this.userservice.postdata({...this.signupform.value,...this.SecurityForm.value}).subscribe((data)=>{
          this.signupform.reset();
          this.submitted=false;
          // this.security_submitted=false;
          let ele:HTMLElement = document.getElementById('close_modal_signup') as HTMLElement 
          ele.click();
          this.duplicate_email=false
        },(error)=>{console.log(error)});
      
    
    
  }
  close(){
    this.signupform.reset();
      this.submitted=false;
      this.duplicate_email=false;
      let ele:HTMLElement = document.getElementById('close_modal_signup') as HTMLElement 
      ele.click();
  }
}
