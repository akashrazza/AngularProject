import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  payment_details:any={}
  private data = new BehaviorSubject(this.payment_details);
  data$ = this.data.asObservable();
  constructor(private http : HttpClient) { }
  url = 'http://localhost:8000/user/payment'
  PaymentConfirmation(obj:any):Observable<any>{
    return this.http.post(this.url,obj,{headers:{'content-type':'application/json'},responseType:'text'})
  }

  AddPaymetDetails(obj:any){
    console.log(obj)
    this.data.next(obj);
  }

  GetPaymentDetails(){
    return this.data.getValue();
  }
}
