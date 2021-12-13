import { Component, OnInit } from '@angular/core';
import { Product } from '../Product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private productservice : ProductService) { }

  arr_Electronics : Product[] = []
  arr_Clothing : Product[] = []

  ngOnInit(): void {
    this.getPtoductClothing();
    this.getPtoductElectronics();
    
  }
  //Get all Electronics product
  getPtoductElectronics(){
    this.productservice.GetProductsByType("Electronics",1).subscribe(
      (data)=>this.arr_Electronics=data.slice(0,5),
      (error)=>console.log(error)
    )
  }

  //Get all Clothing product
  getPtoductClothing(){
    this.productservice.GetProductsByType("Clothing",1).subscribe(
      (data)=>{this.arr_Clothing=data.slice(0,5)},
      (error)=>console.log(error)
    )
  }

}
