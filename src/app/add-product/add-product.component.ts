import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor() { }
  ProductForm = new FormGroup({
    
      
      product_name: new FormControl(''),
      Type: new FormControl(''),//DropDown
      price: new FormControl(0),
      category: new FormControl(''),//Dropdown
      img: new FormControl(''),
      tage: new FormControl(''),
      // description: [
      //   "1.52” TruViewTM display – Industry leading display with the best-in-class resolution of 360*400 pixels for a sharper, brighter viewing experience.",
      //   "24*7 wellness partner – Take a step towards complete wellness with Noise Health Suite. Track your SpO2 levels, heart rate, stress levels and sleep insights, right from your wrist.",
      //   "Multiple sports mode – Crush those fitness goals with your choice of workout from 15 sports mode. Monitor your performance with every step, lap and stat.",
      //   "A new face, every day – Never run out of choices to match your watch with your look, thanks to over 100+ cloud-based & customisable watch faces.",
      //   "Up to 10-day battery – Your hustle doesn’t stop. Neither does the X-Fit 1. It’s designed to keep up with you."
      // ],
      // "specification": {
      //   "Brand": "‎Noise",
      //   "Manufacturer": "‎TSL, Fulongfuhe Road, Dongguan city - 523025",
      //   "Model": "‎Wrb-sw-xfit1-std-gry_gry",
      //   "Model Name": "‎X-Fit 1",
      //   "Product Dimensions": "‎4.3 x 3.9 x 1.1 cm; 40 Grams",
      //   "Item model number": "‎wrb-sw-xfit1-std-gry_gry",
      //   "Mounting Hardware": "‎Smartwatch, Charging Cable, User Manual, Thank You Card",
      //   "Batteries Required": "‎No",
      //   "Country of Origin": "‎China",
      //   "Net Quantity": "1 Piece",
      //   "Generic Name": "Smartwatch"
      // },
      // "quantity": 0,
      // "variant": [
      //   {
      //     "color": "black",
      //     "quantity": 100,
      //     "size": ""
      //   },
      //   {
      //     "color": "white",
      //     "quantity": 100,
      //     "size": ""
      //   },
      //   {
      //     "color": "red",
      //     "quantity": 100,
      //     "size": ""
      //   },
      //   {
      //     "color": "pink",
      //     "quantity": 100,
      //     "size": ""
      //   },
      //   {
      //     "color": "blue",
      //     "quantity": 100,
      //     "size": ""
      //   }
      // ]
    
  })
  ngOnInit(): void {
  }

}
