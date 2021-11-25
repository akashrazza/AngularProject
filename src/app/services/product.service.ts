import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url:string = "http://localhost:3000/products"
  constructor(private http : HttpClient) { }

  GetProducts(page:number):Observable<any>{
      var page_event = "?_page="+page+"&_limit=9"
      return this.http.get(this.url+page_event)
  }
  GetProductsById(id:number){
    let custom_url = this.url + "/" + id;
    return this.http.get(custom_url);
  }
  GetProductsByType(type:string,page_no:number):Observable<any>{
    let custom_url = this.url + "?Type=" + type + "&_page="+page_no+"&_limit=9"
    return this.http.get(custom_url);
  }
  GetProductsByCategory(cat:string,page_no:number):Observable<any>{
    let custom_url = this.url + "?category=" + cat + "&_page="+page_no+"&_limit=9"
    return this.http.get(custom_url);
  }
  GetProductsByPrice(price:string,page_no:number):Observable<any>{
    let custom_url = this.url + "?price=" + price + "&_page="+page_no+"&_limit=9";
    return this.http.get(custom_url);
  }
  GetProductsByName(price:string,page_no:number):Observable<any>{
    let custom_url = this.url + "?product_name=" + price + "&_page="+page_no+"&_limit=9";
    return this.http.get(custom_url);
  }
  
}
