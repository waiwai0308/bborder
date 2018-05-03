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
  modalRef2: BsModalRef;

  hasRouteID = true;
  QDrinkId;
  constructor(private WhereService: WhereService,private _message: NzMessageService,private OrderService: OrderService,private route: ActivatedRoute,private modalService: BsModalService) { 
    this.QDrinkId = this.route.snapshot.paramMap.get('id');
  }

  data;

  editPW = '';
  editID = '';
  showErrorPW = false;

  totalPrice = 0;

  ngOnInit() {
    this.getOrderData();
  }

  getOrderData(){
    this.OrderService.getOrderData(this.QDrinkId).subscribe((data)=>{
      this.data = data.sort(function(a,b){
        if(a.ITEM_NAME > b.ITEM_NAME){
          return 1;
        }else{
          return -1;
        }
      });
      this.totalPrice = 0;
      this.countTotal(data);
    });
  }

  storeTotal;

  countTotal(data){
    let itemName = [];
    let itemICE = [];
    let itemSUGAR = [];
    let itemTotal = [];


    data.forEach(element => {
      itemName.push(element.ITEM_NAME);
      itemICE.push(element.ITEM_NAME+"/"+element.ICE);
      itemSUGAR.push(element.ITEM_NAME+"/"+element.SUGAR)
      if(element.INGREDIENT){
        itemTotal.push(element.ITEM_NAME+" / "+element.SIZE+" / "+element.SUGAR+" / "+element.ICE+" / "+element.INGREDIENT);
      }else{
        itemTotal.push(element.ITEM_NAME+" / "+element.SIZE+" / "+element.SUGAR+" / "+element.ICE);
      }
      
      this.totalPrice += element.PRICE;
    });

    let result = {};
    itemTotal.forEach(function(item , i) {
      result[item] = result[item] ? result[item] + 1 : 1;
    });

    let formatText = JSON.stringify(result);
    let formatTextArray = formatText.replace("{","").replace("}","").replace(/\"/g,"").split(',');
    this.storeTotal = formatTextArray.sort();
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

  addNAME;
  addPW;
  copyID;

  copyOrderData(template,item){
    this.modalRef2 = this.modalService.show(template);
    this.copyID = item;
  }

  addCopyItem(){
    let newData = this.data[this.copyID];
    newData.EDIT_PW = this.addPW;
    newData.NAME = this.addNAME;
    this.data = [];
    this.OrderService.addOrderItem(newData).subscribe((test)=>{
      this.addNAME = '';
      this.addPW='';
      this.modalRef2.hide();
      
      this.getOrderData();
      this._message.info('學人成功!', {nzDuration: 5000});
    });
  }

  checkOrder(){
    if(!this.addNAME || !this.addPW){
      return true;
    } else {
      return false;
    }
  }
}
