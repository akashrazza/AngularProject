import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http : HttpClient) { }

  url  = "https://shopbackend-v4n9.onrender.com/user";

  //Get All uSer
  getuser():Observable<any>{
    var url = this.url + '/getAll';
    return this.http.get(url)
  }
  
  //Create USer
  postdata(user_obj : User):Observable<any>{
    var header = {'content-type' : 'application/json'}
    user_obj.role="user";
    let body  = JSON.stringify(user_obj);
    var url = this.url + '/signup';
    return this.http.post(url,body,{'headers':header,responseType:'text'}) 
  }

  //Get USer By ID ADmin
  Get_by_id(id:number):Observable<any>{
    return this.http.get(this.url+"/getById?id="+id)
  }

  //GEt user by name Admin
  Get_by_name(name:string):Observable<any>{
    return this.http.get(this.url+"/getByName?first_name="+name)
  }

  //Delete A user for Amdin
  delete ( id:number):Observable<any>{
    let custom_url = this.url+"/deleteuser/"+id;
    return this.http.delete(custom_url);
  }

  //Verify When Forget Password
  VerifyUserCredential(email:string,question:string,answer:string,dob:Date):Observable<any>{
    var custom_url = this.url +"/varifyuser"+ "?question="+question+"&answer="+answer+"&DOB="+dob.toString()+"&email="+email;
    return this.http.get(custom_url);
  }

  //Set New Passowrd
  SetPassword(user:User,id:number):Observable<any>{
    let custom_url = this.url +"/setpassword"+ "/" +id
    var header = {'content-type' : 'application/json'}
    var body  = JSON.stringify(user);
    console.log(user)
    return this.http.put(custom_url,body,{'headers':header,responseType:'text'})
  }
}
