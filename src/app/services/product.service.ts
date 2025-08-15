import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url:string = "https://shopbackend-v4n9.onrender.com/user"
  constructor(private http : HttpClient) { }

  //Get All Products
  GetProducts(page:number):Observable<any>{
      var page_event = "/getAllProduct?_page="+page+"&_limit=9"
      return this.http.get(this.url+page_event)
  }

  //Get Products by ID
  GetProductsById(id:number){
    let custom_url = this.url + "/getById/" + id;
    return this.http.get(custom_url);
  }

  //Get Products By Type
  GetProductsByType(type:string,page_no:number):Observable<any>{
    let custom_url = this.url + "/getByType?Type=" + type + "&_page="+page_no+"&_limit=9"
    return this.http.get(custom_url);
  }

  //Get Products By Category
  GetProductsByCategory(cat:string,page_no:number):Observable<any>{
    let custom_url = this.url + "/getByCategory?category=" + cat + "&_page="+page_no+"&_limit=9"
    return this.http.get(custom_url);
  }
  // GetProductsByPrice(price:string,page_no:number):Observable<any>{
  //   let custom_url = this.url + "?price=" + price + "&_page="+page_no+"&_limit=9";
  //   return this.http.get(custom_url);
  // }

  //Get Products By name
  GetProductsByName(product_name:string,page_no:number):Observable<any>{
    let custom_url = this.url + "/getByProductName?product_name=" + product_name + "&_page="+page_no+"&_limit=9";
    return this.http.get(custom_url);
  }
  
  //Insert Product in DB for Admin
  InsertProduct(obj:any):Observable<any>{
    return this.http.post(this.url+'/insertproduct',obj,{headers:{'content-type':'application/json'},responseType:'text'})
  }
}
