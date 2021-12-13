import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ProductComponent } from './product/product.component';

import { UserComponent } from './user/user.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignupComponent } from './signup/signup.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';

import { KeysPipe } from './keys.pipe';
import { SlicePipe } from './slice.pipe';
import { ImageZoomComponent } from './image-zoom/image-zoom.component';

import { NgxStripeModule } from 'ngx-stripe';
import { PaymentComponent } from './payment/payment.component';
import { PaymentSucessComponent } from './payment-sucess/payment-sucess.component';
import { OrdersComponent } from './orders/orders.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    ProductComponent,
    UserComponent,
    LoginComponent,
    CartComponent,
    PageNotFoundComponent,
    SignupComponent,
    ProductDetailComponent,
    CheckoutComponent,
    ForgetPasswordComponent,
    
    KeysPipe,
    SlicePipe,
    ImageZoomComponent,
    
    PaymentComponent,
    PaymentSucessComponent,
    OrdersComponent,
    
  ],
  imports: [
    
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxStripeModule.forRoot('pk_test_51K3vsrSJofhnROjzWsf4Wlhf5uS7YEJUsjlLOQdKaBhxXapyE0RacMrswbA0DjBfe0aV8myQjyfUMOC7n8bgqecu00aAxlHvFV'),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
