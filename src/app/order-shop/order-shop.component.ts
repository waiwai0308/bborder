import { Component, OnInit, TemplateRef  } from '@angular/core';
import { OrderService } from '../order.service';

import { OrderAddComponent } from './../order-add/order-add.component';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-order-shop',
  templateUrl: './order-shop.component.html',
  styleUrls: ['./order-shop.component.scss']
})
export class OrderShopComponent implements OnInit {

  complexForm : FormGroup;
  bsModalRef: BsModalRef;
  constructor(private OrderService: OrderService,private modalService: BsModalService,fb: FormBuilder) { 
    this.complexForm = fb.group({
      // 定義表格的預設值
      'ID' : '',
      'EDIT_PW': '',
      'NAME' : '',
      'SHOP' : '',
      'START_TIME' : '',
      'END_TIME' : '',
      'NOTE' : ''
    })

  }

  shopData;

  selectSHOP;

  submitForm(value: any): void {
    value.SHOP = this.selectSHOP;
    console.log('Reactive Form Data:', value);
  }

  ngOnInit() {
    this.getAllShop();
  }

  openModalWithComponent() {
    const initialState = {
      list: [
        'Open a modal with component',
        'Pass your data',
        'Do something else',
        '...'
      ],
      title: 'Modal with component'
    };
    this.bsModalRef = this.modalService.show(OrderAddComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  getAllShop(){
    this.OrderService.getAllShop().subscribe((data)=>{
      this.shopData = data;
      this.getShopBranches();
    });
  }
  getShopBranches(){
    this.shopData.forEach(element => {
      this.OrderService.getShopInfoByShopID(element.ID).subscribe((data)=>{
        element.SHOP_BRANCHES = data;
      });
    });
  }

}
