import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url:string = "http://localhost:8000/user"
  constructor(private http : HttpClient) { }

  GetProducts(page:number):Observable<any>{
      var page_event = "/getAllProduct?_page="+page+"&_limit=9"
      return this.http.get(this.url+page_event)
  }
  GetProductsById(id:number){
    let custom_url = this.url + "/getById/" + id;
    return this.http.get(custom_url);
  }
  GetProductsByType(type:string,page_no:number):Observable<any>{
    let custom_url = this.url + "/getByType?Type=" + type + "&_page="+page_no+"&_limit=9"
    return this.http.get(custom_url);
  }
  GetProductsByCategory(cat:string,page_no:number):Observable<any>{
    let custom_url = this.url + "/getByCategory?category=" + cat + "&_page="+page_no+"&_limit=9"
    return this.http.get(custom_url);
  }
  // GetProductsByPrice(price:string,page_no:number):Observable<any>{
  //   let custom_url = this.url + "?price=" + price + "&_page="+page_no+"&_limit=9";
  //   return this.http.get(custom_url);
  // }
  GetProductsByName(product_name:string,page_no:number):Observable<any>{
    let custom_url = this.url + "/getByName?product_name=" + product_name + "&_page="+page_no+"&_limit=9";
    return this.http.get(custom_url);
  }
  
}
