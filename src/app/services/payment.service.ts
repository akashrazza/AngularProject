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
  data$ = this.data.asObservable();  //Observable Payment details
  constructor(private http : HttpClient) { }
  url = 'https://shopbackend-v4n9.onrender.com/user/payment'

  //Payment Confirmation send token
  PaymentConfirmation(obj:any):Observable<any>{
    return this.http.post(this.url,obj,{headers:{'content-type':'application/json'},responseType:'text'})
  }


  //Add Payment details to behavoiurSubject data
  AddPaymetDetails(obj:any){
    console.log(obj)
    this.data.next(obj);
  }


  //Get Payment details from behaviour subject data
  GetPaymentDetails(){
    return this.data.getValue();
  }
}
