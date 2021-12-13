import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
// import { StripeElementsOptions, } from '@stripe/stripe-js';   
// import {  Elements, Element as StripeElement,  } from "ngx-stripe";
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { PaymentService } from '../services/payment.service';
import { OrderService } from '../services/order.service';
import { AddressService } from '../services/address.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {

  elements: any;
  card: any;
  elementsOptions: StripeElementsOptions = {
    locale: 'auto'
  };

  stripeTest!: FormGroup;

  PaymentDetailsObject: any = {
    amount: this.paymentservice.GetPaymentDetails().amount
  }
  Address_data = this.paymentservice.GetPaymentDetails().address;

  constructor(
    private fb: FormBuilder,
    private stripeService: StripeService,
    private paymentservice: PaymentService,
    private orderService: OrderService,
    private AddressService: AddressService,
    private router: Router) {
  }

  ngOnInit() {
    //Create payment card
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
    });
    this.stripeService.elements(this.elementsOptions)
      .subscribe(elements => {
        this.elements = elements;

        if (!this.card) {
          this.card = this.elements.create('card', {
            style: {
              base: {
                iconColor: '#666EE8',
                color: '#31325F',
                lineHeight: '40px',
                fontWeight: 300,
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSize: '18px',
                '::placeholder': {
                  color: '#CFD7E0'
                }
              }
            }
          });
          this.card.mount('#card-element');
        }
      });
  }


  OrderData = { AddressId: this.Address_data.id, products: this.paymentservice.GetPaymentDetails().products, user_id: localStorage.getItem('user_details'), Amount: this.PaymentDetailsObject.amount, Payment: "SUCCESS" }

//ON CLICK buy event
  buy() {
    const name = this.stripeTest.value.name;
    console.log(this.OrderData)
    this.stripeService
      .createToken(this.card, { name })
      .subscribe(result => {
        if (result.token) {
          this.paymentservice.PaymentConfirmation({ ...result, amount: this.PaymentDetailsObject.amount }).subscribe((data) => {
            console.log(data)
            if (data == "Payment Sucessfull") {
              this.orderService.CreateOrder(this.OrderData)
                .subscribe(data => {
                  this.router.navigate(['payment_sucess', result.token?.card?.id])
                },
                  (err) => {
                    alert("Some Went Wrong")
                    console.log(err);
                  })
            }
          }, (err) => {
            alert(err);
            console.log(err);
          })

          console.log(result.token);
        } else if (result.error) {
          // Error creating the token
          alert(result.error.message);
          console.log(result.error.message);
        }
      });
  }
}


