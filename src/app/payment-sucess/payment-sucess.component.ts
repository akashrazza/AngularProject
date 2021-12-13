import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-payment-sucess',
  templateUrl: './payment-sucess.component.html',
  styleUrls: ['./payment-sucess.component.css']
})
export class PaymentSucessComponent implements OnInit {
  card_data=""
  constructor(private routeractive : ActivatedRoute) { 
    this.routeractive.paramMap.subscribe((data: any) => {
      this.card_data = data.get('id');
     

    })
  }

  ngOnInit(): void {
  }

}
