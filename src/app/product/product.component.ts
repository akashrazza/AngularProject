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

  constructor(private notificationservice: NotificationService, private productservice: ProductService, private router: Router, private activateRouter: ActivatedRoute, private cartservice: CartService) { }
  arr_products: Product[] = [];
  page: number = 1
  product_Search_input: string = ""
  role = localStorage.getItem('role')
  Notification = false;
  selected_product: any = ''
  select_product(ele: any) { this.selected_product = ele }
  selected_variant: any = ''
  select_variant_radio(ele: number) { this.selected_variant = ele }


  ngOnInit(): void {
    this.activateRouter.queryParams.subscribe(
      (data) => {
        this.page = 1;
        if (data.category != undefined) {
          this.get_by_category(data.category, this.page)
        }
        else {
          if (data.Type != undefined) {
            this.get_by_type(data.type, this.page)
          }
          else {

            this.get_all_products(this.page);

          }
        }
      },
      (error) => { console.log(error) })
  }

  //Search For Product
  Search_Product() {
    if (this.product_Search_input == "") {
      this.get_all_products(1);
    }
    else {
      this.productservice.GetProductsByName(this.product_Search_input, 1).subscribe(
        (data) => this.arr_products = data,
        (error) => console.log(error)
      )
    }
  }

  //Get All Products
  get_all_products(page: number) {
    this.productservice.GetProducts(page).subscribe(
      (data) => this.arr_products = data,
      (error) => console.log(error)
    )
  }

  //Get Products by Category
  get_by_category(data1: string, page_no: number) {
    this.productservice.GetProductsByType(data1, page_no).subscribe(
      (data) => { this.arr_products = data },
      (error) => console.log(error)
    )
  }

  //Get products by type
  get_by_type(data: string, page_no: number) {
    this.productservice.GetProductsByCategory(data, page_no).subscribe(
      (data) => this.arr_products = data,
      (error) => console.log(error)
    )
  }

  //Sort Product from low to high
  sort_price_low_to_high() {
    this.arr_products.sort((x, y) => x.price - y.price)
  }

  //Sort product from high to low
  sort_price_high_to_low() {
    this.arr_products.sort((x, y) => y.price - x.price)
  }

  //Pagination Next button event
  Next() {
    if (this.arr_products.length == 9) {
      this.page++;
      this.activateRouter.queryParams.subscribe(
        (data) => {
          if (data.category != undefined) {
            this.get_by_category(data.category, this.page)
          }
          else {
            if (data.Type != undefined) {
              this.get_by_type(data.type, this.page)
            }
            else {
              this.get_all_products(this.page);
            }
          }
        },
        (error) => { console.log(error) })
    }
  }

  //Pagination previous button event
  Previous() {
    if (this.page > 1) {
      this.page--;

      this.activateRouter.queryParams.subscribe(
        (data) => {

          if (data.category != undefined) {
            this.get_by_category(data.category, this.page)
          }
          else {
            if (data.Type != undefined) {
              this.get_by_type(data.type, this.page)
            }
            else {

              this.get_all_products(this.page);

            }
          }
        },
        (error) => { console.log(error) })
    }
  }

  //Add TO cart event
  Add_to_cart() {
    let ele = this.selected_product;
    let variant_id = this.selected_variant;
    if (this.selected_variant == '' || this.selected_product == '') { alert("Please Select a variant"); return; }
    let cart_obj = new Cart(ele.id, ele.product_name, ele.price, ele.img, ele.category, variant_id, 1)
    this.cartservice.Add_Cart(cart_obj);
    this.notificationservice.Show_notification("Product " + ele.product_name + " Added to Cart");
    this.selected_product = ''
    this.selected_variant = ''
    let ele1: HTMLElement = document.getElementById('btn-close-variant-product') as HTMLElement
    ele1.click();
  }

  //Close Variant tab handle event
  close_varinat_tab() {
    let ele: HTMLElement = document.getElementById('btn-close-variant-product') as HTMLElement
    ele.click();
    this.selected_product = ''
    this.selected_variant = ''
  }
}
