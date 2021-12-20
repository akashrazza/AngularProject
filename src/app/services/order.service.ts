import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }
  url = "http://localhost:8000/user/"

  //Create Order
  CreateOrder(data:any):Observable<any>{
    return this.http.post(this.url+'createOrder',data,{headers:{'content-type':'application/json'},responseType:'text'})
  }

  //Get All Order by user
  GetOrder(user_id:any):Observable<any>{
    return this.http.get(this.url+"getAllOrder/"+user_id,{responseType:'json'})
  }

  //Delete Order
  DeleteOrder(id:any):Observable<any>{
    return this.http.delete(this.url+'deleteOrder/'+id,{responseType:'text'})
  }

  //Get All order for Admin
  GetAllOrder():Observable<any>{
    return this.http.get(this.url+'getAllOrder',{responseType:'json'})
  }
}
