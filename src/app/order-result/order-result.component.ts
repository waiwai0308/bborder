import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-order-result',
  templateUrl: './order-result.component.html',
  styleUrls: ['./order-result.component.scss']
})
export class OrderResultComponent implements OnInit {

  hasRouteID = true;
  QDrinkId;
  constructor(private OrderService: OrderService,private route: ActivatedRoute) { 
    this.QDrinkId = this.route.snapshot.paramMap.get('id');
    
  }

  data;

  ngOnInit() {
    this.getOrderData();
  }

  getOrderData(){
    this.OrderService.getOrderData(this.QDrinkId).subscribe((data)=>{
      this.data = data;
    });
  }
  
  deleteOrderItem(id){

  }
}
