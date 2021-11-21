import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http : HttpClient) { }

  url  = "http://localhost:3000/user";

  getuser():Observable<any>{
    return this.http.get(this.url)
  }
  
  postdata(user_obj : User):Observable<any>{
    var header = {'content-type' : 'application/json'}
    let body  = JSON.stringify(user_obj);
    return this.http.post(this.url,body,{'headers':header}) 
  }

  Get_by_id(id:number):Observable<any>{
    return this.http.get(this.url+"?id="+id)
  }

  Get_by_name(name:string):Observable<any>{
    return this.http.get(this.url+"?first_name="+name)
  }

  delete ( id:number):Observable<any>{
    let custom_url = this.url+"/"+id;
    return this.http.delete(custom_url);
  }
}
