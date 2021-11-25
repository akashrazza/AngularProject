import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../Cart';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart:Cart[]=[]
  private data = new BehaviorSubject(this.cart);
  data$ = this.data.asObservable();

  changeData(data2: Cart) {

    // this.data.next(data2)
  }
  constructor() { }
  Add_Cart(cart_obj:Cart){
    // console.log(this.data,this.cart)
    this.data.next([...this.data.getValue(),cart_obj])
    // this.cart.push(cart_obj);
    console.log(this.data,this.cart)
    console.log(this.cart)
  }
  Get_Cart(){
    console.log(this.cart)
    return this.cart;
  }
  Delete(id:number){
    let arr = this.data.getValue()
    let index=0
    for (let i =0;i<arr.length;i++){
      if(arr[i].id==id){
        index=i;
        break
      }
    }
    arr.splice(index,1);
    this.data.next(arr);
  }
  delet_all(){
    this.data.next([])
    this.cart=[]
  }
}
