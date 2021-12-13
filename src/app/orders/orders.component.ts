import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { TrackService } from '../services/track.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  OrderId=-1
  Active_Track=false;
  constructor(private orderService : OrderService,private trackservice:TrackService) { }
  OrderHistory:any[] = [];
  trackingData:any=[]
  role = localStorage.getItem('role');
  ngOnInit(): void {
    if(this.role=='admin'){
      this.GetAllData();
    }
    else{
    this.GetData();
    }
  }

  GetAllData(){
    this.orderService.GetAllOrder().subscribe(data=>{
      console.log(data)
      this.OrderHistory=data;
    },
    (err)=>{
      console.log(err);
    })
  }

  step1=''
  step2=''
  step3=''
  step4=''
  Track(id:any){
    this.Active_Track=!this.Active_Track;
    this.OrderId=id;
    this.step1=''
    this.step2=''
    this.step3=''
    this.step4=''
    this.trackservice.GetTrackDetails(this.OrderId).subscribe(data=>{
      this.trackingData = data;
      this.trackingData.sort((a:any,b:any)=>(a.step>b.step)?1:-1)
      console.log(this.trackingData)
      for (var i=0;i<data.length;i++){
        if(i==0){
          this.step1='active'
        }
        else if(i==1){
          this.step2='active'
        }
        else if(i==2){
          this.step3='active'
        }
        else{
          this.step4='active'
        }
      }
    },err=>{console.log(err)})
  }
  GetData(){
    this.orderService.GetOrder(localStorage.getItem('user_details')).subscribe(data=>{
      this.OrderHistory=data;
    },
    (err)=>{
      console.log(err);
    })
  }
  DeleteOrder(id:any){
    this.orderService.DeleteOrder(id).subscribe((data)=>{
      alert("deleted Sucessfully");
      this.GetData()
    },
    err=>{console.log(err)})
  }
  NextStep(order_id:any,step:any){
    this.trackservice.CreateTrack({order_id:order_id,step:step,Description:''}).subscribe((data=>{
      this.Track(order_id);
    }),err=>{console.log(err);})
  }
  DeleteStep(id:any,order_id:any){
    this.trackservice.DeletTrack(id).subscribe((data)=>{
      this.Track(order_id)
    },err=>{console.log(err)})
  }
}
