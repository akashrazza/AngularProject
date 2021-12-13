import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http : HttpClient) { }
  url = "http://127.0.0.1:8000/user";
  CreateAddress(obj:any):Observable<any>{
    // console.log(obj)
    return this.http.post(this.url+'/address',obj,{headers:{'content-type':'application/json'},responseType:'json'})
  }

  getAddressByUser(id:any):Observable<any>{
    var custom_url = this.url + "/addressByUser/"+id;
    return this.http.get(custom_url)
  }

  getAddressById(id:any):Observable<any>{
    return this.http.get(this.url+'/addressById/'+id,{responseType:'json'})
  }
  DeleteAddressByUser(id:any):Observable<any>{
    var custom_url = this.url + "/address/"+id;
    return this.http.delete(custom_url,{responseType:'text'})
  }
}
