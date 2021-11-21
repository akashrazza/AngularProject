import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastservice : ToastrService) { }

  Show_notification(msg:string){
    this.toastservice.info(msg)
  }
}
