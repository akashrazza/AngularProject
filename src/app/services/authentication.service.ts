import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../User';
import { CartService } from './cart.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  arr_user :User[]=[];
  constructor(private http : HttpClient,private cartservice:CartService) { }
  url : string = "http://localhost:3000/user"
  Login(email:string,password:string):Observable<any>{
    
    var custom_url = this.url+"?email="+email+"&password="+password;
    return this.http.get(custom_url)
  }

  Logout(){
    localStorage.setItem("IsLogin","false");
    this.cartservice.delet_all();
  }
}
