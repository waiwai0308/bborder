import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { WhereService } from '../where.service';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-order-result',
  templateUrl: './order-result.component.html',
  styleUrls: ['./order-result.component.scss']
})
export class OrderResultComponent implements OnInit {

  modalRef: BsModalRef;

  hasRouteID = true;
  QDrinkId;
  constructor(private WhereService: WhereService,private _message: NzMessageService,private OrderService: OrderService,private route: ActivatedRoute,private modalService: BsModalService) { 
    this.QDrinkId = this.route.snapshot.paramMap.get('id');
  }

  data;

  editPW = '';
  editID = '';
  showErrorPW = false;

  ngOnInit() {
    this.getOrderData();
  }

  getOrderData(){
    this.OrderService.getOrderData(this.QDrinkId).subscribe((data)=>{
      this.data = data;
    });
  }
  
  openDeleteMoadl(template, itemID){
    this.editID = itemID;
    this.editPW = '';
    this.showErrorPW = false;
    this.modalRef = this.modalService.show(template);
  }

  deleteOrderItem(template){
    this.OrderService.deleteOrderData(this.editID,this.editPW).subscribe((data)=>{
      if(data.length != 0){
        this.modalRef.hide();
        this.getOrderData();
        this._message.info('刪除成功！', {nzDuration: 5000});
      }else{
        this.editPW = '';
        this.showErrorPW = true;
      }

    });
  }
}
