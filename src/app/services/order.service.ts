import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }
  url = "http://localhost:8000/user/"
  CreateOrder(data:any):Observable<any>{
    return this.http.post(this.url+'createOrder',data,{headers:{'content-type':'application/json'},responseType:'text'})
  }

  GetOrder(user_id:any):Observable<any>{
    return this.http.get(this.url+"getAllOrder/"+user_id,{responseType:'json'})
  }

  DeleteOrder(id:any):Observable<any>{
    return this.http.delete(this.url+'deleteOrder/'+id,{responseType:'text'})
  }

  GetAllOrder():Observable<any>{
    return this.http.get(this.url+'getAllOrder',{responseType:'json'})
  }
}
