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
    mobile_no: new FormControl(),
    email: new FormControl('', [Validators.required,Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)]),
    password: new FormControl()
  })

  ngOnInit(): void {
  }
  get f() { return this.signupform.controls; }
  onSubmit(){
    this.submitted=true;
    if (this.signupform.invalid) {
      return;
    }
    this.userservice.postdata(this.signupform.value).subscribe((data)=>{
      let ele:HTMLElement = document.getElementById('close_modal_signup') as HTMLElement 
      ele.click();
    },(error)=>{console.log(error)});
    
  }
}
