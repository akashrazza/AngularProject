import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params, RouterLinkActive } from '@angular/router';
import { Cart } from '../Cart';
import { Product } from '../Product';
import { CartService } from '../services/cart.service';
import { NotificationService } from '../services/notification.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css', '../product/product.component.css']
})
export class ProductDetailComponent implements OnInit {

  role=localStorage.getItem('role');
  id: number = 0
  product: any = {};
  category: string = '';
  product_type: Product[] = [];
  objectKeys = Object.keys;
  Variant_choose_id: any = '';

  constructor(private router: Router, private productservice: ProductService, private routeractive: ActivatedRoute, private cartservice: CartService, private notificationservice: NotificationService) {
    //route Resuse
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    //Param get
    this.routeractive.paramMap.subscribe((data: any) => {
      this.id = data.get('id');
      this.category = data.get('category');
    })
  }
  
  ngOnInit(): void {
    this.productservice.GetProductsById(this.id).subscribe((data) => {
      this.product = data;
      console.log(this.product)
    })
    this.productservice.GetProductsByCategory(this.category, 1).subscribe((data) => {
      this.product_type = data.slice(0, 7);
    })
  }

  //Add to cart  Event
  AddToCart() {
    let ele = this.product
    if (this.Variant_choose_id == ''){ alert("Please Choose a variant");return;}
    let cart_obj = new Cart(ele.id, ele.product_name, ele.price, ele.img, ele.category, this.Variant_choose_id, 1)
    this.cartservice.Add_Cart(cart_obj);
    this.notificationservice.Show_notification("Product " + ele.product_name + " Added to Cart");
    let ele1: HTMLElement = document.getElementById('btn-close-variant-product') as HTMLElement
    ele1.click();
    this.Variant_choose_id = '';
  }
  //Handle redirect in similar section
  redirect(id: number, category: string) {
    this.router.navigate(['/product_detail', category, id])
  }
 
  //Close variant tab event
  close_varinat_tab() {
    let ele: HTMLElement = document.getElementById('btn-close-variant-product') as HTMLElement
    ele.click();
  }
  //Slect Variant radio
  select_variant_radio(id: number) {
    this.Variant_choose_id = id;
  }



}
