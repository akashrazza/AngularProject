import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { UserComponent } from './user/user.component';
import { RouteGuardService } from './services/route-guard.service'; 
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CheckoutComponent } from './checkout/checkout.component';
const routes: Routes = [
  {path:'',redirectTo:"home",pathMatch:"full"},
  {path:'home',component:HomeComponent},
  {path:'about',component:AboutComponent,canActivate:[RouteGuardService]},
  {path:'contact',component:ContactComponent,canActivate:[RouteGuardService]},
  {path:'product',component:ProductComponent,canActivate:[RouteGuardService]},
  {path:'user',component:UserComponent,canActivate:[RouteGuardService]},
  {path:'checkout',component:CheckoutComponent,canActivate:[RouteGuardService]},
  {path:'product_detail/:category/:id',component:ProductDetailComponent,canActivate:[RouteGuardService]},
  {path:'**',component:PageNotFoundComponent},
  // {path:'login',component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
