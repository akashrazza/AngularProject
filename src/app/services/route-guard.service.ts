import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService {

  constructor(private router : Router) { }

  //Route Gaurd return Boolean value 
  canActivate(){
    var data = localStorage.getItem('IsLogin');
    if(data=='true'){
      return true
    }
    else{
      alert("Please Login");
      this.router.navigate(['/home']);
      return false;
    }
  }
}
