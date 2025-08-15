import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../Cart';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart:any[]=[]
  private data = new BehaviorSubject(this.cart);   
  data$ = this.data.asObservable();   //Observable data
  url ='https://shopbackend-v4n9.onrender.com/user/cart'
  changeData(data2: Cart) {

    // this.data.next(data2)
  }
  constructor(private http :HttpClient) { }

  //Added to cart
  Add_Cart(cart_obj:Cart){
    //For Obserbale
    var found:boolean=false;
    for (let i =0 ; i<this.data.getValue().length;i++){
        if(cart_obj.id==this.data.getValue()[i].id && cart_obj.variant_id==this.data.getValue()[i].variant_id){
          found=true
          var temp_data = this.data.getValue()
          temp_data[i].quantity++;
           this.data.next([...temp_data])
           console.log(this.data)
        }
    }
    if (found==false)
    this.data.next([...this.data.getValue(),cart_obj]);
    // this.cart.push(cart_obj);
    console.log(this.data,this.cart)
    // console.log(this.cart)new data---1 old data qunatity //1
    console.log(this.data$)
    var body={
      user_id:localStorage.getItem('user_details'),
      product_id:cart_obj.id,
      variant:cart_obj.variant_id,
      quantity:cart_obj.quantity
    }
    //For DB Add to cart
    this.http.post(this.url,body,{headers:{'content-type':'application/json'},responseType:'text'}).subscribe(data=>{
      console.log("Inserted Cart")
    },err=>{console.log(err)})
    
  }
  //Get All cart from DB and set to Behaviour subject data
  Get_Cart(){
    console.log(this.cart)
    this.http.get<any[]>(this.url+'/'+localStorage.getItem('user_details'))
    .subscribe(data=>{
      // console.log(data[0])
      var data1=[]
      console.log(data)
     for(var i=0;i<data.length;i++){
       var obj = {
         id:data[i].product.id,
         product_name:data[i].product.product_name,
         price:data[i].product.price,
         image:data[i].product.img,
         category:data[i].product.category,
         variant_id:data[i].variant,
         quantity:data[i].quantity,
         cart_id:data[i].id
       }
       data1.push(obj);
     }
     console.log(data1)
     this.data.next([...data1])
     
    //  var obj = {
    //    id:data.0.product.id,

    //  }
    })
    return this.cart;
  }

  //Delete from DB
  DeleteFromCart(id:any):Observable<any>{
    return this.http.delete(this.url+'/'+id,{responseType:'text'})
  }

  //Delete from Behaviour subject
  Delete(id:number){
    let arr = this.data.getValue()
    let index=0
    for (let i =0;i<arr.length;i++){
      if(arr[i].cart_id==id){
        index=i;
        break
      }
    }
    arr.splice(index,1);
    this.data.next(arr);
    this.DeleteFromCart(id).subscribe(data=>{console.log("Delete sucessfull")},err=>{console.log(err)})
  }

  //Delete all from behaviourSubject data 
  delet_all(){
    this.data.next([])
    this.cart=[]
  }
}
