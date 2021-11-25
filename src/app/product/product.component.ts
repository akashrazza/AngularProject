import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cart } from '../Cart';
import { Product } from '../Product';
import { CartService } from '../services/cart.service';
import { NotificationService } from '../services/notification.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private notificationservice: NotificationService,private productservice : ProductService,private router : Router, private activateRouter : ActivatedRoute,private cartservice: CartService) { }
  arr_products : Product[] = [];
  page:number=1
  product_Search_input:string=""
  ngOnInit(): void {
    
    this.activateRouter.queryParams.subscribe(
      (data)=>{
        this.page=1;
        if(data.category!=undefined){
          this.get_by_category(data.category,this.page)
        }
        else{ 
          if(data.Type!=undefined){
            this.get_by_type(data.type,this.page)
          }
          else{
            
              this.get_all_products(this.page);
            
          }
        }
      },
      (error)=>{console.log(error)})
  }
  Search_Product(){
    if(this.product_Search_input==""){
      this.get_all_products(1);
    }
    else{
      this.productservice.GetProductsByName(this.product_Search_input,1).subscribe(
        (data)=>this.arr_products=data,
        (error)=>console.log(error)
      )
    }
  }
  get_all_products(page:number){
    this.productservice.GetProducts(page).subscribe(
      (data)=>this.arr_products=data,
      (error)=>console.log(error)
    )
    
  }

  get_by_category(data1:string,page_no:number){
    
    this.productservice.GetProductsByType(data1,page_no).subscribe(
      (data)=>{this.arr_products=data},
      (error)=>console.log(error)
    )
  }

  get_by_type(data:string,page_no:number){
    this.productservice.GetProductsByCategory(data,page_no).subscribe(
      (data)=>this.arr_products=data,
      (error)=>console.log(error)
    )
  }

  sort_price_low_to_high(){
    this.arr_products.sort((x,y)=>x.price-y.price)
  }

  sort_price_high_to_low(){
    this.arr_products.sort((x,y)=>y.price-x.price)
  }
  Next(){
    if(this.arr_products.length==9){
    this.page++;
    this.activateRouter.queryParams.subscribe(
      (data)=>{
        
        if(data.category!=undefined){
          this.get_by_category(data.category,this.page)
        }
        else{ 
          if(data.Type!=undefined){
            this.get_by_type(data.type,this.page)
          }
          else{
            
              this.get_all_products(this.page);
            
          }
        }
      },
      (error)=>{console.log(error)})
    }
  }

  Previous(){
    if(this.page>1){
    this.page--;
    
    this.activateRouter.queryParams.subscribe(
      (data)=>{
        
        if(data.category!=undefined){
          this.get_by_category(data.category,this.page)
        }
        else{ 
          if(data.Type!=undefined){
            this.get_by_type(data.type,this.page)
          }
          else{
            
              this.get_all_products(this.page);
            
          }
        }
      },
      (error)=>{console.log(error)})
    }
  }
  Notification = false;
  Add_to_cart(ele:Product){
    let cart_obj = new Cart(ele.id,ele.product_name,ele.price,ele.img,ele.category)
    this.cartservice.Add_Cart(cart_obj);
    this.notificationservice.Show_notification("Product "+ ele.product_name+" Added to Cart");
  }
}
